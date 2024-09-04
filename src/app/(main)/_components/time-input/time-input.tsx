import React, { useEffect, useId, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import "./styles.css";
import { flushSync } from "react-dom";
import { ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TimeInputProps = {
  onChange?: (time: FullTime) => void;
  fullWidth?: boolean;
};

const inputClasses =
  "h-8 w-8 border-0 p-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0";

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  function TimeInput({ onChange, ...props }, ref) {
    const id = useId();

    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("30");
    const [seconds, setSeconds] = useState("00");

    useEffect(() => {
      if (hours.length === 2 && minutes.length === 2 && seconds.length === 2) {
        onChange && onChange(`${hours}:${minutes}:${seconds}` as FullTime);
      }
    }, [hours, minutes, seconds]);

    return (
      <div
        className={cn(
          "flex h-14 w-fit items-center justify-between space-x-3 border-b border-slate-200",
          props.fullWidth && "w-full"
        )}
      >
        <div className="flex items-center">
          <Input
            ref={ref}
            id={`${id}-hours`}
            className={inputClasses}
            placeholder="hh"
            value={hours}
            onBlur={() => setHours(hours.padStart(2, "0"))}
            onChange={(e) => {
              if (e.target.value.length > 2) {
                const sliceIndexes =
                  e.target.selectionStart === 1
                    ? [0, 1]
                    : e.target.selectionStart === 2
                      ? [0, 2]
                      : [2, 4];
                flushSync(() => {
                  setHours(
                    e.target.value.slice(sliceIndexes[0], sliceIndexes[1])
                  );
                });

                if (e.target.selectionStart === 2) {
                  document.getElementById(`${id}-minutes`)?.focus();
                }
              } else if (e.target.value.length < 2) {
                setHours(e.target.value);
              } else if (e.target.value.length === 2) {
                flushSync(() => {
                  setHours(e.target.value);
                });

                document.getElementById(`${id}-minutes`)?.focus();
              }
            }}
            onKeyDown={(event) => {
              if (!/([0-9]|Backspace|Delete)/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          :
          <Input
            id={`${id}-minutes`}
            className={inputClasses}
            placeholder="mm"
            value={minutes}
            onBlur={() => setMinutes(minutes.padStart(2, "0"))}
            onChange={(e) => {
              if (e.target.value.length > 2) {
                const sliceIndexes =
                  e.target.selectionStart === 1
                    ? [0, 1]
                    : e.target.selectionStart === 2
                      ? [0, 2]
                      : [2, 4];
                flushSync(() => {
                  setMinutes(
                    e.target.value.slice(sliceIndexes[0], sliceIndexes[1])
                  );
                });

                if (e.target.selectionStart === 2) {
                  document.getElementById(`${id}-seconds`)?.focus();
                }
              } else if (e.target.value.length < 2) {
                setMinutes(e.target.value);
              } else if (e.target.value.length === 2) {
                flushSync(() => {
                  setMinutes(e.target.value);
                });

                document.getElementById(`${id}-seconds`)?.focus();
              }
            }}
            onKeyDown={(event) => {
              if (!/([0-9]|Backspace|Delete)/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          :
          <Input
            id={`${id}-seconds`}
            className={inputClasses}
            placeholder="ss"
            value={seconds}
            onBlur={() => setSeconds(seconds.padStart(2, "0"))}
            onChange={(e) => {
              if (e.target.value.length > 2) {
                const sliceIndexes =
                  e.target.selectionStart === 1
                    ? [0, 1]
                    : e.target.selectionStart === 2
                      ? [0, 2]
                      : [2, 4];
                flushSync(() => {
                  setSeconds(
                    e.target.value.slice(sliceIndexes[0], sliceIndexes[1])
                  );
                });

                if (e.target.selectionStart === 2) {
                  document.getElementById(`${id}-seconds`)?.blur();
                }
              } else if (e.target.value.length < 2) {
                setSeconds(e.target.value);
              } else if (e.target.value.length === 2) {
                flushSync(() => {
                  setSeconds(e.target.value);
                });

                document.getElementById(`${id}-seconds`)?.blur();
              }
            }}
            onKeyDown={(event) => {
              if (!/([0-9]|Backspace|Delete)/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </div>

        <ClockIcon size={18} />
      </div>
    );
  }
);
