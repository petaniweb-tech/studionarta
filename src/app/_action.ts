"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { JoinUsPayloadSchema } from "@/lib/schema";
import JoinUsFormEmail from "../../emails/join-us-form-email";
import { CF_URL, CF_SITE_KEY, CF_SECRET_KEY } from "@/lib/constants";

type JoinUsFormInputs = z.infer<typeof JoinUsPayloadSchema>;

export async function addEntry(data: JoinUsFormInputs) {
  const result = JoinUsPayloadSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

const verifyCaptcha = async (response: string, ip: string) => {
  try {
    const result = await fetch(CF_URL, {
      body: JSON.stringify({
        sitekey: CF_SITE_KEY,
        secret: CF_SECRET_KEY,
        response,
        remoteip: ip,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const outcome = await result.json();
    if (!outcome.success) {
      // Turnstile failed
      return {
        success: false,
        error: true,
        message: "Invalid CAPTCHA",
      };
    }

    // Turnstile success (HTTP 200)
    return {
      success: true,
      error: false,
      message: "",
    };
  } catch (err) {
    return {
      success: false,
      error: true,
      message: "Unable to verify CAPTCHA",
    };
  }
};
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: JoinUsFormInputs) {
  const ip = headers().get("x-real-ip") || "";
  const captchaResult = await verifyCaptcha(data.captchaToken, ip);
  if (!captchaResult.success) {
    return { success: false, error: captchaResult.message };
  }

  const result = JoinUsPayloadSchema.safeParse(data);

  if (result.success) {
    const { name, email, phone, location, resumeAndPortfolio } = result.data;
    try {
      const emailData = await resend.emails.send({
        from: "noreply@petaniweb.com",
        to: ["jobs.studionarta@gmail.com", "tech@petaniweb.com"],
        subject: "Studionarta Application",
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nResume & Portfolio: ${resumeAndPortfolio}`, // Adjust the text if necessary
        react: JoinUsFormEmail({
          name,
          email,
          phone,
          location,
        }),
        attachments: [
          {
            filename: resumeAndPortfolio.name,
            content: resumeAndPortfolio.file,
          },
        ],
      });
      return { success: true, data: emailData };
    } catch (error) {
      console.error("sendemailerror", error);
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
