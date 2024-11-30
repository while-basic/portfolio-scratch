import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { personSchema, projectsSchema } from './schema';
import { LoadingScreen } from "@/components/loading-screen";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Christopher Celaya | Software Developer & Mechatronic Technician",
  description: "Results-driven Software Developer and Mechatronic Technician with expertise in full-stack development, industrial automation, and project management. Expert in React, Node.js, and industrial systems.",
  keywords: ["Christopher Celaya", "Software Developer", "Mechatronic Technician", "Full-Stack Developer", "Industrial Automation", "React", "Node.js", "El Paso", "Texas", "Industrial Manufacturing", "Project Management", "UTEP", "Electrical Engineering"],
  authors: [{ name: "Christopher Celaya" }],
  creator: "Christopher Celaya",
  publisher: "Christopher Celaya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://chriscelaya.com',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chriscelaya.com",
    title: "Christopher Celaya | Software Developer & Mechatronic Technician",
    description: "Results-driven Software Developer and Mechatronic Technician specializing in full-stack development, industrial automation, and project management.",
    siteName: "Christopher Celaya - Portfolio",
    images: [
      {
        url: 'https://chriscelaya.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Christopher Celaya - Software Developer & Mechatronic Technician',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Celaya | Software Developer & Mechatronic Technician",
    description: "Software Developer and Mechatronic Technician specializing in full-stack development and industrial automation",
    creator: "@chriscelaya",
    images: ['https://chriscelaya.com/images/twitter-image.jpg'],
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [personSchema, projectsSchema]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
            <LoadingScreen />
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
