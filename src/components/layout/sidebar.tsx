import Link from "next/link";
import Image from "next/image";

import { Navigation } from "./navigation";

export const Sidebar = () => {
  return (
    <aside className="hidden md:z-10 md:block md:w-[var(--sidebar-width)] md:shrink-0 md:border-r md:border-zinc-200 md:bg-white">
      <div className="flex h-[var(--header-area-height)] items-center justify-center border-b border-zinc-200 p-4">
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

      <Navigation userType="" className="p-4 pt-8 xl:px-8" />
    </aside>
  );
};
