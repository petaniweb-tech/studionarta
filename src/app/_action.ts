"use server";

import { z } from "zod";
import { Resend } from "resend";
import { JoinUsPayloadSchema } from "@/lib/schema";
import JoinUsFormEmail from "../../emails/join-us-form-email";

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

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(data: JoinUsFormInputs) {
	const result = JoinUsPayloadSchema.safeParse(data);

	if (result.success) {
		const { name, email, phone, location, resumeAndPortfolio } =
			result.data;
		try {
			const emailData = await resend.emails.send({
				from: "noreply@petaniweb.com",
				to: ["aliffirdaus@petaniweb.com"],
				subject: "Studionarta Application",
				text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nResume & Portfolio: ${resumeAndPortfolio}`, // Adjust the text if necessary
				react: JoinUsFormEmail({
					name,
					email,
					phone,
					location,
					resumeAndPortfolio: resumeAndPortfolio.name,
				}),
				attachments: [
					{
						filename: "formfilename.pdf",
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
