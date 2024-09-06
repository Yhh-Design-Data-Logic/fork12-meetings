"use client";

import { useRouter } from "next/navigation";
import { ClockIcon } from "lucide-react";

import { formatDate, isSameDay } from "@/lib/date";
import { getUserSessionFromStorage } from "@/lib/auth";
import { UserType } from "@/types";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

type BaseMeetingCardProps<E extends React.ElementType> = {
  id: string | number;
  startDate: Date | string;
  endDate: Date | string;
  name: string;
  as?: E;
};

type MeetingCardProps<E extends React.ElementType> = BaseMeetingCardProps<E> &
  Omit<React.ComponentProps<E>, keyof BaseMeetingCardProps<E> | "className">;

const userSession = getUserSessionFromStorage();

export const MeetingCard = <E extends React.ElementType = "div">({
  id,
  startDate,
  endDate,
  name,
  as,
  ...otherProps
}: MeetingCardProps<E>) => {
  const router = useRouter();

  const Tag = as || "div";

  return (
    <Tag
      className="flex max-w-2xl divide-x rounded-xl border border-zinc-200 bg-white p-4 md:px-6"
      {...otherProps}
    >
      {/* person Info */}
      <div className="flex items-center space-x-2 pr-4">
        <Avatar className="">
          <AvatarFallback className="">{name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-[9px] font-medium uppercase tracking-widest text-green-800">
            {!userSession.type ? (
              <Skeleton className="h-2 w-10" />
            ) : userSession.type === UserType.TEACHER ? (
              "Parent"
            ) : (
              "Teacher"
            )}
          </span>
          <span className="w-[10ch] overflow-hidden whitespace-nowrap font-mono">
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
          onClick={() => router.push(`/meeting-room/${id}`)}
          disabled={!isSameDay(startDate)}
        >
          Join
        </Button>
      </div>
    </Tag>
  );
};

export const MeetingCardSkeleton = () => {
  return (
    <div className="flex max-w-2xl divide-x rounded-xl border border-zinc-200 bg-white p-4 md:px-6">
      {/* person Info */}
      <div className="flex items-center space-x-2 pr-4">
        <Skeleton className="h-10 w-10 rounded-full" />

        <div className="flex flex-col">
          <Skeleton className="mb-1 h-2 w-10" />
          <Skeleton className="h-4 w-20" />
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
            <Skeleton className="h-5 w-24" />
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center px-4 md:px-8">
        <Skeleton className="h-10 w-16 rounded-xl" />
      </div>
    </div>
  );
};
