import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors("*"));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    await transporter.sendMail({
      from: `"Maratha Vaduvar" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    res.json({ success: true, message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
