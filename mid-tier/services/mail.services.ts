import nodemailer from "nodemailer";

// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port:465,
  auth: {
    user: "support@amkrtech.com", // Email from environment variable
    pass: "amkr@2025", // Password from environment variable
  },
});

// Function to send an email
const sendEmail = async (params) => {
  const mailOptions = {
    from: "support@amkrtech.com",
    to: params.email,
    subject: "Test mail",
    text: params.message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default {
  sendEmail,
};
