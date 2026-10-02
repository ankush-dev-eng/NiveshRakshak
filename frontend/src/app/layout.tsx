import type { Metadata } from "next";
import { Anton, Onest } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const onest = Onest({ subsets: ["latin"], variable: "--font-onest" });

export const metadata: Metadata = {
  title: "NiveshRakshak | AI Shield Against Financial Scams",
  description: "Analyze suspicious investment messages, offers and financial content before you act.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${anton.variable} ${onest.variable}`}>
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col antialiased selection:bg-accent/20">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
