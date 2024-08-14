"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
	React.ElementRef<typeof OTPInput>,
	React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn(
			"flex items-center justify-center w-full has-[:disabled]:opacity-50",
			containerClassName
		)}
		className={cn("disabled:cursor-not-allowed", className)}
		{...props}
	/>
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex items-center justify-center lg:gap-3 w-full",
			className
		)}
		{...props}
	/>
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			ref={ref}
			className={cn(
				"relative flex w-[50px] h-[50px] lg:w-16 lg:h-[66px] uppercase text-white text-2xl lg:text-2xl font-supportingfont items-center justify-center lg:border transition-all border-y border-r first:border-l first:rounded-l-md last:rounded-r-md lg:rounded-md border-white border-opacity-15",
				isActive && "z-10 ring-1 ring-slate-300 ring-offset-slate-950",
				className
			)}
			{...props}
		>
			<input
				type="text"
				inputMode="text"
				pattern="[A-Za-z0-9]*"
				maxLength={1}
				value={char || ""}
				readOnly
				className="sr-only"
			/>

			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-slate-950 duration-1000 dark:bg-slate-50" />
				</div>
			)}
		</div>
	);
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
	<div ref={ref} role="separator" {...props}>
		<Dot />
	</div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
