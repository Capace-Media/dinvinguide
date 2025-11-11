"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    silktideCookieBannerManager?: {
      initCookieBanner: () => void;
      updateCookieBannerConfig: (config: any) => void;
      injectScript: (url: string, loadOption?: string) => void;
    };
  }
}

// Cookie banner configuration
const cookieBannerConfig = {
  // Cookie prefix for localStorage keys
  cookiePrefix: process.env.NEXT_PUBLIC_COOKIE_PREFIX || "",
  // Cookie types configuration
  cookieTypes: [
    {
      id: "necessary",
      name: "Nödvändiga cookies",
      description:
        "Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. De kan inte stängas av.",
      required: true,
      defaultValue: true,
      onAccept: () => {
        // This will always run since it's required
        console.log("Necessary cookies accepted");
      },
    },
    {
      id: "analytics",
      name: "Analytiska cookies",
      description:
        "Dessa cookies hjälper oss att förstå hur besökare interagerar med webbplatsen genom att samla in och rapportera information anonymt.",
      required: false,
      defaultValue: true,
      onAccept: () => {
        // Initialize analytics (e.g., Google Analytics)
        console.log("Analytics cookies accepted");
        // Add your analytics initialization code here
        // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
      },
      onReject: () => {
        // Disable analytics
        console.log("Analytics cookies rejected");
        // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
      },
    },
    {
      id: "marketing",
      name: "Marknadsföringscookies",
      description:
        "Dessa cookies används för att leverera annonser som är mer relevanta för dig och dina intressen.",
      required: false,
      defaultValue: false,
      onAccept: () => {
        // Initialize marketing scripts
        console.log("Marketing cookies accepted");
        // Add your marketing scripts here
      },
      onReject: () => {
        // Disable marketing scripts
        console.log("Marketing cookies rejected");
      },
    },
  ],
  // Text customization (Swedish)
  text: {
    banner: {
      description:
        "<p>Vi använder cookies på vår webbplats för att förbättra din användarupplevelse, tillhandahålla personligt innehåll och analysera vår trafik.</p>",
      acceptAllButtonText: "Acceptera alla",
      rejectNonEssentialButtonText: "Avvisa icke-nödvändiga",
      preferencesButtonText: "Inställningar",
    },
    preferences: {
      title: "Anpassa dina cookie-inställningar",
      description:
        "<p>Vi respekterar din rätt till integritet. Du kan välja att inte tillåta vissa typer av cookies. Dina cookie-inställningar kommer att gälla på hela vår webbplats.</p>",
      creditLinkText: "Få denna banner gratis",
    },
  },
  // Position configuration
  position: {
    banner: "bottomRight" as const, // Options: bottomRight, bottomLeft, bottomCenter, center
  },
  // Cookie icon configuration
  cookieIcon: {
    position: "bottomLeft" as const, // Options: bottomLeft, bottomRight
    colorScheme: "light" as const, // Options: light, dark
  },
  // Background configuration
  background: {
    showBackground: true,
  },
  // Show banner on first visit
  showBanner: true,
  // Optional callbacks
  onBannerOpen: () => {
    console.log("Cookie banner opened");
  },
  onBannerClose: () => {
    console.log("Cookie banner closed");
  },
  onPreferencesOpen: () => {
    console.log("Preferences modal opened");
  },
  onPreferencesClose: () => {
    console.log("Preferences modal closed");
  },
};

export default function CookieConsent() {
  const initializedRef = useRef(false);
  const cssLoadedRef = useRef(false);

  // Load CSS
  useEffect(() => {
    if (typeof document !== "undefined" && !cssLoadedRef.current) {
      const existingLink = document.querySelector(
        'link[href="/silktide/silktide-consent-manager.css"]'
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/silktide/silktide-consent-manager.css";
        document.head.appendChild(link);
        cssLoadedRef.current = true;
      } else {
        cssLoadedRef.current = true;
      }
    }
  }, []);

  const initializeBanner = () => {
    if (
      initializedRef.current ||
      typeof window === "undefined" ||
      !window.silktideCookieBannerManager
    ) {
      return;
    }

    try {
      window.silktideCookieBannerManager.updateCookieBannerConfig(
        cookieBannerConfig
      );
      initializedRef.current = true;
    } catch (error) {
      console.error("Error initializing cookie banner:", error);
    }
  };

  useEffect(() => {
    // Try to initialize if script is already loaded
    if (window.silktideCookieBannerManager) {
      initializeBanner();
    }

    // Also listen for when the script loads
    const checkInterval = setInterval(() => {
      if (window.silktideCookieBannerManager && !initializedRef.current) {
        initializeBanner();
        clearInterval(checkInterval);
      }
    }, 100);

    // Cleanup interval after 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Load the JavaScript */}
      <Script
        src="/silktide/silktide-consent-manager.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Small delay to ensure script is fully initialized
          setTimeout(() => {
            initializeBanner();
          }, 100);
        }}
      />
    </>
  );
}
