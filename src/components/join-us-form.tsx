"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { JoinUsFormSchema } from "@/lib/schema";
import { sendEmail } from "@/app/_action";
import { useToast } from "./ui/use-toast";

export type JoinUsFormInputs = z.infer<typeof JoinUsFormSchema>;

export default function JoinUsForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<JoinUsFormInputs>({
		resolver: zodResolver(JoinUsFormSchema),
	});

	const { toast } = useToast();

	const processForm: SubmitHandler<JoinUsFormInputs> = async (data) => {
		console.log("data", data);
		const result = await sendEmail(data);

		if (result?.success) {
			console.log({ data: result.data });
			toast({
				description: "Your message has been sent!",
			});
			reset();
			setFileName({ name: "" });
			return;
		}

		// Toast Error //
		toast({
			description: "Something went wrong!",
		});
		console.log(result?.error);
	};

	const defaultFile = {
		file: undefined,
		name: "",
	};
	const [fileName, setFileName] = useState<{
		file?: ReadableStream;
		name: string;
	}>(defaultFile);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileName({
				file: file.stream(),
				name: file.name,
			});
			// register("resumeAndPortfolio");
			console.log("file", fileName);
		}
	};

	return (
		<div className="w-full flex flex-col bg-[#E9E5E1] px-6 lg:px-11 py-7">
			<div className="w-full flex justify-end items-end">
				<p className="text-[15px] text-black text-right">
					<span className="text-red-500">*</span>
					Required
				</p>
			</div>
			<form
				onSubmit={handleSubmit(processForm)}
				className="mt-[26px] w-full flex flex-col gap-[18px] lg:gap-[22px]"
			>
				{/* <-- === Name Input Start === --> */}
				<div className="flex items-center justify-center w-full">
					<div className="w-1/3">
						<label className="text-base text-black text-left">
							Name
							<span className="text-red-500">*</span>
						</label>
					</div>
					<input
						type="text"
						placeholder="Enter your name"
						autoComplete="off"
						required
						{...register("name")}
						className="w-full px-4 pt-2 pb-[10px] bg-bgbase placeholder-[#aaaaaa] text-black text-base border border-black border-opacity-20 focus:outline-none focus:border-black focus:border-opacity-40 rounded-none"
					/>
					{errors.name?.message && (
						<p className="ml-1 mt-1 text-sm text-red-400">
							{errors.name.message}
						</p>
					)}
				</div>
				{/* <-- === Name Input End === --> */}

				{/* <-- === Email Input Start === --> */}
				<div className="flex items-center justify-center w-full">
					<div className="w-1/3">
						<label className="text-base text-black text-left">
							Email
							<span className="text-red-500">*</span>
						</label>
					</div>
					<input
						type="email"
						placeholder="Enter your email"
						autoComplete="off"
						required
						{...register("email")}
						className="w-full px-4 pt-2 pb-[10px] bg-bgbase placeholder-[#aaaaaa] text-black text-base border border-black border-opacity-20 focus:outline-none focus:border-black focus:border-opacity-40 rounded-none"
					/>
					{errors.email?.message && (
						<p className="ml-1 mt-1 text-sm text-red-400">
							{errors.email.message}
						</p>
					)}
				</div>
				{/* <-- === Email Input End === --> */}

				{/* <-- === Phone Input Start === --> */}
				<div className="flex items-center justify-center w-full">
					<div className="w-1/3">
						<label className="text-base text-black text-left">
							Phone
							<span className="text-red-500">*</span>
						</label>
					</div>
					<input
						type="tel"
						placeholder="Enter your number"
						autoComplete="off"
						required
						{...register("phone")}
						className="w-full px-4 pt-2 pb-[10px] bg-bgbase placeholder-[#aaaaaa] text-black text-base border border-black border-opacity-20 focus:outline-none focus:border-black focus:border-opacity-40 rounded-none"
					/>
					{errors.phone?.message && (
						<p className="ml-1 mt-1 text-sm text-red-400">
							{errors.phone.message}
						</p>
					)}
				</div>
				{/* <-- === Phone Input End === --> */}

				{/* <-- === Location Input Start === --> */}
				<div className="flex items-center justify-center w-full">
					<div className="w-1/3">
						<label className="text-base text-black text-left">
							Location
							<span className="text-red-500">*</span>
						</label>
					</div>
					<input
						type="text"
						placeholder="Enter your location"
						autoComplete="off"
						required
						{...register("location")}
						className="w-full px-4 pt-2 pb-[10px] bg-bgbase placeholder-[#aaaaaa] text-black text-base border border-black border-opacity-20 focus:outline-none focus:border-black focus:border-opacity-40 rounded-none"
					/>
					{errors.location?.message && (
						<p className="ml-1 mt-1 text-sm text-red-400">
							{errors.location.message}
						</p>
					)}
				</div>
				{/* <-- === Location Input End === --> */}

				{/* <-- === Attachment Start === --> */}
				<div className="flex items-start justify-center w-full">
					<div className="w-1/3 text-wrap">
						<label className="text-base text-black text-left leading-snug">
							Resume & Portfolio
							<span className="text-red-500">*</span>
						</label>
					</div>
					<div className="w-full flex flex-col justify-center items-start">
						<label
							htmlFor="file-upload"
							className="custom-file-upload text-base text-blue-600"
						>
							Add attachment
						</label>
						<input
							id="file-upload"
							type="file"
							required
							className="hidden"
							// {...register("resumeAndPortfolio")}
							onChange={(e) => {
								handleFileChange(e);
								register("resumeAndPortfolio").onChange(e);
							}}
						/>
						<p className="text-sm text-black text-opacity-40 text-left">
							(File types : pdf, doc, docx, txt)
						</p>

						<p className="mt-4">{fileName?.name}</p>
					</div>
				</div>
				{/* <-- === Attachment End === --> */}

				<div className="w-full h-[1px] bg-black opacity-15 mt-3"></div>

				{/* <-- === CTA Start === --> */}
				<div className="w-full flex items-center justify-end mt-3">
					<button
						type="submit"
						className="w-fit bg-[#ADA098] text-white text-base px-5 pt-2 pb-[10px]"
					>
						{isSubmitting ? "Wait a sec..." : "Send Application"}
					</button>
				</div>
				{/* <-- === CTA End === --> */}
			</form>
		</div>
	);
}
