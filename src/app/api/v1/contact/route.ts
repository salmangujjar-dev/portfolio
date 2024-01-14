import { sendMail } from "@utils/mailService";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await sendMail(body.subject, body.email, body.body);

    Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
