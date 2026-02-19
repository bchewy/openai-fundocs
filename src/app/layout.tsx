import type { Metadata } from "next";
import { Syne, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Fundocs",
    template: "%s | Fundocs",
  },
  description:
    "The OpenAI platform, explained like you're smart but busy. Friendly guides for Core concepts, Agents, and Tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} min-h-full antialiased`}
      >
        <div className="bg-atmo">{children}</div>
      </body>
    </html>
  );
}
