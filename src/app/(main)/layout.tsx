import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type Metadata } from "next";

import { USER_SESSION_COOKIE_KEY } from "@/lib/constants";
import { Layout } from "@/components/layout";

import { AuthVerification } from "./_auth-verify";

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
    <>
      <AuthVerification />

      <Layout>{children}</Layout>
    </>
  );
}
