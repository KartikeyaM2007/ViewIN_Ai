import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
// comment
export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  // Verify the user ID is provided
  if (!userid) {
    return Response.json(
      { success: false, error: "User ID is required." },
      { status: 400 }
    );
  }

  // Verify user existence in database.
  // NOTE: Since this API is invoked by VAPI cloud servers as an external webhook,
  // standard HTTP-Only session cookies (getCurrentUser()) cannot be forwarded by VAPI.
  // SECURITY SUGGESTION: Configure an x-vapi-secret in the VAPI Dashboard and check it here.
  try {
    const userExists = await db.collection("users").doc(userid).get();
    if (!userExists.exists) {
      return Response.json(
        { success: false, error: "Unauthorized: User profile not found." },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Failed to verify user in webhook:", error);
    return Response.json(
      { success: false, error: "Internal security check failed." },
      { status: 500 }
    );
  }

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
