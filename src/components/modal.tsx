"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchConfiguration } from "@/services/configurationService";

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
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [code, setCode] = useState("");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const checkSession = async () => {
			const sessionCode = sessionStorage.getItem("projectCodeVerified");
			if (sessionCode) {
				const isValid = await fetchConfiguration(sessionCode);
				if (isValid) {
					setOpen(false);
				} else {
					sessionStorage.removeItem("projectCodeVerified");
					router.push("/");
				}
			} else {
				setOpen(true);
			}
			setLoading(false);
		};

		checkSession();
	}, [router]);

	const handleSubmit = async () => {
		setError(null);

		const isValid = await fetchConfiguration(code);

		if (isValid) {
			sessionStorage.setItem("projectCodeVerified", code);
			setOpen(false);
		} else {
			setError("Invalid code");
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

	if (loading) {
		return null; // Render nothing while checking session
	}

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
          inputMode="text"
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
                CP 01 - Devina +62 812 3024 660
              </span>
            </AlertDialogDescription>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full">
          <Link
            href="https://wa.me/6281803383993"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AlertDialogDescription className="pb-[3px] px-[1px] border-b-[0.5px] border-neutral-500 w-fit cursor-pointer group hover:border-white duration-300">
              <span className="text-neutral-300 group-hover:text-white duration-300">
                CP 02 - Dio +62 818 0338 3993
              </span>
            </AlertDialogDescription>
          </Link>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
