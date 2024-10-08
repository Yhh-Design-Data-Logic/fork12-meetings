import { Navigation } from "./navigation";
import { ContactUs } from "./elements";

export const Sidebar = () => {
  return (
    <aside className="hidden md:relative md:z-10 md:block md:w-[var(--sidebar-width)] md:shrink-0 md:flex-col md:border-r md:border-zinc-200 md:bg-white md:pt-[var(--header-area-height)]">
      <Navigation className="py-4 pt-8" />

      <ContactUs className="absolute bottom-0 left-0 md:mt-auto" />
    </aside>
  );
};
