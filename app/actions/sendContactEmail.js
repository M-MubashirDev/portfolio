"use server";

import nodemailer from "nodemailer";
import { contactSchema } from "@/app/lib/contactSchema";

export async function sendContactEmail(formData) {
  // Server-side validation (never trust client)
  const result = contactSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0].message,
    };
  }

  const { name, email, phone, objective, message } = result.data;

  try {
    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();

    // HTML template for the email
    const htmlContent = `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 12px;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 20px; margin-bottom: 30px;">
          <p style="font-size: 10px; letter-spacing: 0.3em; color: rgba(255,255,255,0.5); margin: 0;">// NEW INQUIRY</p>
          <h1 style="font-size: 28px; font-weight: 900; margin: 8px 0 0; letter-spacing: -0.02em;">PORTFOLIO CONTACT</h1>
        </div>

        <div style="display: grid; gap: 20px;">
          <div>
            <p style="font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin: 0 0 4px;">// NAME</p>
            <p style="font-size: 14px; margin: 0; color: #ffffff;">${name}</p>
          </div>

          <div>
            <p style="font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin: 0 0 4px;">// EMAIL</p>
            <p style="font-size: 14px; margin: 0;"><a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></p>
          </div>

          <div>
            <p style="font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin: 0 0 4px;">// PHONE</p>
            <p style="font-size: 14px; margin: 0;"><a href="tel:${phone}" style="color: #ffffff; text-decoration: underline;">${phone}</a></p>
          </div>

          <div>
            <p style="font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin: 0 0 4px;">// PRIME OBJECTIVE</p>
            <p style="font-size: 14px; margin: 0; color: #ffffff;">${objective}</p>
          </div>

          <div>
            <p style="font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin: 0 0 4px;">// MESSAGE</p>
            <p style="font-size: 14px; margin: 0; color: #ffffff; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.15); margin-top: 40px; padding-top: 20px;">
          <p style="font-size: 10px; color: rgba(255,255,255,0.3); margin: 0;">// SENT FROM PORTFOLIO CONTACT FORM · ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New Inquiry: ${objective} — ${name}`,
      text: `New inquiry from ${name}\n\nEmail: ${email}\nPhone: ${phone}\nObjective: ${objective}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
