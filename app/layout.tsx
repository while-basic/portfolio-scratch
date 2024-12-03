// app/layout.tsx
// Server component
import "./globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import { RootLayoutClient } from "@/components/root-layout";

export const metadata: Metadata = {
  title: "Christopher Celaya | Software Developer & Mechatronic Technician",
  description: "Results-driven Software Developer and Mechatronic Technician with expertise in full-stack development, industrial automation, and project management.",
  keywords: ["Christopher Celaya", "Software Developer", "Mechatronic Technician", "Full-Stack Developer", "Industrial Automation", "React", "Node.js", "El Paso", "Texas"],
  authors: [{ name: "Christopher Celaya" }],
  creator: "Christopher Celaya",
  publisher: "Christopher Celaya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chriscelaya.com",
    title: "Christopher Celaya | Software Developer & Mechatronic Technician",
    description: "Results-driven Software Developer and Mechatronic Technician with expertise in full-stack development, industrial automation, and project management.",
    siteName: "Christopher Celaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Celaya | Software Developer & Mechatronic Technician",
    description: "Results-driven Software Developer and Mechatronic Technician with expertise in full-stack development, industrial automation, and project management.",
    creator: "@christophercelaya",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Analytics />
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
