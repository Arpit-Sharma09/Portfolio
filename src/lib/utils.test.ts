import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge multiple class names into a single string", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle conditional/object inputs correctly", () => {
    const result = cn("class1", {
      "class-true": true,
      "class-false": false,
    });
    expect(result).toBe("class1 class-true");
  });

  it("should filter out falsy values like null, undefined, and false", () => {
    const result = cn("class1", null, undefined, false, "class2");
    expect(result).toBe("class1 class2");
  });

  it("should merge and override conflicting Tailwind CSS classes", () => {
    // twMerge should resolve 'p-4 p-2' into 'p-2'
    const result = cn("p-4", "p-2");
    expect(result).toBe("p-2");
  });

  it("should handle array inputs correctly", () => {
    const result = cn(["class1", "class2"], "class3");
    expect(result).toBe("class1 class2 class3");
  });
});
