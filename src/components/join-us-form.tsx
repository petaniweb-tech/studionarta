"use client";

import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { JoinUsFormSchema, JoinUsPayloadSchema } from "@/lib/schema";
import { sendEmail } from "@/app/_action";
import { useToast } from "./ui/use-toast";

export type JoinUsFormInputs = z.infer<typeof JoinUsFormSchema>;

export default function JoinUsForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinUsFormInputs>({
    resolver: zodResolver(JoinUsFormSchema),
  });

  const { toast } = useToast();

  const readFileAsBuffer = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(new Uint8Array(reader.result as ArrayBuffer));
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () =>
        reject(reader.error || new Error("File reading error"));
      reader.readAsArrayBuffer(file);
    });
  };

  const processForm: SubmitHandler<JoinUsFormInputs> = async (data) => {
    const fileInput = inputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length <= 0) {
	  toast({ title: "Error form validation", description: "Resume & Portfolio is required" })
      return;
    }

    const fileName = fileInput.files[0].name;
    const buffer = await readFileAsBuffer(fileInput.files[0]);

    const payload = {
      ...data,
      resumeAndPortfolio: {
        name: fileName,
        file: buffer,
      },
    };

    const result = await sendEmail(payload);

    if (result?.success) {
      console.log({ data: result.data });
	  toast({ title: "Success", description: "Your message has been sent!" })
      reset();
      setFileName("");
      return;
    }

	toast({ title: "Error send email", description: "Something went wrong!" });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const [fileName, setFileName] = useState<string>("");

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
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              ref={inputRef}
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
            <p className="text-sm text-black text-opacity-40 text-left">
              (File types : pdf, doc, docx, txt)
            </p>

            {fileName && <p className="mt-4">{fileName}</p>}
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
