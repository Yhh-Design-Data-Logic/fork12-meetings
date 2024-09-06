"use client";

import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

const MeetingRoom = dynamic(
  () => import("../../components/meeting-room").then((mod) => mod.MeetingRoom),
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
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-[var(--header-area-height)] border-b border-zinc-200"></header>

      <main className="flex grow items-center justify-center">
        <MeetingRoom />
      </main>
    </div>
  );
}
