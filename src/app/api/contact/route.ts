import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "mail.procics.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contato de ${name}`,
      text: message,
      replyTo: email,
    });

    return NextResponse.json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao enviar email" },
      { status: 500 },
    );
  }
}
