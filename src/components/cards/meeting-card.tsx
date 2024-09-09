"use client";

import { useRouter } from "next/navigation";
import { ClockIcon } from "lucide-react";

import { formatDate, isSameDay } from "@/lib/date";
import { UserType } from "@/types";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

type BaseMeetingCardProps<E extends React.ElementType> = {
  id: string | number;
  startDate: Date | string;
  endDate: Date | string;
  name: string;
  userType: UserType;
  as?: E;
};

type MeetingCardProps<E extends React.ElementType> = BaseMeetingCardProps<E> &
  Omit<React.ComponentProps<E>, keyof BaseMeetingCardProps<E> | "className">;

export const MeetingCard = <E extends React.ElementType = "div">({
  id,
  startDate,
  endDate,
  name,
  userType,
  as,
  ...otherProps
}: MeetingCardProps<E>) => {
  const router = useRouter();

  const Tag = as || "div";

  return (
    <Tag
      className="flex max-w-2xl flex-col space-y-3 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:space-y-0 sm:divide-x sm:px-6"
      {...otherProps}
    >
      <div className="flex items-center justify-between sm:block">
        {/* person Info */}
        <div className="flex items-center space-x-2 pr-4">
          <Avatar className="">
            <AvatarFallback className="">{name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-[9px] font-medium uppercase tracking-widest text-green-800">
              {userType === UserType.TEACHER ? "Parent" : "Teacher"}
            </span>
            <span className="w-[10ch] overflow-hidden whitespace-nowrap font-mono">
              {name.length > 12 ? name.substring(0, 12) + ".." : name}
            </span>
          </div>
        </div>

        <div className="sm:hidden">
          <Button
            variant="outline"
            onClick={() => router.push(`/meeting-room/${id}`)}
            disabled={!isSameDay(startDate)}
          >
            Join
          </Button>
        </div>
      </div>

      {/* Time Info */}
      <div className="flex grow items-center sm:px-8">
        <div className="flex flex-col justify-center sm:justify-start">
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
      <div className="hidden sm:block sm:px-8">
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
    <div className="flex max-w-2xl flex-col space-y-3 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:divide-x sm:px-6">
      <div className="flex items-center justify-between sm:block">
        {/* person Info */}
        <div className="flex items-center space-x-2 pr-4">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="flex flex-col">
            <Skeleton className="mb-1 h-2 w-10" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="sm:hidden">
          <Skeleton className="h-10 w-16 rounded-xl" />
        </div>
      </div>

      {/* Time Info */}
      <div className="flex grow items-center sm:px-8">
        <div className="flex flex-col justify-center sm:justify-start">
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
      <div className="hidden items-center sm:flex sm:px-8">
        <Skeleton className="h-10 w-16 rounded-xl" />
      </div>
    </div>
  );
};
