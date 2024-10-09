import { formatDate, isSameDay } from "@/lib/date";
import { cn } from "@/lib/utils";

export const DateGroup = ({ date }: { date: Date | string }) => {
  return (
    <span
      className={cn(
        "mb-3 block font-semibold",
        isSameDay(date) && "text-primary"
      )}
    >
      {formatDate(date, "DD MMMM YYYY")}
    </span>
  );
};
