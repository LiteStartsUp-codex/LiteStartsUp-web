import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, honeypot } = await request.json();

    // Anti-spam: honeypot check
    if (honeypot) {
      return Response.json({ error: "Spam detected" }, { status: 400 });
    }

    // Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "LiteStartsUp <onboarding@resend.dev>",
      to: ["rebolledaver@gmail.com"],
      subject: "Nuevo mensaje de contacto - LiteStartsUp",
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error: "Error sending email" }, { status: 500 });
  }
}
