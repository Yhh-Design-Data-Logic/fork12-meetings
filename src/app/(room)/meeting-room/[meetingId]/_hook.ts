"use client";

import { useMeetings } from "@/hooks";
import { isSameDay } from "@/lib/date";

export const useSuccessiveMeetings = (meetingId: string) => {
  const { isLoading, data } = useMeetings();

  const currentMeeting = data?.find((m) => String(m.id) === meetingId);

  return {
    isLoading,
    data:
      data &&
      currentMeeting &&
      data.filter((m) => isSameDay(m.startDate, currentMeeting.startDate)),
  };
};
