"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";

import authApi from "@/api/auth";
import { useUserInfo } from "@/hooks";
import { getUserSessionFromStorage } from "@/lib/auth";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { pageNames } from "./constants";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Icons } from "../icons";

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
    <li
      className={cn(
        "relative flex before:absolute before:left-0 before:top-1/2 before:h-3/4 before:w-[3px] before:-translate-y-1/2 before:rounded-br-full before:rounded-tr-full hover:before:bg-primary",
        href === pathname && "before:bg-primary"
      )}
      onClick={onClick}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex w-full space-x-4 py-2 pe-3 ps-5 font-semibold lg:py-2.5",
          href === pathname && "text-primary [&>svg]:stroke-primary"
        )}
      >
        {icon}

        <span>{text}</span>
      </Link>
    </li>
  );
};

export const ProfileDropdown = () => {
  const { isLoading, data } = useUserInfo();

  const userSession = getUserSessionFromStorage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex h-auto flex-col items-end pl-0 pr-8 hover:bg-inherit"
        >
          <span className="text-sm font-semibold">
            {isLoading ? (
              <Skeleton className="mb-1 h-3 w-32" />
            ) : data?.email ? (
              data.email.length > 20 ? (
                data.email.substring(0, 20) + "..."
              ) : (
                data.email
              )
            ) : (
              "-"
            )}
          </span>

          <span className="text-xs text-body-light first-letter:uppercase">
            {isLoading ? <Skeleton className="h-2.5 w-24" /> : userSession.type}
          </span>

          <Icons.DropDown className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>{data?.name ?? "..."}</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutBtn className="h-auto w-full justify-start p-0 py-1 text-sm text-inherit hover:bg-inherit [&>svg]:size-[18px]" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

export const LogoutBtn = ({ className }: { className?: string }) => {
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      location.href = "/login";
    },
  });

  return (
    <Button
      className={cn("text-body-light", className)}
      variant="ghost"
      loading={logoutMutation.isPending}
      onClick={() => logoutMutation.mutate()}
    >
      <LogOutIcon className="mr-2 text-red-500" />
      Logout
    </Button>
  );
};

export const ContactUs = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "mx-3.5 mb-8 flex flex-col items-center rounded-xl bg-[#FAFAFB] p-5 text-center",
        className
      )}
    >
      <Image
        src="/assets/images/contact-us.svg"
        alt=""
        width={94}
        height={69}
      />
      <p className="font-semibold text-[#1C1D21]">Do you need our help?</p>
      <p className="mb-6 text-sm text-[#8181A5]">Send your request via email</p>

      <Button>
        <Icons.MailFast className="mr-3" />
        Contact Us
      </Button>
    </div>
  );
};
