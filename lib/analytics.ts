// Simple wrapper for Google Analytics
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        page_path?: string;
        [key: string]: unknown;
      }
    ) => void;
  }
} 