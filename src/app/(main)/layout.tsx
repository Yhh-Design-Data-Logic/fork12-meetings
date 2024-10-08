import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type Metadata } from "next";

import { USER_SESSION_COOKIE_KEY } from "@/lib/constants";
import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import Providers from "../providerst";
import { AuthVerification } from "./_auth-verify";
import { poppins } from "../_fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Techer Parent Conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!cookies().get(USER_SESSION_COOKIE_KEY)?.value) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins bg-background text-body antialiased`}
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
