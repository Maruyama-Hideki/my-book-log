"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@/mocks/browser").then(({ worker }) => {
        worker.start({
          onUnhandledRequest: "bypass",
        });
      });
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="max-w-screen-xl mx-auto">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
