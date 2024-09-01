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

export const ProfileInfo = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => (
  <div className="flex items-center space-x-2 before:mx-3 before:h-10 before:w-px before:bg-zinc-200">
    <Avatar className="h-11 w-11">
      <AvatarFallback>H</AvatarFallback>
    </Avatar>

    <div className="flex flex-col">
      <span className="text-sm font-bold">{name}</span>
      <span className="text-xs text-body-light">
        {email.length > 20 ? email.substring(0, 20) + "..." : email}
      </span>
    </div>
  </div>
);

export const PageHeading = () => {
  const pathname = usePathname();

  const pageName = pageNames.find(({ url }) =>
    // check if it's a nested route
    pathname.split("/").length > 2 ? pathname.includes(url) : pathname === url
  )?.name;

  if (!pageName)
    throw new Error(`Page name is found for this page url: ${pathname}.`);

  return <h1 className="text-3xl font-bold text-heading">{pageName}</h1>;
};
