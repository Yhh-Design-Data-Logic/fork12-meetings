import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "./mobile-menu";
import { ProfileDropdown } from "./elements";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] h-[var(--header-area-height)] border-b border-zinc-200 bg-white md:absolute md:z-20 md:flex md:items-center md:justify-between md:p-5">
      {/* Logo */}
      <div className="flex h-full items-center justify-center p-3">
        <Link href="/">
          <Image
            src="https://cdn.fork12.com/website/logo.svg"
            className="h-auto w-24"
            alt="fork-12"
            width={128}
            height={34}
          />
        </Link>
      </div>

      <div className="hidden md:block">
        <ProfileDropdown />
      </div>

      <div className="md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
};
