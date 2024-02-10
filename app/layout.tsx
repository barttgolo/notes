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
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
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
