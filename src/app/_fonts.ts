import { Roboto, Roboto_Mono } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const robotoMona = Roboto_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});
