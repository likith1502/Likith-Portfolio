import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Devanagari, Noto_Sans_Telugu } from "next/font/google";

const deva = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["300", "400"], variable: "--font-deva" });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: ["300", "400"], variable: "--font-telugu" });
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Talla Likith — AI/ML & Full-Stack Engineer",
  description: "Portfolio of Talla Likith, AI/ML developer and full-stack engineer from Hyderabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${deva.variable} ${telugu.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
