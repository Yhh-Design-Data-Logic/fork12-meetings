import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import Providers from "../providerst";
import { AuthVerification } from "./_auth-verify";
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
      <body className={`${inter.className} bg-background text-body`}>
        <Toaster />

        <AuthVerification />

        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
