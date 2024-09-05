"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";

import authApi from "@/api/auth";
import { useUserInfo } from "@/hooks";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { pageNames } from "./constants";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

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
    <li className="flex rounded-xl hover:bg-primary/10" onClick={onClick}>
      <Link
        href={href}
        className={cn(
          "inline-flex w-full space-x-2 p-2 lg:p-2.5",
          href === pathname && "text-primary [&>svg]:stroke-primary"
        )}
      >
        {icon}

        <span>{text}</span>
      </Link>
    </li>
  );
};

export const ProfileInfo = () => {
  const { isLoading, data } = useUserInfo();

  const { name, email } = data ?? {};

  return (
    <div className="flex items-center space-x-2 before:mx-3 before:h-10 before:w-px before:bg-zinc-200">
      <Avatar className="h-11 w-11">
        <AvatarFallback>{name?.[0] ?? ""}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="text-sm font-bold">
          {isLoading ? <Skeleton className="h-4 w-24" /> : (name ?? "-")}
        </span>
        <span className="text-xs text-body-light">
          {isLoading ? (
            <Skeleton className="mt-1 h-3 w-32" />
          ) : email ? (
            email.length > 20 ? (
              email.substring(0, 20) + "..."
            ) : (
              email
            )
          ) : (
            "-"
          )}
        </span>
      </div>
    </div>
  );
};

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

export const LogoutBtn = ({
  wrapperClassName,
}: {
  wrapperClassName?: string;
}) => {
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      location.href = "/login";
    },
  });

  return (
    <div
      className={
        wrapperClassName
          ? wrapperClassName
          : "mt-16 md:fixed md:bottom-8 md:left-4 xl:left-8"
      }
    >
      <Button
        className="text-body-light"
        variant="ghost"
        loading={logoutMutation.isPending}
        onClick={() => logoutMutation.mutate()}
      >
        <LogOutIcon className="mr-2 text-red-500" />
        Logout
      </Button>
    </div>
  );
};
