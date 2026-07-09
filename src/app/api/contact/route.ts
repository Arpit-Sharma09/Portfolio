import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    // 1. Optional: Save to MongoDB Atlas if configured
    const mongoUri = process.env.MONGODB_URI;
    let savedToDb = false;
    if (mongoUri && !mongoUri.includes("PLACEHOLDER") && mongoUri.trim() !== "") {
      try {
        const db = await getDatabase();
        const collection = db.collection("contacts");
        const document = {
          name,
          email,
          subject,
          message,
          createdAt: new Date(),
          read: false,
        };
        const result = await collection.insertOne(document);
        if (result.acknowledged) {
          savedToDb = true;
          console.log(`Contact form saved to MongoDB. insertedId: ${result.insertedId}`);
        }
      } catch (dbError) {
        console.error("Failed to save contact to MongoDB:", dbError);
      }
    }

    // 2. Send email notification to arpit56665@gmail.com
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const targetEmail = "arpit56665@gmail.com";

    if (web3formsKey && web3formsKey.trim() !== "") {
      // Access key is configured: Submit directly to Web3Forms email delivery API
      try {
        const emailResponse = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            from_name: "Portfolio Contact Form",
            subject: `Portfolio Message: ${subject}`,
            name,
            email,
            message: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          }),
        });

        const emailResult = await emailResponse.json();
        
        if (emailResult.success) {
          console.log("Email forwarded successfully via Web3Forms.");
          return NextResponse.json(
            { 
              success: true, 
              message: "Message sent successfully directly to Gmail!",
              db: savedToDb
            },
            { status: 200 }
          );
        } else {
          console.error("Web3Forms API error:", emailResult);
          throw new Error(emailResult.message || "Failed to forward email.");
        }
      } catch (emailError: any) {
        console.error("Email delivery failed:", emailError);
        return NextResponse.json(
          { error: "Failed to send email. please verify your Web3Forms access key." },
          { status: 500 }
        );
      }
    } else {
      // No Access Key configured: Auto-register Web3Forms access key for the user
      console.log(`No WEB3FORMS_ACCESS_KEY configured. Triggering key registration for ${targetEmail}...`);
      
      try {
        await fetch("https://api.web3forms.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: targetEmail,
          }),
        });
        console.log(`Requested a Web3Forms Access Key for ${targetEmail}`);
      } catch (registerError) {
        console.error("Web3Forms automatic key registration failed:", registerError);
      }

      // Dev Log Mock fallbacks
      console.log("=========================================");
      console.log("CONTACT FORM SUBMISSION (LOCAL MOCK):");
      console.log("Name:   ", name);
      console.log("Email:  ", email);
      console.log("Subject:", subject);
      console.log("Message:", message);
      console.log("=========================================");

      return NextResponse.json(
        {
          success: true,
          setupRequired: true,
          message: "Form received! To send emails directly to your Gmail, check your Inbox (arpit56665@gmail.com) for the Web3Forms Access Key we just requested for you, and add WEB3FORMS_ACCESS_KEY='your_key' to your .env.local file.",
          db: savedToDb
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
