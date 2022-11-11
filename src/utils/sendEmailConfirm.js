import "dotenv/config";
import nodemailer from "nodemailer";

export const sendEmailConfirm = async (email, token) => {
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    });

    await transport.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: "Verfica tu cuenta de correo",
        html: `<a href="${process.env.PATHHEROKU || "http://localhost:5500"}/auth/confirm/${token}">Verificar correo electronico</a>`, // html body
    });
}