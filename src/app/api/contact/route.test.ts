import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

// Mock the MongoDB library to avoid database connection attempts during testing
vi.mock("@/lib/mongodb", () => ({
  getDatabase: vi.fn().mockImplementation(() => {
    return Promise.resolve({
      collection: () => ({
        insertOne: vi.fn().mockResolvedValue({ acknowledged: true, insertedId: "mocked-id" }),
      }),
    });
  }),
}));

describe("POST /api/contact", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    // Clear mocks before each test
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("should return 400 if fields are missing", async () => {
    // Missing message field
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Arpit Sharma",
        email: "arpit@example.com",
        subject: "Test Subject",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toBe("All fields (name, email, subject, message) are required.");
  });

  it("should return 200 with setupRequired if Web3Forms key is not configured", async () => {
    // Clear the Web3Forms access key
    process.env.WEB3FORMS_ACCESS_KEY = "";
    process.env.MONGODB_URI = ""; // Disable Mongo to avoid complex mocks

    // Mock fetch for registration endpoint
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Arpit",
        email: "arpit@example.com",
        subject: "General Question",
        message: "Hello world!",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.setupRequired).toBe(true);
    expect(json.message).toContain("check your Inbox");

    // Fetch should be called for registration
    expect(mockFetch).toHaveBeenCalledWith("https://api.web3forms.com/register", expect.any(Object));
  });

  it("should return 200 success when Web3Forms is fully configured and request is valid", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key-12345";
    process.env.MONGODB_URI = "mongodb://localhost:27017/test";

    // Mock fetch for submission endpoint
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, message: "Email sent" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Arpit",
        email: "arpit@example.com",
        subject: "General Question",
        message: "Hello world!",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.db).toBe(true); // Should have successfully "saved" to db mock
    expect(json.message).toBe("Message sent successfully directly to Gmail!");

    // Fetch should be called for submit
    expect(mockFetch).toHaveBeenCalledWith("https://api.web3forms.com/submit", expect.any(Object));
  });

  it("should return 500 when fetch call to Web3Forms fails", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key-12345";
    process.env.MONGODB_URI = ""; // Disable db saving

    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: "Invalid Key" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Arpit",
        email: "arpit@example.com",
        subject: "General Question",
        message: "Hello world!",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(500);

    const json = await response.json();
    expect(json.error).toContain("Failed to send email");
  });
});
