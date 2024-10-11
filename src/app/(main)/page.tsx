"use client";

import { useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";

import { useMeetings } from "@/hooks";
import { isSameDayAndAfter } from "@/lib/date";
import { getUserSessionFromStorage } from "@/lib/auth";
import { UserType } from "@/types";

import { ErrorBoundaryPageFallback } from "@/components/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingCard, DateGroup } from "@/components/meeting";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MeetingsPageSkeleton } from "./_components/skeletons";

function HomePageComponent() {
  const [category, setCategory] = useState<"upcoming" | "past">("upcoming");

  const userSession = getUserSessionFromStorage();

  const { status, data } = useMeetings();

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

  return (
    <div className="container pb-10 pt-5">
      <Tabs
        value={category}
        onValueChange={(value) => setCategory(value as typeof category)}
      >
        <div className="mb-5 flex flex-col justify-between gap-5 md:mb-8 lg:flex-row lg:items-center">
          <h1 className="text-2xl font-semibold text-[#171725]">Meetings</h1>

          <div className="flex items-center space-x-6 self-end">
            <TabsList className="grid grid-cols-2 shadow-sm lg:w-80">
              <TabsTrigger className="md:px-4" value="upcoming">
                Upcoming
              </TabsTrigger>
              <TabsTrigger className="md:px-4" value="past">
                Past
              </TabsTrigger>
            </TabsList>

            {userSession.type === UserType.PARENT && (
              <Button className="lg:text-base" asChild>
                <Link href="/parent-calendar">
                  <Icons.CalendarPlus className="mr-2" />
                  Book Meeting
                </Link>
              </Button>
            )}
          </div>
        </div>

        {status === "pending" ? (
          <MeetingsPageSkeleton />
        ) : status === "error" ? (
          <p>An Error Occured.</p>
        ) : meetingsByCategory ? (
          <>
            <TabsContent className="space-y-8" value="upcoming">
              {meetingsByCategory.upcoming.map((item) =>
                Object.keys(item).map((date) => (
                  <div key={date}>
                    <DateGroup date={date} />

                    <ul className="space-y-4">
                      {item[date].map((meeting) => (
                        <MeetingCard
                          key={meeting.id}
                          id={meeting.id}
                          startTime={meeting.startDate}
                          endTime={meeting.endDate}
                          participant={{
                            name: meeting.name,
                            email: meeting.email,
                          }}
                          child={meeting.child}
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
                    <DateGroup date={date} />

                    <ul className="space-y-4">
                      {item[date].map((meeting) => (
                        <MeetingCard
                          key={meeting.id}
                          id={meeting.id}
                          startTime={meeting.startDate}
                          endTime={meeting.endDate}
                          participant={{
                            name: meeting.name,
                            email: meeting.email,
                          }}
                          child={meeting.child}
                          userType={userSession.type}
                          as="li"
                        />
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </TabsContent>
          </>
        ) : null}
      </Tabs>
    </div>
  );
}

export default function HomePage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryPageFallback}>
      <HomePageComponent />
    </ErrorBoundary>
  );
}
