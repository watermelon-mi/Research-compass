import { Source_Serif_4, Inter } from "next/font/google";
import type { Metadata } from "next";
import { AssessmentProvider } from "@/context/AssessmentProvider";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Research Compass",
  description:
    "Discover how you think before choosing what to research. Assess your research style and evaluate lab compatibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}
