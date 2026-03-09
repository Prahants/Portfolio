import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DotGrid from "@/components/ui/DotGrid";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prashant | Full Stack Developer",
  description: "Modern animated developer portfolio showcasing my work and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-slate-50 text-slate-900 dark:bg-[#0c0a1a] dark:text-white min-h-screen relative transition-colors duration-300`}
      >
        <DotGrid />
        <div className="relative z-[2] flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
