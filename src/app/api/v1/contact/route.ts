import { after } from "next/server";
import { sendMail } from "@utils/mailService";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await sendMail(body.subject, body.email, body.body);

    // Log after response is sent (non-blocking)
    after(async () => {
      console.log("Email sent successfully:", {
        subject: body.subject,
        email: body.email,
        timestamp: new Date().toISOString(),
      });
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    // Log error after response is sent (non-blocking)
    after(async () => {
      console.error("Error sending email:", error);
    });

    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
