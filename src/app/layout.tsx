import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { MessageProvider } from '@/contexts/message/context';
import { cn } from "@/utils/common";

const openSans = Open_Sans({
  weight: ["400", "500", "600", "700", "800", "300"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Convertim",
  description: "Convertim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <MessageProvider>
      <body
        className={cn(openSans.className, "antialiased")}
      >
        {children}
      </body>
      </MessageProvider>
    </html>
  );
}
