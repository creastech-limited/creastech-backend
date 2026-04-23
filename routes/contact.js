import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { fullName, company, email, phone, service, message } = await request.json();

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,     
      port: Number(process.env.SMTP_PORT), 
      secure: false,                  
      auth: {
        user: process.env.SMTP_USER,   
        pass: process.env.SMTP_PASS,   
      },
    });

    // Email content
    const mailOptions = {
      from: `"Creastech Website" <${process.env.SMTP_USER}>`,
      to: "info@creastech.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #00B4D8; border-bottom: 2px solid #00B4D8; padding-bottom: 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0A1628; }
            .value { margin-top: 5px; color: #555; }
            .message-box { background: #F0F4F8; padding: 15px; border-radius: 8px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New Contact Form Submission</h2>
            
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${fullName}</div>
            </div>
            
            ${company ? `
            <div class="field">
              <div class="label">Company/Organization:</div>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Email Address:</div>
              <div class="value">${email}</div>
            </div>
            
            ${phone ? `
            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            
            ${service ? `
            <div class="field">
              <div class="label">Service of Interest:</div>
              <div class="value">${service}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <hr style="margin: 20px 0; border-color: #ddd;">
            <p style="font-size: 12px; color: #999;">
              This message was sent from the Creastech website contact form.
              Reply to this email to respond to ${fullName} directly at ${email}.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission from ${fullName}
        
        Full Name: ${fullName}
        ${company ? `Company: ${company}` : ''}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        ${service ? `Service: ${service}` : ''}
        
        Message:
        ${message}
        
        ---
        Reply to this email to respond to ${fullName} at ${email}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send auto-reply to the user
    const autoReplyOptions = {
      from: `"Creastech Limited" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting Creastech Limited",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #00B4D8; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Thank You for Contacting Creastech Limited</h2>
            <p>Dear ${fullName},</p>
            <p>Thank you for reaching out to us. We have received your message and one of our representatives will get back to you within 24-48 business hours.</p>
            
            <h3>Your Message Summary:</h3>
            <p><strong>Service of Interest:</strong> ${service || "Not specified"}</p>
            <p><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Call us at +234 708 475 5837</li>
              <li>Visit our office at 16A Oguntona Crescent, Gbagada Phase 1, Lagos</li>
              <li>Explore our services at www.creastech.com/services</li>
            </ul>
            
            <p>Best regards,<br>
            <strong>Creastech Limited Team</strong><br>
            Your Gateway to Innovation</p>
            
            <div class="footer">
              <p>This is an automated response. Please do not reply directly to this email.</p>
              <p>© ${new Date().getFullYear()} Creastech Limited. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}