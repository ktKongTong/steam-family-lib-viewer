import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import QueryProvider from "@/components/providers/QueryClient";
import React from "react";
import { LocaleProvider } from "@/components/providers/i18n";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Steam Receipt",
  description: "Generate a receipt-style summary of your Steam profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <LocaleProvider>
        <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        <Toaster/>
        </body>
        </html>
      </LocaleProvider>
    </QueryProvider>
  );
}
