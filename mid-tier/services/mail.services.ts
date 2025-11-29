import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Create a transporter using SMTP server with error handling
let transporter: nodemailer.Transporter | null = null;

try {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP credentials not configured in .env file');
  }
  
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtpout.secureserver.net",
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
} catch (error) {
  console.error('Failed to initialize mail transporter:', error);
}

// Function to send an email with Promise support
const sendEmail = async (params: { email: string; message: string; subject?: string }): Promise<void> => {
  if (!transporter) {
    throw new Error('Mail service is not initialized. SMTP configuration failed.');
  }

  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.SMTP_FROM || "support@amkrtech.com",
      to: params.email,
      subject: params.subject || "Message from AMKRTech",
      text: params.message,
    };

    transporter!.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(new Error(`Failed to send email: ${error.message}`));
      } else {
        console.log("Email sent successfully:", info.response);
        resolve();
      }
    });
  });
};

export default {
  sendEmail,
};
