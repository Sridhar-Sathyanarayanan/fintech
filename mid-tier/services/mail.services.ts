import nodemailer from "nodemailer";

// Create a transporter using SMTP server with error handling
let transporter: nodemailer.Transporter | null = null;

try {
  transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "support@amkrtech.com",
      pass: "amkr@2025",
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
      from: "support@amkrtech.com",
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
