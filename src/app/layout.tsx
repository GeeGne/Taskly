import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="app-layout">
          {children}
        </main>
      </body>
    </html>
  );
}
