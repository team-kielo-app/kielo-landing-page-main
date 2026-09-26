"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Platform = "ios" | "android";

const APP_STORE_URL = "https://apps.apple.com/fi/app/kielo-learn-finnish-with-ai/id6749446603";
const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.kielo.app&referrer=" +
  encodeURIComponent("utm_source=kielo.app&utm_medium=app_banner&utm_campaign=lander");

// Opens the app when installed, otherwise Chrome follows the fallback to the Play listing.
const PLAY_INTENT_URL =
  "intent://#Intent;scheme=kieloapp;package=com.kielo.app;S.browser_fallback_url=" +
  encodeURIComponent(PLAY_URL) +
  ";end";
// Android WebViews (TikTok, Instagram, Facebook...) commonly refuse intent: navigation.
const ANDROID_WEBVIEW = /; wv\)|FBAN|FBAV|Instagram|musical_ly|Bytedance|TikTok|LinkedInApp|Snapchat|Line\//i;

const DISMISS_KEY = "kielo-app-banner-dismissed";
const DISMISS_DAYS = 30;
const COOKIEBOT_WAIT_MS = 4000;

type CookiebotGlobal = { hasResponse?: boolean };
type GtagFn = (...args: unknown[]) => void;

function detectPlatform(): Platform | null {
  const ua = navigator.userAgent;
  if (/bot|crawl|spider|lighthouse|headless|page speed|prerender/i.test(ua)) return null;

  const touch = (navigator.maxTouchPoints || 0) > 1;
  const isIOS = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && touch);
  if (isIOS) {
    // Real Safari renders the native apple-itunes-app banner; everything else (Chrome,
    // Firefox, TikTok/Instagram/Facebook in-app webviews) never shows it.
    const inAppOrOtherBrowser =
      /CriOS|FxiOS|EdgiOS|OPiOS|GSA\/|FBAN|FBAV|Instagram|LinkedInApp|musical_ly|Bytedance|TikTok|Snapchat|Twitter|Line\//i.test(
        ua,
      );
    const isSafari = /Safari\//.test(ua) && !inAppOrOtherBrowser;
    return isSafari ? null : "ios";
  }

  if (/android/i.test(ua)) return "android";
  // Android tablets in "Desktop site" mode report a Linux-desktop UA.
  if (/linux/i.test(ua) && !/cros/i.test(ua) && touch) return "android";
  return null;
}

function recentlyDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return at > 0 && Date.now() - at < DISMISS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

function storeHref(platform: Platform): string {
  if (platform === "ios") return APP_STORE_URL;
  return ANDROID_WEBVIEW.test(navigator.userAgent) ? PLAY_URL : PLAY_INTENT_URL;
}

function track(event: string, platform: Platform) {
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  gtag?.("event", event, { platform, placement: "smart_banner" });
}

export default function AppBanner() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detected = detectPlatform();
    if (!detected || recentlyDismissed()) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      (window.requestIdleCallback ?? ((f: () => void) => setTimeout(f, 1)))(() => setPlatform(detected));
    };

    // Don't stack on top of the Cookiebot consent dialog — wait for a decision.
    const getCookiebot = () => (window as unknown as { Cookiebot?: CookiebotGlobal }).Cookiebot;
    const check = () => {
      if (getCookiebot()?.hasResponse) show();
    };
    // Cookiebot may never answer (blocked script, unauthorised domain, geo rules without a
    // dialog). After the wait, show unless the consent dialog is actually on screen.
    const fallback = () => {
      const dialog = document.getElementById("CybotCookiebotDialog");
      if (!dialog || dialog.offsetParent === null) show();
    };
    const consentEvents = ["CookiebotOnAccept", "CookiebotOnDecline"];
    consentEvents.forEach((e) => window.addEventListener(e, show));
    window.addEventListener("CookiebotOnLoad", check);
    check();
    const timer = setTimeout(fallback, COOKIEBOT_WAIT_MS);

    return () => {
      clearTimeout(timer);
      consentEvents.forEach((e) => window.removeEventListener(e, show));
      window.removeEventListener("CookiebotOnLoad", check);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!platform || !el) return;

    // position:fixed anchors to the layout viewport, which pinch-zoom pushes off-screen.
    // Track the visual viewport and counter-scale so the bar stays visible at any zoom.
    const vv = window.visualViewport;
    let frame = 0;
    const place = () => {
      frame = 0;
      if (vv) {
        const s = vv.scale || 1;
        el.style.width = `${vv.width * s}px`;
        el.style.transform = `translate(${vv.offsetLeft}px, ${vv.offsetTop + vv.height - el.offsetHeight / s}px) scale(${1 / s})`;
      }
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    vv?.addEventListener("resize", schedule);
    vv?.addEventListener("scroll", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      vv?.removeEventListener("resize", schedule);
      vv?.removeEventListener("scroll", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.body.style.paddingBottom = "";
    };
  }, [platform]);

  if (!platform) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    track("app_banner_dismiss", platform);
    setPlatform(null);
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Get the Kielo app"
      className={`fixed left-0 z-[2147483647] flex w-full items-center gap-3 border-t border-[#ece8d8] bg-[#fcfaf2] px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] shadow-[0_-6px_24px_rgba(0,0,0,0.12)] select-none ${
        typeof window !== "undefined" && window.visualViewport ? "top-0 origin-top-left" : "bottom-0"
      }`}
    >
      <Image
        src="/favicons/web-app-manifest-192x192.png"
        alt=""
        width={44}
        height={44}
        unoptimized
        loading="eager"
        className="h-11 w-11 shrink-0 rounded-[10px]"
      />
      <div className="min-w-0 grow leading-tight">
        <div className="truncate text-sm font-semibold text-[#374151]">Kielo</div>
        <div className="mt-0.5 truncate text-xs text-[#6B7280]">Learn Finnish with AI</div>
      </div>
      <a
        href={storeHref(platform)}
        onClick={() => track("app_banner_click", platform)}
        className="shrink-0 rounded-full bg-[#898bdb] px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap text-white no-underline"
      >
        Get the app
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="shrink-0 cursor-pointer border-0 bg-transparent p-1 text-[#6B7280]"
      >
        <X size={20} />
      </button>
    </div>
  );
}
