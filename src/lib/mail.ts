import nodemailer from "nodemailer";
const domain = process.env.DOMAIN || "http://localhost:3000";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (
  email: string,
  subject: string,
  token: string,
  mode: "verify" | "reset"
) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;
  const mailOptions = {
    from: "<onboardin@gmail.com>",
    to: email,
    subject: subject,
    html: `${
      mode === "reset"
        ? `
      <p>Your Reset Password Token is: ${token}</p>
    `
        : `
      <p>Click the link below to verify your email:</p>
      <a href="${confirmationLink}">Verify Email</a>
    `
    }`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return { success: "Email sent" };
  } catch (error: any) {
    return { error: error.message };
  }
};
