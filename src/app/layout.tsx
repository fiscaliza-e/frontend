"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { injectColorsToCss } from "@/lib/inject-colors-to-css";
import { AuthProvider } from "@/hooks/use-auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    injectColorsToCss();
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
