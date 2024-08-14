"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchConfiguration } from "@/services/configurationService";
import { ConfigurationDataType } from "@/types/configuration";

// Import Components //
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function Modal() {
	const [open, setOpen] = useState(true);
	const [code, setCode] = useState("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const sessionCode = sessionStorage.getItem("projectCodeVerified");
		if (sessionCode) {
			setOpen(false);
		}
	}, []);

	const handleSubmit = async () => {
		setError(null);

		const config: ConfigurationDataType | null =
			await fetchConfiguration(code);

		if (config) {
			const currentDate = new Date();
			const expiryDate = new Date(config.expiryDate);

			if (currentDate <= expiryDate) {
				sessionStorage.setItem("projectCodeVerified", "true");
				setOpen(false);
			} else {
				setError("The code has expired.");
			}
		} else {
			setError("Invalid code.");
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.stopPropagation();
				event.preventDefault();
			}
		};

		document.addEventListener("keydown", handleKeyDown, true);
		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
		};
	}, []);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogTitle>Enter your code</AlertDialogTitle>
				<AlertDialogDescription>
					Please enter your unique code to continue
				</AlertDialogDescription>

				<InputOTP
					maxLength={6}
					pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
					onChange={(value) => setCode(value.toUpperCase())}
				>
					<InputOTPGroup className="mt-6">
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>

				{error && (
					<div className="w-full mt-2 rounded bg-red-500 bg-opacity-[0.08] border border-red-500 border-opacity-20 flex items-center justify-center pt-[7px] pb-2">
						<p className="text-red-500 text-sm text-center font-supportingfont">
							{error}
						</p>
					</div>
				)}

				<AlertDialogAction
					onClick={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					className="mt-6 text-lg font-semibold py-6"
				>
					Submit
				</AlertDialogAction>

				<AlertDialogDescription className="mt-7 leading-[1.58] text-wrap">
					For information regarding our Corporate Projects please{" "}
					<br className="hidden lg:block" />
					contact our support
				</AlertDialogDescription>

				<div className="flex items-center justify-center w-full mt-3">
					<Link
						href="https://wa.me/628123024660"
						target="_blank"
						rel="noopener noreferrer"
					>
						<AlertDialogDescription className="pb-[3px] px-[1px] border-b-[0.5px] border-neutral-500 w-fit cursor-pointer group hover:border-white duration-300">
							<span className="text-neutral-300 group-hover:text-white duration-300">
								Devina +62 812 3024 660
							</span>
						</AlertDialogDescription>
					</Link>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
