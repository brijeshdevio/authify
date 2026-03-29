import nodemailer from "nodemailer";
import { env } from "../config/env";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
});

try {
  transporter.verify();
  console.log(`✅ Mailer is ready to send emails.`);
} catch (err) {
  console.error(`❌ Mailer is not ready to send emails: ${err}`);
}
