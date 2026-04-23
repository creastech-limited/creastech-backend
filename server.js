const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();



const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "https://creastech.com",
    "https://www.creastech.com",
    "http://localhost:3000",
    "http://localhost:3001"
  ]
}));

const WEBINAR_DETAILS = {
  title: "Transforming Customer Experience with AI-Powered Contact Center Solutions",
  date: "Thursday, May 15th, 2026",
  time: "11:00 AM - 12:30 PM (WAT)",
  zoomLink: "https://us06web.zoom.us/j/1234567890?pwd=your_password_here",
};

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Creastech backend is running" });
});

// Helper function to get email transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST,
    port: Number(process.env.ZOHO_SMTP_PORT),
    secure: Number(process.env.ZOHO_SMTP_PORT) === 465,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });
};

// CONTACT FORM - Using same Zoho credentials
app.post("/contact", async (req, res) => {
  try {
    const { fullName, company, email, phone, service, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Please fill in all required fields" });
    }

    const transporter = getTransporter();

    // Email to admin (info@creastech.com)
    await transporter.sendMail({
      from: `"${process.env.ZOHO_FROM_NAME}" <${process.env.ZOHO_FROM_EMAIL}>`,
      to: "info@creastech.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: `"${process.env.ZOHO_FROM_NAME}" <${process.env.ZOHO_FROM_EMAIL}>`,
      to: email,
      subject: "Thank you for contacting Creastech Limited",
      html: `
        <h2>Thank You for Contacting Creastech Limited</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for reaching out to us. We have received your message and one of our representatives will get back to you within 24-48 business hours.</p>
        <p>Best regards,<br>Creastech Limited Team</p>
      `,
    });

    return res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

// WEBINAR FORM - Using same Zoho credentials
app.post("/webinar/register", async (req, res) => {
  try {
    const { fullName, email, phone, company, jobTitle, howDidYouHear } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: "Please provide your full name and email address" });
    }

    // Check if email config exists
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      console.error("Missing email configuration");
      return res.status(500).json({ error: "Email service is not configured" });
    }

    const transporter = getTransporter();

    // Email to admin (info@creastech.com)
    await transporter.sendMail({
      from: `"${process.env.ZOHO_FROM_NAME}" <${process.env.ZOHO_FROM_EMAIL}>`,
      to: "info@creastech.com",
      replyTo: email,
      subject: `New Webinar Registration: ${fullName}`,
      html: `
        <h2>New Webinar Registration</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${jobTitle ? `<p><strong>Job Title:</strong> ${jobTitle}</p>` : ''}
      `,
    });

    // Confirmation email to registrant
    await transporter.sendMail({
      from: `"${process.env.ZOHO_FROM_NAME}" <${process.env.ZOHO_FROM_EMAIL}>`,
      to: email,
      subject: `Webinar Registration Confirmed: ${WEBINAR_DETAILS.title}`,
      html: `
        <h2>Webinar Registration Confirmed!</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for registering for our webinar: <strong>${WEBINAR_DETAILS.title}</strong></p>
        <p><strong>Date:</strong> ${WEBINAR_DETAILS.date}</p>
        <p><strong>Time:</strong> ${WEBINAR_DETAILS.time}</p>
        <p><strong>Join Link:</strong> <a href="${WEBINAR_DETAILS.zoomLink}">${WEBINAR_DETAILS.zoomLink}</a></p>
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br>Creastech Limited Team</p>
      `,
    });

    return res.json({ success: true, message: "Registration successful! Check your email for webinar details." });
  } catch (error) {
    console.error("Webinar error:", error);
    return res.status(500).json({ error: "Failed to register. Please try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));