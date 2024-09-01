"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  text: string;
  icon: React.ReactElement;
  onClick?: () => void;
};
export const NavItem = ({ href, text, icon, onClick }: NavItemProps) => {
  const pathname = usePathname();

  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className={cn(
          "inline-flex w-full space-x-2",
          href === pathname && "text-primary [&>svg]:stroke-primary"
        )}
      >
        {icon}

        <span>{text}</span>
      </Link>
    </li>
  );
};
