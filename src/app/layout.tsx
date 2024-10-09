import { type Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";

import Providers from "./providerst";
import { poppins } from "./_fonts";

import "./globals.css";

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
        className={`${poppins.variable} bg-background font-poppins text-body antialiased`}
      >
        <Toaster />
        <Providers>{children}</Providers>{" "}
      </body>
    </html>
  );
}
