import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBINAR_DETAILS = {
  title: "Transforming Customer Experience with AI-Powered Contact Center Solutions",
  date: "Thursday, May 15th, 2026",
  time: "11:00 AM - 12:30 PM (WAT)",
  zoomLink: "https://us06web.zoom.us/j/1234567890?pwd=your_password_here",
};

export async function POST(request) {
  try {
    const { fullName, email, phone, company, jobTitle, howDidYouHear } = await request.json();

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Please provide your full name and email address" },
        { status: 400 }
      );
    }

    const host = process.env.ZOHO_SMTP_HOST;
    const port = Number(process.env.ZOHO_SMTP_PORT);
    const user = process.env.ZOHO_EMAIL;
    const pass = process.env.ZOHO_PASSWORD;
    const fromName = process.env.ZOHO_FROM_NAME;
    const fromEmail = process.env.ZOHO_FROM_EMAIL;

    if (!host || !port || !user || !pass || !fromName || !fromEmail) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: {
        user,
        pass,
      },
      tls: {
        minVersion: "TLSv1.2",
      },
    });

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: user,
      replyTo: email,
      subject: `New Webinar Registration: ${fullName}`,
      text: `New webinar registration from ${fullName} (${email})`,
    });

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: `Webinar Registration Confirmed: ${WEBINAR_DETAILS.title}`,
      text: `Dear ${fullName}, your registration for ${WEBINAR_DETAILS.title} is confirmed.`,
    });

    return NextResponse.json(
      { success: true, message: "Registration successful! Check your email for webinar details." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webinar registration error:", error);
    return NextResponse.json(
      { error: "Failed to register. Please try again later." },
      { status: 500 }
    );
  }
}