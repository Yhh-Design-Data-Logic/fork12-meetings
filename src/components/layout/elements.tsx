"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { pageNames } from "./constants";

export const NavItem = ({
  href,
  text,
  icon,
  onClick,
}: {
  href: string;
  text: string;
  icon: React.ReactElement;
  onClick?: () => void;
}) => {
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
