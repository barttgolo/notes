import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes app",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: "@barttgolo" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
