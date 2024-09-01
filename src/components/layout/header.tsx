import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "./mobile-menu";
import { PageHeading, ProfileInfo } from "./elements";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] h-[var(--header-area-height)] border-b border-zinc-200 bg-white md:absolute md:z-0 md:border-none md:bg-background">
      {/* Logo */}
      <div className="flex h-full items-center justify-center border-b border-zinc-200 p-4 md:hidden">
        <Link href="/">
          <Image
            src="https://cdn.fork12.com/website/logo.svg"
            className="h-auto w-32"
            alt="fork-12"
            width={128}
            height={45}
          />
        </Link>
      </div>

      <div className="hidden md:ml-[var(--sidebar-width)] md:flex md:h-full md:items-center md:justify-between md:px-6">
        <PageHeading />

        <ProfileInfo name="Husam Mohammed" email="husam.m.ashour@gmail.com" />
      </div>

      <MobileMenu />
    </header>
  );
};
