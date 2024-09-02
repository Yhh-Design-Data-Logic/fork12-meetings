"use client";

import { useRouter } from "next/navigation";
import { ClockIcon } from "lucide-react";

import { formatDate, isSameDay } from "@/lib/date";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

type MeetingCardProps = {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
};
export const MeetingCard = ({
  id,
  startDate,
  endDate,
  name,
}: MeetingCardProps) => {
  const router = useRouter();

  return (
    <div className="flex max-w-2xl divide-x rounded-xl border border-zinc-200 bg-white p-4 md:px-6">
      {/* person Info */}
      <div className="flex items-center space-x-2 pr-4">
        <Avatar className="">
          <AvatarFallback className="">{name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-green-800">
            Teacher
          </span>
          <span className="w-[10ch] overflow-hidden whitespace-nowrap">
            {name.length > 12 ? name.substring(0, 12) + ".." : name}
          </span>
        </div>
      </div>

      {/* Time Info */}
      <div className="flex grow items-center px-4 md:px-8">
        <div className="flex flex-col justify-center md:justify-start">
          <span className="flex flex-wrap items-center">
            <ClockIcon
              className="mr-2 shrink-0"
              size={18}
              fill="#71717a"
              stroke="#fff"
            />
            <span>
              {formatDate(startDate, "HH:mm")} - {formatDate(endDate, "HH:mm")}
            </span>
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center px-4 md:px-8">
        <Button
          variant="outline"
          onClick={() => router.push(`/meeting/${id}`)}
          disabled={!isSameDay(startDate)}
        >
          Join
        </Button>
      </div>
    </div>
  );
};
