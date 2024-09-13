"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Loader, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate, isTimeBeforeNow, msToTime } from "@/lib/date";
import { Button } from "@/components/ui/button";

import { useSuccessiveMeetings } from "./_hook";

const MeetingRoom = dynamic(
  () => import("./components/meeting-room").then((mod) => mod.MeetingRoom),
  {
    ssr: false,
    loading: () => (
      <div className="">
        <Loader
          size={80}
          className="animate-spin text-primary"
          aria-label="loading"
        />
      </div>
    ),
  }
);

export default function MeetingRoomPage() {
  const { meetingId } = useParams();
  const router = useRouter();

  const [, setForceUpdate] = useState(false);

  // if (typeof meetingId !== "string") {
  //   throw new Error("No :meetingId param found");
  // }

  const { isLoading, data } = useSuccessiveMeetings(meetingId as string);

  const [currentMeeting, setCurrentMeeting] = useState<{
    id: number;
    startDate: Date;
    endDate: Date;
  } | null>(null);
  const [allMeetingsDone, setAllMeetingsDone] = useState(false);

  console.log(meetingId);

  const meetingManager = () => {
    let textInfo = "";

    const meetings = data ?? [];

    let currentMeetingIndex = meetings.findIndex(
      (m) => String(m.id) === meetingId
    );

    // check if there's a meeting before current one
    if (
      currentMeetingIndex !== -1 &&
      meetings.some(
        (m) =>
          new Date(m.startDate).getTime() <
          new Date(meetings[currentMeetingIndex].startDate).getTime()
      )
    ) {
      currentMeetingIndex = meetings.findIndex(
        (m) =>
          new Date(m.startDate).getTime() <
          new Date(meetings[currentMeetingIndex].startDate).getTime()
      );

      // if (meetings[currentMeetingIndex].id.toString() !== `${meetingId}`) {
      //   console.log("HEYYYY Ypdate");
      //   // update url with correct meeting id
      //   router.push(`/meeting-room/${meetings[currentMeetingIndex].id}`);
      // }
    }

    // handle if current meeting has pased
    if (
      currentMeetingIndex !== -1 &&
      new Date(meetings[currentMeetingIndex].endDate).getTime() < Date.now()
    ) {
      // find next meeting
      currentMeetingIndex = meetings.findIndex(
        (m) => new Date(m.endDate).getTime() > Date.now()
      );

      // if all meeting have passed
      if (currentMeetingIndex === -1 && !allMeetingsDone) {
        setAllMeetingsDone(true);
      }

      if (
        currentMeetingIndex !== -1 &&
        meetings[currentMeetingIndex].id.toString() !== `${meetingId}`
      ) {
        // update url with correct meeting id
        router.push(`/meeting-room/${meetings[currentMeetingIndex].id}`);
      }
    }

    if (currentMeetingIndex === -1) {
      // if all meeting have passed
      if (data && !allMeetingsDone) {
        setAllMeetingsDone(true);
      }

      return { textInfo };
    }

    const currentMeetingStartDate = new Date(
      meetings[currentMeetingIndex].startDate
    );
    const currentMeetingEndDate = new Date(
      meetings[currentMeetingIndex].endDate
    );

    if (!currentMeeting) {
      console.log("set currentMeeting");
      setCurrentMeeting({
        id: meetings[currentMeetingIndex].id,
        startDate: currentMeetingStartDate,
        endDate: currentMeetingEndDate,
      });
    }

    // if current meeting start time has not come yet
    if (isTimeBeforeNow(currentMeetingStartDate)) {
      const difference = currentMeetingStartDate.getTime() - Date.now();

      // textInfo = `<p>Meeting will start at <time>${formatDate(currentMeetingStartDate, "HH:mm:ss")}</time></p>`;
      textInfo = `<p>Time remaining until the meeting starts: <time>${msToTime(difference)}</time></p>`;
    }

    // if current meeting time has passed
    // and it is not the last meeting
    if (
      currentMeetingIndex < meetings.length &&
      currentMeetingEndDate.getTime() < Date.now() &&
      meetings[currentMeetingIndex].id.toString() !== `${meetingId}`
      //  meetings[currentMeetingIndex].id !== meetings[meetings.length - 1].id
    ) {
      console.log("ehy yfahf ueifauif aif eui");
      textInfo = `<p>Next Meeting will start at <time>${formatDate(currentMeetingEndDate, "HH:mm")}</time></p>`;
      new Promise((r) => setTimeout(r, 500)).then(() => {
        router.push(`/meeting-room/${meetings[currentMeetingIndex + 1].id}`);
      });
    }

    // if current meeting time has started
    if (
      Date.now() > currentMeetingStartDate.getTime() &&
      Date.now() < currentMeetingEndDate.getTime()
    ) {
      textInfo = `<p><time>${msToTime(currentMeetingEndDate.getTime() - Date.now())}</time></p>`;
    }

    if (
      meetings[currentMeetingIndex].id === meetings[meetings.length - 1].id &&
      Date.now() > currentMeetingEndDate.getTime()
    ) {
      if (!allMeetingsDone) setAllMeetingsDone(true);
    }
    return { textInfo };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setForceUpdate((prevState) => !prevState);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [meetingId]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-[var(--header-area-height)] items-center justify-between border-b border-zinc-200 px-6 md:px-12">
        <div
          className="font-medium md:text-lg [&_time]:text-primary"
          dangerouslySetInnerHTML={{ __html: meetingManager().textInfo }}
        />

        <Button variant="destructive" size="lg" asChild>
          <Link href="/">Exit</Link>
        </Button>
      </header>

      <div className="relative flex grow">
        <aside className="absolute bottom-0 left-0 top-0 w-36 overflow-y-auto border-r border-zinc-200 xl:w-40">
          <ul className="space-y-2 py-4">
            {data?.map((m, idx) => (
              <li
                className={cn(
                  "flex flex-col p-2 text-center",
                  m.id === currentMeeting?.id && "bg-primary text-white"
                )}
                key={idx}
              >
                <span className="flex items-center">
                  <VideoIcon
                    size={16}
                    className={cn(
                      "mr-1.5 text-primary",
                      m.id === currentMeeting?.id && "text-secondary"
                    )}
                  />
                  Meeting {idx + 1}
                </span>

                <span className="self-start text-xs">
                  <span
                    className={cn(
                      "text-primary",
                      m.id === currentMeeting?.id && "text-secondary"
                    )}
                  >
                    With
                  </span>{" "}
                  {m.name}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex grow items-center justify-center pl-36 xl:pl-40">
          {isLoading ? (
            <div>
              <Loader
                size={80}
                className="animate-spin text-primary"
                aria-label="loading"
              />
            </div>
          ) : allMeetingsDone ? (
            <p className="text-lg font-semibold uppercase text-primary">
              All meetings have finished
            </p>
          ) : (
            currentMeeting && <MeetingRoom {...currentMeeting} />
          )}
        </main>
      </div>
    </div>
  );
}
