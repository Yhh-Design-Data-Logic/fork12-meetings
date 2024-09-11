"use client";

import { useMemo, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";

import { useMeetings } from "@/hooks";
import { formatDate, isSameDay, isSameDayAndAfter } from "@/lib/date";
import { getUserSessionFromStorage } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { ErrorBoundaryPageFallback } from "@/components/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MeetingCard, MeetingCardSkeleton } from "@/components/cards";

function HomePage() {
  const [category, setCategory] = useState<"upcoming" | "past">("upcoming");

  const userSession = getUserSessionFromStorage();

  const { isLoading, data } = useMeetings();

  const meetingsByDay = useMemo(() => {
    return data?.reduce(
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
  }, [data]);

  const meetingsByCategory = useMemo(() => {
    return (
      meetingsByDay &&
      Object.entries(meetingsByDay).reduce(
        (acc, curr) => {
          if (isSameDayAndAfter(curr[0])) {
            acc.upcoming.push({ [curr[0]]: curr[1] });
          } else {
            acc.past.push({ [curr[0]]: curr[1] });
          }

          return acc;
        },
        { upcoming: [], past: [] } as Record<
          "upcoming" | "past",
          NonNullable<typeof meetingsByDay>[]
        >
      )
    );
  }, [meetingsByDay]);

  if (isLoading) {
    return (
      <div className="container space-y-8 py-10">
        <Skeleton className="mb-4 h-10 w-44 rounded-lg md:mb-8 md:h-12 md:w-56" />
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

  if (meetingsByCategory) {
    return (
      <div className="container py-10">
        <Tabs
          value={category}
          onValueChange={(value) => setCategory(value as typeof category)}
        >
          <TabsList className="mb-4 grid w-fit grid-cols-2 bg-zinc-100 shadow-sm md:mb-8 md:h-auto md:p-1.5">
            <TabsTrigger
              className="md:px-4 md:py-2 md:text-base"
              value="upcoming"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger className="md:px-4 md:py-2 md:text-base" value="past">
              Past
            </TabsTrigger>
          </TabsList>
          <TabsContent className="space-y-8" value="upcoming">
            {meetingsByCategory.upcoming.map((item) =>
              Object.keys(item).map((date) => (
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
                    {item[date].map((meeting) => (
                      <MeetingCard
                        key={meeting.id}
                        id={meeting.id}
                        startDate={meeting.startDate}
                        endDate={meeting.endDate}
                        name={meeting.name}
                        userType={userSession.type}
                        as="li"
                      />
                    ))}
                  </ul>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent className="space-y-8" value="past">
            {meetingsByCategory.past.map((item) =>
              Object.keys(item).map((date) => (
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
                    {item[date].map((meeting) => (
                      <MeetingCard
                        key={meeting.id}
                        id={meeting.id}
                        startDate={meeting.startDate}
                        endDate={meeting.endDate}
                        name={meeting.name}
                        userType={userSession.type}
                        as="li"
                      />
                    ))}
                  </ul>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  }
}

export default withErrorBoundary(HomePage, {
  FallbackComponent: ErrorBoundaryPageFallback,
});
