import { z } from "zod";

export const JoinUsFormSchema = z.object({
	name: z.string().min(1, { message: "Name is required." }),
	email: z
		.string()
		.min(1, { message: "Email is required." })
		.email({ message: "Invalid email." }),
	phone: z.string().min(1, { message: "Phone number is required." }),
	location: z.string().min(1, { message: "Location is required." }),
	resumeAndPortfolio: z.object({
		name: z.string().min(1, { message: "Filename is required" }),
		file: z.any().refine((file) => file && file.length > 0, {
			message: "File is required.",
		}),
	}),
});
