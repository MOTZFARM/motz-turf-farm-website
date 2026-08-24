"use client";

import { useEffect } from "react";

const GOOGLE_ANALYTICS_ID = "G-8YX0YDQGPV";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};

export default function GoogleAnalytics() {
  useEffect(() => {
    const analyticsWindow = window as AnalyticsWindow;

    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer?.push(args);
    };

    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("config", GOOGLE_ANALYTICS_ID);
    document.documentElement.dataset.analyticsReady = "true";

    if (!document.querySelector(`script[src*="${GOOGLE_ANALYTICS_ID}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
