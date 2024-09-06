import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import Providers from "../providerst";
import { roboto } from "../_fonts";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techer Parent Conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-roboto bg-background text-body`}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
