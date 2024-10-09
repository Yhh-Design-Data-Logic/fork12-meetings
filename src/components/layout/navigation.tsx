"use client";

import { withErrorBoundary } from "react-error-boundary";
import { CalendarIcon } from "lucide-react";

import { getUserSessionFromStorage } from "@/lib/auth";
import { UserType } from "@/types";

import { parentPages, teacherPages } from "./constants";
import { LogoutBtn, NavItem } from "./elements";
import { Icons } from "../icons";

const iconsMapper = {
  dashboard: <Icons.CalendarCheck />,
  calendar: <CalendarIcon />,
};

type NavigationProps = {
  className?: string;
  showLogoutBtn?: boolean;
  onNavItemClick?: () => void;
};
export const Navigation = withErrorBoundary(
  ({ className, showLogoutBtn, onNavItemClick }: NavigationProps) => {
    const userSession = getUserSessionFromStorage();

    const pages =
      userSession.type === UserType.PARENT ? parentPages : teacherPages;

    return (
      <div className={className}>
        <nav>
          <p className="mb-3 ps-5 text-sm font-semibold text-neutral-500">
            Main
          </p>
          <ul className="space-y-4">
            {pages.map(({ href, icon, title }) => (
              <NavItem
                key={href}
                href={href}
                text={title}
                icon={iconsMapper[icon]}
                onClick={onNavItemClick}
              />
            ))}
          </ul>
        </nav>

        {showLogoutBtn && <LogoutBtn className="mt-16" />}
      </div>
    );
  },
  { fallback: null }
);
