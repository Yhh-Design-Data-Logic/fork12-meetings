"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs, { type ManipulateType } from "dayjs";

import { formatDate, isSameDay } from "@/lib/date";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type CalendarStripProps = {
  startDate?: Date;
  endDate?: Date;
  defaultSelectedDate?: Date;
  className?: string;
  onSelect?: (date: Date) => void;
};
export const CalendarStrip = (props: CalendarStripProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    props.defaultSelectedDate
  );

  const startDate = useMemo(
    () => props.startDate ?? new Date(),
    [props.startDate]
  );
  const endDate = useMemo(() => {
    const endDate = props.endDate ?? new Date(startDate);
    if (!props.endDate) endDate.setDate(startDate.getDate() + 20);

    return endDate;
  }, [startDate, props.endDate]);

  const dates = useMemo(
    () => dayjsRange(startDate, endDate),
    [startDate, endDate]
  );

  ////////////////////
  const [widths, setWidths] = useState<{
    container: number;
    child: number;
  } | null>(null);
  const [numOfChildren, setNumOfChildren] = useState<{
    perRow: number;
    all: number;
  } | null>(null);

  const [currentRow, setCurrentRow] = useState(1);

  const dayPickerWrapperRef = useRef<HTMLDivElement>(null);

  const disableNext = numOfChildren
    ? currentRow * numOfChildren.perRow >= numOfChildren.all
    : false;
  const disablePrevious = currentRow <= 1;

  const next = () => {
    if (!dayPickerWrapperRef.current || !widths || !numOfChildren) return;

    //
    if (numOfChildren.all <= numOfChildren.perRow) return;

    //
    if (currentRow * numOfChildren.perRow >= numOfChildren.all) return;

    dayPickerWrapperRef.current.style.transform = `translateX(-${currentRow * widths.container}px)`;
    setCurrentRow((prevState) => prevState + 1);
  };

  const previous = () => {
    if (!dayPickerWrapperRef.current || !widths || !numOfChildren) return;

    if (currentRow <= 1) return;

    dayPickerWrapperRef.current.style.transform = `translateX(-${(currentRow - 2) * widths.container}px)`;
    setCurrentRow((prevState) => prevState - 1);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    props.onSelect && props.onSelect(date);
  };

  useLayoutEffect(() => {
    if (!dayPickerWrapperRef.current) return;

    const handleResize = () => {
      if (!dayPickerWrapperRef.current) return;

      // reset
      dayPickerWrapperRef.current.style.transform = "translateX(0px)";

      const containerWidth =
        dayPickerWrapperRef.current.getBoundingClientRect().width;

      const numberOfChildrenPerRow = window.innerWidth > 1024 ? 5 : 3;
      const childWidth = containerWidth / numberOfChildrenPerRow;

      const children =
        dayPickerWrapperRef.current.querySelectorAll<HTMLElement>(
          ".calendar-strip-daypicker"
        );

      children.forEach((item) => {
        item.style.width = `${childWidth - 8}px`;
        item.style.marginLeft = `0px`;
        item.style.marginRight = `0px`;
        item.style.opacity = "100";
      });

      setWidths({ container: containerWidth, child: childWidth });
      setNumOfChildren({
        perRow: numberOfChildrenPerRow,
        all: children.length,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={props.className}>
      {/* header - month/year + navigation */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-base font-semibold text-neutral-600">
          {formatDate(
            dates[!numOfChildren ? 0 : (currentRow - 1) * numOfChildren.perRow],
            "MMMM YYYY"
          )}
        </div>

        <div className="flex gap-2.5">
          <Button
            className="h-7 w-7 border-none"
            variant="ghost"
            size="icon"
            onClick={previous}
            disabled={disablePrevious}
          >
            <ChevronLeft size={18} />
          </Button>

          <Button
            className="h-7 w-7 border-none"
            variant="ghost"
            size="icon"
            onClick={next}
            disabled={disableNext}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* dates picker */}
      <div className="block overflow-x-hidden">
        <div
          ref={dayPickerWrapperRef}
          className="flex w-auto gap-2 overflow-x-visible transition-transform duration-300 ease-in-out"
        >
          {dates.map((day) => (
            <DayPicker
              key={day.toISOString()}
              className="opacity-0"
              day={day}
              selected={selectedDate ? isSameDay(day, selectedDate) : false}
              onClick={() => handleDateSelect(day)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

type DayPickerProps = {
  day: Date;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};
const DayPicker = ({
  day,
  selected,
  disabled,
  className,
  onClick,
  ...props
}: DayPickerProps) => (
  <Button
    variant="custom"
    className={cn(
      "calendar-strip-daypicker flex h-full shrink-0 flex-col items-center justify-center border border-neutral-100 bg-white p-2 focus-within:bg-primary-200 hover:bg-primary-200 disabled:bg-secondary-100 disabled:text-neutral-600 disabled:opacity-100",
      selected && "border-primary bg-primary-200",
      className
    )}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    <span
      className={cn("block text-xs font-semibold", disabled && "opacity-60")}
    >
      {formatDate(day, "ddd")}
    </span>
    <span
      className={cn("block text-base font-medium", disabled && "opacity-60")}
    >
      {formatDate(day, "DD")}
    </span>
  </Button>
);

// type DayPickerWrapperProps = {
//   children: ({ style }: { style?: React.CSSProperties }) => React.ReactNode;
// };
// type DayPickerWrapperHandle = {
//   disableNext: boolean;
//   disablePrevious: boolean;
//   next: () => void;
//   previous: () => void;
// };
// const DayPickerWrapper = React.forwardRef<
//   DayPickerWrapperHandle,
//   DayPickerWrapperProps
// >((props, customRef) => {
//   const [widths, setWidths] = useState<{
//     container: number;
//     child: number;
//   } | null>(null);
//   const [numOfChildren, setNumOfChildren] = useState<{
//     perRow: number;
//     all: number;
//   } | null>(null);

//   const [currentRow, setCurrentRow] = useState(1);

//   const ref = useRef<HTMLDivElement>(null);

//   let style = { opacity: 0 };

//   const disableNext = numOfChildren
//     ? currentRow * numOfChildren.perRow >= numOfChildren.all
//     : false;
//   const disablePrevious = currentRow <= 1;

//   console.log(disablePrevious, currentRow);

//   const next = () => {
//     if (!ref.current || !widths || !numOfChildren) return;

//     //
//     if (numOfChildren.all <= numOfChildren.perRow) return;

//     //
//     if (currentRow * numOfChildren.perRow >= numOfChildren.all) return;

//     console.log("hey", ref.current, widths, numOfChildren, currentRow);

//     ref.current.style.transform = `translateX(-${currentRow * widths.container}px)`;
//     setCurrentRow((prevState) => prevState + 1);
//   };

//   const previous = () => {
//     if (!ref.current || !widths || !numOfChildren) return;

//     if (currentRow <= 1) return;

//     console.log("hey", ref.current, widths, numOfChildren, currentRow);

//     ref.current.style.transform = `translateX(-${(currentRow - 2) * widths.container}px)`;
//     setCurrentRow((prevState) => prevState - 1);
//   };

//   useLayoutEffect(() => {
//     if (!ref.current) return;

//     const handleResize = () => {
//       if (!ref.current) return;

//       const containerWidth = ref.current.getBoundingClientRect().width;

//       const numberOfChildrenPerRow = window.innerWidth > 1024 ? 5 : 3;
//       const childWidth = containerWidth / numberOfChildrenPerRow;

//       const children = ref.current.querySelectorAll<HTMLElement>(
//         ".calendar-strip-daypicker"
//       );

//       children.forEach((item) => {
//         item.style.width = `${childWidth - 8}px`;
//         item.style.marginLeft = `4px`;
//         item.style.marginRight = `4px`;
//         item.style.opacity = "100";
//       });

//       setWidths({ container: containerWidth, child: childWidth });
//       setNumOfChildren({
//         perRow: numberOfChildrenPerRow,
//         all: children.length,
//       });
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useImperativeHandle(
//     customRef,
//     () => ({
//       disableNext,
//       disablePrevious,
//       next,
//       previous,
//     }),
//     [widths, numOfChildren, currentRow, disableNext, disablePrevious]
//   );

//   return (
//     <div
//       ref={ref}
//       className="-mx-1 flex w-auto overflow-x-visible transition-transform duration-300 ease-in-out"
//     >
//       {props.children({ style })}
//     </div>
//   );
// });
// DayPickerWrapper.displayName = "DayPickerWrapper";

/**
 * Create a range of Day.js dates between a start and end date.
 *
 * ```js
 * dayjsRange(dayjs('2021-04-03'), dayjs('2021-04-05'), 'day');
 * // => [dayjs('2021-04-03'), dayjs('2021-04-04'), dayjs('2021-04-05')]
 * ```
 */
export function dayjsRange(
  start: Date,
  end: Date,
  unit: ManipulateType = "day"
) {
  const range = [];
  let current = dayjs(start);
  while (!current.isAfter(end)) {
    range.push(current.toDate());
    current = current.add(1, unit);
  }
  return range;
}
