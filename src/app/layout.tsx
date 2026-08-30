import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";
import { LanguageProvider } from "@/context/LanguageContext";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AgriVani",
  description: "AgriVani Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${assistant.variable} h-full antialiased`}>
      <body className={`${assistant.className} min-h-full flex flex-col font-sans bg-[#FDFFF1]`}>
        <LanguageProvider>
          {children}
          <BottomNavigation />
        </LanguageProvider>
      </body>
    </html>
  );
}
