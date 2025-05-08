"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CF_SCRIPT_URL, CF_SITE_KEY } from "@/lib/constants";

type TurnstileRenderParameters = Turnstile.RenderParameters;

export default function Captcha(
  props: Pick<
    TurnstileRenderParameters,
    "action" | "cData" | "callback" | "tabindex" | "theme" | "language"
  > & {
    sitekey?: TurnstileRenderParameters["sitekey"];
    errorCallback?: TurnstileRenderParameters["error-callback"];
    expiredCallback?: TurnstileRenderParameters["expired-callback"];
  }
) {
  const { sitekey, errorCallback, expiredCallback, ...rest } = props;

  const widgetID = useRef<string>();
  const [isError, setIsError] = useState(false);

  function retry() {
    setIsError(false);
  }

  function onError(e?: string | Error) {
    console.log(`Captcha error`, e);
    setIsError(true);
    if (errorCallback) {
      errorCallback();
    }
  }

  function renderWidget() {
    try {
      widgetID.current = turnstile.render("#captcha-container", {
        ...rest,
        // Refer: https://developers.cloudflare.com/turnstile/reference/testing/
        sitekey: sitekey || CF_SITE_KEY || "",
        "error-callback": onError,
        "expired-callback": expiredCallback,
      });
      if (!widgetID.current) {
        throw new Error(`turnstile.render return widgetID=${widgetID.current}`);
      }
    } catch (e: unknown) {
      onError(e as Error);
    }
  }

  function onLoad() {
    renderWidget();
  }

  useEffect(() => {
    if (!widgetID.current && (window as any).turnstile) {
      renderWidget();
    }
    return () => {
      (window as any).turnstile?.remove(widgetID.current || "");
      widgetID.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return (
      <div className="text-red-500 bg-white shadow-lg" onClick={retry}>
        Load captcha error
        <span className="text-blue-500 cursor-pointer inline-block text-sm font-semibold ml-2">
          Retry
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        id="captcha-container"
        className="cf-turnstile"
        data-theme="light"
      ></div>
      <Script
        src={CF_SCRIPT_URL}
        onLoad={onLoad}
        onError={(e) => onError("load error: " + e.message)}
      />
    </>
  );
}
