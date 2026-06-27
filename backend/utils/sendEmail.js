import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

export async function sendNotificationEmail(subject, text) {
  console.log('[Email] Sending notification email:', { subject });
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.NOTIFICATION_EMAIL || process.env.SENDER_EMAIL,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Email] Sent successfully:', info.response);
  } catch (error) {
    console.error('[Email] Error sending email:', error.message);
  }
}
