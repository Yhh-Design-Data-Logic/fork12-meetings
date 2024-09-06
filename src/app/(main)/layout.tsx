import { type Metadata } from "next";

import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import Providers from "../providerst";
import { AuthVerification } from "./_auth-verify";
import { roboto } from "../_fonts";
import "../globals.css";

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

        <AuthVerification />

        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
