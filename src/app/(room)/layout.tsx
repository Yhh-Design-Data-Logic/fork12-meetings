import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";

import Providers from "../providerst";
import { roboto } from "../_fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Meeting Room",
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
