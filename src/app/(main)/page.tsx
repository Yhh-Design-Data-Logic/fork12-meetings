"use client";

import { useMeetings } from "@/hooks";
import { formatDate, isSameDay } from "@/lib/date";
import { cn } from "@/lib/utils";

import { MeetingCard, MeetingCardSkeleton } from "@/components/cards";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isLoading, data } = useMeetings();

  if (isLoading) {
    return (
      <div className="container space-y-8 py-10">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx}>
            <Skeleton className="mb-2 h-5 w-20" />

            <ul className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <MeetingCardSkeleton key={idx} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (data) {
    const meetingsByDay = data.reduce(
      (groups, meeting) => {
        const date = meeting.startDate.split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(meeting);
        return groups;
      },
      {} as Record<string, typeof data>
    );

    return (
      <div className="container space-y-8 py-10">
        {Object.keys(meetingsByDay).map((date) => (
          <div key={date}>
            <span
              className={cn(
                "mb-2 block font-bold",
                isSameDay(date) && "text-primary"
              )}
            >
              {formatDate(date, "ddd, DD MMM")}
            </span>

            <ul className="space-y-3">
              {meetingsByDay[date].map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  id={meeting.id}
                  startDate={meeting.startDate}
                  endDate={meeting.endDate}
                  name={meeting.name}
                  as="li"
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
