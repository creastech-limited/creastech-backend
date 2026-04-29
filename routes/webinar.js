import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBINAR_DETAILS = {
  title: "Transforming Customer Experience with AI-Powered Contact Center Solutions",
  date: "Thursday, May 7th, 2026",
  time: "11:00 AM - 12:30 PM (WAT)",
  zoomLink: "https://us06web.zoom.us/j/82986785755",
};

// ── HTML Email Template for Registrant (with images) ─────────────────────────
function buildConfirmationEmail(fullName, company) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Webinar Registration Confirmed</title>
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
                ✅ &nbsp;You're Registered! Your spot is confirmed.
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
                Thank you for registering! We're excited to have you join us for our upcoming webinar. 
                Below are your confirmed event details — please save them.
              </p>

              <!-- Webinar Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 16px;color:#0077a8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">
                      Webinar Details
                    </p>
                    <p style="margin:0 0 12px;color:#0a1628;font-size:16px;font-weight:700;line-height:1.4;">
                      ${WEBINAR_DETAILS.title}
                    </p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:5px 0;">
                          <span style="color:#0077a8;font-size:14px;">📅</span>
                          <span style="color:#374151;font-size:14px;margin-left:8px;">${WEBINAR_DETAILS.date}</span>
                         </td>
                       </tr>
                       <tr>
                        <td style="padding:5px 0;">
                          <span style="color:#0077a8;font-size:14px;">🕐</span>
                          <span style="color:#374151;font-size:14px;margin-left:8px;">${WEBINAR_DETAILS.time}</span>
                         </td>
                       </tr>
                       <tr>
                        <td style="padding:5px 0;">
                          <span style="color:#0077a8;font-size:14px;">💻</span>
                          <span style="color:#374151;font-size:14px;margin-left:8px;">Zoom (Online)</span>
                         </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
               </table>

              <!-- Join Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${WEBINAR_DETAILS.zoomLink}"
                      style="display:inline-block;background:linear-gradient(135deg,#0077a8,#00b4d8);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:8px;letter-spacing:0.3px;">
                      Join Webinar on Zoom →
                    </a>
                   </td>
                 </tr>
               </table>

              <!-- Zoom Link Text -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 6px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                      Or copy this link
                    </p>
                    <p style="margin:0;color:#0077a8;font-size:13px;word-break:break-all;">
                      ${WEBINAR_DETAILS.zoomLink}
                    </p>
                   </td>
                 </tr>
               </table>

              <!-- What to Expect -->
              <p style="margin:0 0 12px;color:#0a1628;font-size:15px;font-weight:700;">
                What to Expect:
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${[
                  "Introduction to AI-Powered Contact Centers",
                  "Live Demo: HoduCC Omni-Channel Platform",
                  "How to Reduce Call Handling Time by 40%",
                  "Real Business Cases & ROI Analysis",
                  "Q&A Session with Creastech Experts",
                ].map(item => `
                <tr>
                  <td style="padding:5px 0;">
                    <span style="color:#00b4d8;font-size:14px;">✓</span>
                    <span style="color:#374151;font-size:14px;margin-left:8px;">${item}</span>
                   </td>
                 </tr>`).join("")}
               </table>

              <p style="margin:0 0 4px;color:#4b5563;font-size:14px;line-height:1.7;">
                If you have any questions before the webinar, feel free to reply to this email.
              </p>
              <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.7;">
                We look forward to seeing you there!
              </p>
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
              <p style="margin:0 0 2px;color:#0a1628;font-size:14px;font-weight:700;">JOLADE Boluwatiye</p>
              <p style="margin:0 0 2px;color:#6b7280;font-size:13px;">Application Engineer | Creastech Limited</p>
              <p style="margin:0 0 2px;color:#6b7280;font-size:13px;">
                📱 Mobile & WhatsApp: 09078889632 | 09019832344
              </p>
              <p style="margin:0 0 2px;color:#6b7280;font-size:13px;">
                📧 jolade.boluwatiye@creastech.com | 🌐 www.creastech.com
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

// ── HTML Email Template for Internal Notification ───────────────────────────
function buildInternalNotificationEmail(fullName, email, phone, company, jobTitle, howDidYouHear) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>New Webinar Registration</title>
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
                🎯 New Webinar Registration
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
                Someone just registered for the April 30th webinar
              </p>
             </td>
           </tr>

          <!-- Details -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ["Full Name", fullName],
                  ["Email", email],
                  ["Phone", phone || "Not provided"],
                  ["Company", company || "Not provided"],
                  ["Job Title", jobTitle || "Not provided"],
                  ["How They Heard", howDidYouHear || "Not provided"],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:40%;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;">${label}</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="color:#0a1628;font-size:14px;font-weight:600;">${value}</span>
                  </td>
                </tr>`).join("")}
              </table>
             </td>
           </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a1628;padding:16px 40px;text-align:center;border-radius:0 0 12px 12px;">
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;">
                Creastech Webinar System &nbsp;|&nbsp; ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}
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

// ── Route Handler ────────────────────────────────────────────────────────────
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
      auth: { user, pass },
      tls: { minVersion: "TLSv1.2" },
    });

    // Send internal notification to Creastech team
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: user,
      replyTo: email,
      subject: `🎯 New Webinar Registration: ${fullName}`,
      html: buildInternalNotificationEmail(fullName, email, phone, company, jobTitle, howDidYouHear),
      text: `New webinar registration from ${fullName} (${email}). Company: ${company || "N/A"}. Phone: ${phone || "N/A"}.`,
    });

    // Send confirmation email to registrant
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: `✅ You're Registered! ${WEBINAR_DETAILS.title}`,
      html: buildConfirmationEmail(fullName, company),
      text: `Dear ${fullName}, your registration for ${WEBINAR_DETAILS.title} on ${WEBINAR_DETAILS.date} at ${WEBINAR_DETAILS.time} is confirmed. Join here: ${WEBINAR_DETAILS.zoomLink}`,
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