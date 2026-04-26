import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── HTML Email Template for Contact Confirmation ──────────────────────────
function buildContactConfirmationEmail(fullName, service, message) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You for Contacting Creastech</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header with Logo -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a1628 0%,#0077a8 100%);padding:36px 40px;text-align:center;">
              <img src="https://www.creastech.com/logo.png" alt="Creastech Limited" width="180" style="margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;" />
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">
                CREASTECH LIMITED
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                System Integration | Managed Services | Consulting | Training
              </p>
            </td>
          </tr>

          <!-- Success Badge -->
          <tr>
            <td style="background:#00b4d8;padding:16px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;">
                ✅ &nbsp;Your message has been received!
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 24px;">
              <p style="margin:0 0 8px;color:#0a1628;font-size:20px;font-weight:700;">
                Dear ${fullName},
              </p>
              <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.7;">
                Thank you for reaching out to Creastech Limited. We have received your message and one of our representatives will get back to you within 24-48 business hours.
              </p>

              <!-- Message Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 16px;color:#0077a8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">
                      Your Message Summary
                    </p>
                    <p style="margin:0 0 12px;color:#0a1628;font-size:14px;font-weight:700;">
                      Service of Interest:
                    </p>
                    <p style="margin:0 0 20px;color:#374151;font-size:14px;">
                      ${service || "Not specified"}
                    </p>
                    <p style="margin:0 0 12px;color:#0a1628;font-size:14px;font-weight:700;">
                      Message:
                    </p>
                    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                      ${message.substring(0, 300)}${message.length > 300 ? '...' : ''}
                    </p>
                  </td>
                </table>
              </table>

              <!-- What Happens Next -->
              <p style="margin:0 0 12px;color:#0a1628;font-size:15px;font-weight:700;">
                What Happens Next?
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:5px 0;">
                    <span style="color:#00b4d8;font-size:14px;">✓</span>
                    <span style="color:#374151;font-size:14px;margin-left:8px;">Our team will review your inquiry</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 0;">
                    <span style="color:#00b4d8;font-size:14px;">✓</span>
                    <span style="color:#374151;font-size:14px;margin-left:8px;">A specialist will contact you within 24-48 hours</span>
                   </td>
                </tr>
                <tr>
                  <td style="padding:5px 0;">
                    <span style="color:#00b4d8;font-size:14px;">✓</span>
                    <span style="color:#374151;font-size:14px;margin-left:8px;">We'll schedule a consultation at your convenience</span>
                   </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;color:#4b5563;font-size:14px;line-height:1.7;">
                In the meantime, feel free to:
              </p>
              <ul style="margin:10px 0 20px 20px;color:#4b5563;font-size:14px;">
                <li>Call us at <strong style="color:#0a1628;">+234 708 475 5837</strong></li>
                <li>Visit our office at <strong style="color:#0a1628;">16A Oguntona Crescent, Gbagada Phase 1, Lagos</strong></li>
                <li>Explore our services at <a href="https://www.creastech.com/services" style="color:#00b4d8;">www.creastech.com/services</a></li>
              </ul>
             </td>
           </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
             </td>
           </tr>

          <!-- Footer Signature with Partner Images -->
          <tr>
            <td style="padding:28px 40px 16px;">
              <!-- Partner Logos Strip Image -->
              <div style="text-align:center;margin-bottom:24px;">
                <img src="https://www.creastech.com/images/partners.png" 
                     alt="Creastech Partners: HP, Fortinet, Dell EMC, IBM, Sophos, AWS, Cisco Meraki, Veeam" 
                     style="max-width:100%;height:auto;border-radius:8px;"
                     onerror="this.style.display='none'" />
              </div>
              
              <p style="margin:0 0 4px;color:#0a1628;font-size:14px;font-weight:700;">Best Regards,</p>
              <p style="margin:0 0 2px;color:#0a1628;font-size:14px;font-weight:700;">Creastech Customer Support Team</p>
              <p style="margin:0 0 2px;color:#6b7280;font-size:13px;">Creastech Limited</p>
              <p style="margin:0 0 2px;color:#6b7280;font-size:13px;">
                📱 +234 708 475 5837 | +234 901 983 2344
              </p>
              <p style="margin:0 0 2px;color:#6b7280;font-size:13px;">
                📧 info@creastech.com | 🌐 www.creastech.com
              </p>
              <p style="margin:0 0 2px;color:#6b7280;font-size:13px;">
                📍 16A Oguntona Crescent, Gbagada Phase 1, Lagos
              </p>
             </td>
           </tr>

          <!-- Social / Instagram Link -->
          <tr>
            <td style="padding:0 40px 16px;">
              <div style="text-align:center;">
                <a href="https://instagram.com/creastechlimited" style="color:#0077a8;text-decoration:none;font-size:12px;">📸 Instagram: @creastechlimited</a>
                &nbsp;|&nbsp;
                <a href="https://linkedin.com/company/creastech-limited" style="color:#0077a8;text-decoration:none;font-size:12px;">💼 LinkedIn</a>
              </div>
             </td>
           </tr>

          <!-- Partner Text Strip -->
          <tr>
            <td style="padding:0 40px 20px;">
              <div style="text-align:center;border-top:1px solid #e5e7eb;padding-top:16px;">
                <p style="margin:0 0 6px;color:#0a1628;font-size:10px;font-weight:700;letter-spacing:1px;">
                  SYSTEM INTEGRATION | MANAGED SERVICES | CONSULTING | TRAINING
                </p>
                <p style="margin:0;color:#9ca3af;font-size:8px;">
                  hp | FORTINET | DELL EMC | MICRO FOCUS | DINSTAR | MikroTik | IBM | SOPHOS | AWS 
                  | GRANDSTREAM | UBIQUITI | ZABBIX | Veeam | NAKIVO | Cisco Meraki
                </p>
              </div>
             </td>
           </tr>

          <!-- Bottom Bar -->
          <tr>
            <td style="background:#0a1628;padding:16px 40px;text-align:center;border-radius:0 0 12px 12px;">
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;">
                © ${new Date().getFullYear()} Creastech Limited. All rights reserved. &nbsp;|&nbsp;
                <a href="https://www.creastech.com" style="color:rgba(255,255,255,0.5);text-decoration:none;">www.creastech.com</a>
              </p>
             </td>
           </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

// ── HTML Email Template for Admin (Contact Form) ───────────────────────────
function buildAdminContactEmail(fullName, company, email, phone, service, message) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a1628 0%,#0077a8 100%);padding:28px 40px;">
              <img src="https://www.creastech.com/logo.png" alt="Creastech" width="120" style="margin-bottom:12px;" />
              <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">
                📋 New Contact Form Submission
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
                A new message has been received from the website
              </p>
             </td>
           </tr>

          <!-- Details -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ["Full Name", fullName],
                  ["Company", company || "Not provided"],
                  ["Email", email],
                  ["Phone", phone || "Not provided"],
                  ["Service of Interest", service || "Not provided"],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:40%;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;">${label}</span>
                   </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="color:#0a1628;font-size:14px;font-weight:600;">${value}</span>
                   </td>
                </tr>`).join("")}
                <tr>
                  <td style="padding:15px 0 5px 0;width:40%;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;">Message:</span>
                   </td>
                  <td style="padding:15px 0 5px 0;">
                    <span style="color:#0a1628;font-size:14px;">${message}</span>
                   </td>
                </tr>
              </table>
             </td>
           </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a1628;padding:16px 40px;text-align:center;border-radius:0 0 12px 12px;">
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;">
                Creastech Contact System &nbsp;|&nbsp; ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}
              </p>
             </td>
           </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ── Main Route Handler ──────────────────────────────────────────────────────
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

    // Send admin notification email
    await transporter.sendMail({
      from: `"Creastech Website" <${process.env.SMTP_USER}>`,
      to: "info@creastech.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${fullName}`,
      html: buildAdminContactEmail(fullName, company, email, phone, service, message),
      text: `New contact form submission from ${fullName} (${email}). Service: ${service || "N/A"}. Message: ${message}`,
    });

    // Send auto-reply confirmation to the user
    await transporter.sendMail({
      from: `"Creastech Limited" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting Creastech Limited",
      html: buildContactConfirmationEmail(fullName, service, message),
      text: `Dear ${fullName}, thank you for contacting Creastech Limited. We have received your message and will get back to you within 24-48 business hours.`,
    });

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