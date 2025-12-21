import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OfflineIndicator } from "@/components/offline-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2026",
  description: "Plan and track your goals for 2026",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OfflineIndicator />
        <main className="min-h-screen bg-background text-foreground">
          {children}
        </main>
      </body>
    </html>
  );
}
