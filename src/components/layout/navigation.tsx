"use client";

import { CalendarIcon, LayoutDashboardIcon } from "lucide-react";

import { getUserTypeFromCookie } from "@/lib/auth";
import { UserType } from "@/types";

import { parentPages, teacherPages } from "./constants";
import { LogoutBtn, NavItem } from "./elements";

const iconsMapper = {
  dashboard: <LayoutDashboardIcon />,
  calendar: <CalendarIcon />,
};

type NavigationProps = {
  className?: string;
  onNavItemClick?: () => void;
};
export const Navigation = ({ className, onNavItemClick }: NavigationProps) => {
  const userType = getUserTypeFromCookie();

  const pages = userType === UserType.PARENT ? parentPages : teacherPages;

  return (
    <div className={className}>
      <nav>
        <ul className="space-y-4 xl:space-y-6">
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

      <LogoutBtn />
    </div>
  );
};
