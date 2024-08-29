"use client";

import { useRouter } from "next/navigation";
import { ClockIcon } from "lucide-react";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

type MeetingCardProps = {
  id: string;
  startDate: Date;
  endDate: Date;
  people?: string[];
};
export const MeetingCard = ({
  id,
  startDate,
  endDate,
  people,
}: MeetingCardProps) => {
  const router = useRouter();

  const isSameDay = dayjs().isSame(dayjs(startDate), "day");

  return (
    <div className="flex divide-x rounded-xl border border-zinc-200 bg-white p-4 md:px-6">
      {/* Date Info */}
      <div
        className={cn(
          "flex flex-col items-center pe-4 font-semibold text-heading md:pe-8",
          isSameDay && "font-bold text-primary"
        )}
      >
        <span className="mb-0.5 md:text-lg">
          {dayjs(startDate).format("ddd")}
        </span>
        <span className="text-center text-lg md:text-xl">
          {dayjs(startDate).format("DD MMM")}
        </span>
      </div>

      <div className="flex grow px-4 md:px-8">
        {/* Time Info */}
        <div className="flex flex-col justify-center md:justify-start">
          <span className="flex flex-wrap items-center">
            <ClockIcon
              className="mr-2 shrink-0"
              size={18}
              fill="#71717a"
              stroke="#fff"
            />
            <span>
              {dayjs(startDate).format("HH:mm")} -{" "}
              {dayjs(endDate).format("HH:mm")}
            </span>
          </span>
        </div>

        {people && (
          <div className="ms-8 hidden flex-col text-body-light md:flex lg:ms-12">
            <span className="mb-1.5">Meeting with {people.join(", ")}</span>

            <div className="flex -space-x-1.5">
              {people.map((person, idx) => (
                <Avatar key={person} className="h-6 w-6">
                  <AvatarFallback
                    className={cn("text-sm", idx % 2 && "bg-slate-300")}
                  >
                    {person[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center px-4 md:px-8">
        <Button
          variant="outline"
          onClick={() => router.push(`/meeting/${id}`)}
          disabled={!isSameDay}
        >
          Join
        </Button>
      </div>
    </div>
  );
};
