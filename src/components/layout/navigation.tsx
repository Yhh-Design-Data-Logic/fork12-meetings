import { CalendarIcon, LayoutDashboardIcon } from "lucide-react";

import { parentPages, teacherPages } from "./constants";
import { NavItem } from "./nav-item";

const iconsMapper = {
  dashboard: <LayoutDashboardIcon />,
  calendar: <CalendarIcon />,
};

type NavigationProps = {
  userType: string;
  className?: string;
  onNavItemClick?: () => void;
};
export const Navigation = ({
  userType,
  className,
  onNavItemClick,
}: NavigationProps) => {
  const pages = userType === "parent" ? parentPages : teacherPages;

  return (
    <nav className={className}>
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
  );
};
