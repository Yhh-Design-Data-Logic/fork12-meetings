"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

import { Navigation } from "./navigation";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ToggleButton
        open={open}
        onToggle={() => setOpen((prevOpen) => !prevOpen)}
      />

      <Drawer open={open} onOpenChange={setOpen} direction="left" modal={false}>
        <DrawerContent
          className="inset-x-auto left-0 min-h-full w-4/5 rounded-none border-l-0 border-r border-zinc-200 pt-[var(--header-area-height)]"
          direction="left"
          role="navigation"
        >
          <DrawerClose />
          <Navigation
            className="p-4 px-2"
            onNavItemClick={() => setOpen(false)}
            showLogoutBtn
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

const ToggleButton = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className="absolute left-4 top-1/2 z-50 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full p-2.5 pl-2"
      onClick={onToggle}
      role="button"
    >
      <span className="sr-only">{open ? "open menu" : "close menu"}</span>
      <div className="relative inline-block h-3.5 w-6" aria-hidden="true">
        <div
          className={cn(
            "absolute bottom-0 top-auto h-0.5 w-full rounded bg-black transition-transform [transition-delay:0.13s] [transition-duration:0.23s] [transition-timing-function:cubic-bezier(0.55,0.05,0.67,0.19)] before:absolute before:-top-1.5 before:block before:h-0.5 before:w-full before:rounded before:bg-black before:[transition:top_0.22s_cubic-bezier(0.33,0.66,0.66,1)_0.3s,opacity_0.23s_cubic-bezier(0.55,0.05,0.67,0.19)] after:absolute after:-top-3 after:block after:h-0.5 after:w-full after:rounded after:bg-black after:[transition:top_0.3s_cubic-bezier(0.33,0.66,0.66,1)_0.2s,opacity_0.1s_linear]",
            open &&
              "[transform:translateY(-6px)_rotate(-45deg)] [transition-delay:0.22s] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] before:top-0 before:-rotate-90 before:![transition:top_0.2s_cubic-bezier(0.33,0,0.66,0.33)_0.16s,transform_0.23s_cubic-bezier(0.215,0.61,0.355,1)_0.25s] after:top-0 after:opacity-0 after:[transition:top_0.3s_cubic-bezier(0.33,0.66,0.66,1),opacity_0.2s_linear_0.22s]"
          )}
        />
      </div>
    </div>
  );
};
