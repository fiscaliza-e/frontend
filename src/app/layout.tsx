"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SessionMonitor } from "@/components/session-monitor";
import { SessionNotification } from "@/components/session-notification";
import { SessionDebug } from "@/components/session-debug";
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
          <SessionMonitor />
          <SessionNotification />
          <SessionDebug />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
          }}>
            <Header />
            <main style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
