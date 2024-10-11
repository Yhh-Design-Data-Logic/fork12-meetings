"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { formatDate, isSameDay } from "@/lib/date";
import { UserType } from "@/types";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Icons } from "../icons";

type BaseMeetingCardProps<E extends React.ElementType> = {
  id: string | number;
  startTime: Date | string;
  endTime: Date | string;
  participant: {
    name: string;
    email: string;
  };
  child: string;
  userType: UserType;
  as?: E;
};

type MeetingCardProps<E extends React.ElementType> = BaseMeetingCardProps<E> &
  Omit<React.ComponentProps<E>, keyof BaseMeetingCardProps<E> | "className">;

export const MeetingCard = <E extends React.ElementType = "div">({
  id,
  startTime,
  endTime,
  participant,
  child,
  userType,
  as,
  ...otherProps
}: MeetingCardProps<E>) => {
  const router = useRouter();

  const Tag = as || "div";

  return (
    <Tag
      className="max-w-[756px] space-y-4 rounded-xl border border-neutral-100 bg-white p-4 lg:p-6"
      {...otherProps}
    >
      <div className="md:flex md:items-start md:justify-between">
        <div className="mb-4 md:mb-0">
          <MeetingInfo
            userType={userType}
            name={participant.name}
            startTime={startTime}
            endTime={endTime}
          />

          <UserInfo
            userType={userType}
            name={participant.name}
            email={participant.email}
          />
        </div>

        <div className="flex items-center justify-end space-x-1.5 text-sm font-semibold text-neutral-600">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {participant.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>Child {child}</div>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => router.push(`/meeting-room/${id}`)}
        disabled={!isSameDay(startTime)}
      >
        Join
      </Button>

      {userType === UserType.PARENT && (
        <p className="text-center text-sm text-neutral-600">
          can’t be in time?{" "}
          <Link
            className="font-medium text-secondary underline"
            href="/parent-calendar"
          >
            reschedule it
          </Link>
        </p>
      )}
    </Tag>
  );
};

const MeetingInfo: React.FC<{
  userType: UserType;
  name: string;
  startTime: Date | string;
  endTime: Date | string;
}> = ({ userType, name, startTime, endTime }) => (
  <>
    <h3 className="mb-2 text-base font-semibold text-[#1D1F2C]">
      Meeting with {userType === UserType.PARENT ? "Teacher" : "Parent"}{" "}
      {name.split(" ")[0]}
    </h3>
    <span className="mb-3 flex items-center">
      <Icons.Clock className="mr-1 shrink-0" size={16} color="#292C32" />
      <span className="text-sm font-medium text-neutral-500">
        {formatDate(startTime, "HH:mm")} - {formatDate(endTime, "HH:mm")}
      </span>
    </span>
  </>
);

const UserInfo: React.FC<{
  userType: UserType;
  name: string;
  email: string;
}> = ({ userType, name, email }) => (
  <div className="flex items-center space-x-1.5 pr-4">
    <Avatar className="h-6 w-6">
      <AvatarFallback className="text-xs font-semibold">
        {name[0]}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col text-sm text-neutral-600">
      <span className="font-semibold first-letter:uppercase">
        {userType === UserType.PARENT ? "Teacher" : "Parent"}{" "}
        {name.split(" ")[0]}
      </span>
      <span className="w-[18ch] overflow-hidden whitespace-nowrap font-mono">
        {email}
      </span>
    </div>
  </div>
);

export const MeetingCardSkeleton = () => {
  return (
    <div className="max-w-2xl space-y-4 rounded-xl border border-neutral-100 bg-white p-4 lg:p-6">
      <div className="lg:flex lg:items-start lg:justify-between">
        <div>
          <Skeleton className="mb-2 h-5 w-52 rounded-full" />

          <span className="mb-3 flex items-center">
            <Icons.Clock
              className="mr-2 shrink-0"
              size={18}
              fill="#71717a"
              stroke="#fff"
            />
            <Skeleton className="h-4 w-24" />
          </span>

          <div className="flex items-center">
            <Skeleton className="mr-2 size-6 rounded-full" />

            <div className="flex flex-col">
              <Skeleton className="mb-1 h-3.5 w-10" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Skeleton className="mr-2 size-6 rounded-full" />

          <Skeleton className="h-3.5 w-16" />
        </div>
      </div>

      {/* Button */}
      <Skeleton className="h-10 w-full rounded-xl" />

      {/* CTA */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-52 rounded-xl" />
      </div>
    </div>
  );
};
