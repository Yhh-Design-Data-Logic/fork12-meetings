"use client";

import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TimePickerProps = {
  defaultTime?: Time;
  onChange?: (time: Time) => void;
};
export const TimePicker = ({ defaultTime, onChange }: TimePickerProps) => {
  const [hours, setHours] = useState(defaultTime?.split(":")?.[0] ?? "hh");
  const [minutes, setMinutes] = useState(defaultTime?.split(":")?.[1] ?? "mm");

  const handleClick = (type: "hours" | "minutes", time: string) => {
    type === "hours" ? setHours(time) : setMinutes(time);

    onChange && onChange(`${hours}:${minutes}` as Time);
  };

  useEffect(() => {
    if (defaultTime && onChange) {
      const [defaultHours, defaultMinutes] = defaultTime?.split(":");
      if (defaultHours.length === 2 && defaultMinutes.length === 2) {
        onChange(`${defaultHours}:${defaultMinutes}` as Time);
      }
    }
  }, [defaultTime]);

  return (
    <Popover modal>
      <PopoverTrigger className="m-0 flex w-full items-center justify-between space-x-8 border-b border-zinc-200 pb-4">
        <span>
          {hours}:{minutes}
        </span>

        <ChevronDownIcon size={16} />
      </PopoverTrigger>

      <PopoverContent className="w-48 px-2">
        <div className="flex divide-x text-center">
          {(
            [
              { title: "Hour", length: 24, type: "hours" },
              { title: "Minute", length: 60, type: "minutes" },
            ] as const
          ).map((item) => (
            <div className="h-48 basis-1/2 overflow-y-auto" key={item.title}>
              <span className="block border-b border-zinc-200 pb-4 text-sm font-semibold">
                {item.title}
              </span>

              <ul className="pt-2">
                {Array.from({ length: item.length }).map((_, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "p-0.5 hover:bg-primary/10",
                      String(idx).padStart(2, "0") ===
                        (item.type === "hours" ? hours : minutes) &&
                        "bg-primary text-white hover:bg-primary"
                    )}
                  >
                    <button
                      className="w-full"
                      onClick={() =>
                        handleClick(item.type, String(idx).padStart(2, "0"))
                      }
                    >
                      {String(idx).padStart(2, "0")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
