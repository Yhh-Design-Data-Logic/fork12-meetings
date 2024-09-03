import { ClockIcon, Trash2Icon } from "lucide-react";

import { formatDate } from "@/lib/date";

import { Button } from "@/components/ui/button";

type AvailableInterviewSlotProps = {
  from: Date;
  to: Date;
  onDelete: () => void;
};
export const AvailableInterviewSlot = ({
  from,
  to,
  onDelete,
}: AvailableInterviewSlotProps) => {
  return (
    <div className="flex justify-between divide-x rounded-xl border border-zinc-200 bg-white p-3 md:p-4">
      <p className="flex flex-col pr-4">
        <time
          className="block font-bold"
          dateTime={formatDate(from, "YYYY-MM-DD")}
        >
          {formatDate(from, "ddd, DD MMM")}
        </time>

        <span className="flex flex-wrap items-center">
          <ClockIcon
            className="mr-2 shrink-0"
            size={18}
            fill="#71717a"
            stroke="#fff"
          />
          <span>
            {formatDate(from, "HH:mm")} - {formatDate(to, "HH:mm")}
          </span>
        </span>
      </p>

      <div className="flex items-center pl-2">
        <Button
          className="h-9 w-9 rounded-full"
          variant="ghost"
          size="icon"
          aria-label="delete"
          onClick={onDelete}
        >
          <Trash2Icon size={18} className="text-red-500" />
        </Button>
      </div>
    </div>
  );
};
