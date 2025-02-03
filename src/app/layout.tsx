import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

// Define the font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "An example e-commerce application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

