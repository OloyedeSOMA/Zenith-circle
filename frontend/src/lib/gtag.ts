export const GA_MEASUREMENT_ID = "G-100LXZX16C";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, params);
};