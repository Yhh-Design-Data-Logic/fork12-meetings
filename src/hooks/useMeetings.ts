import { useQuery } from "@tanstack/react-query";

import meetingsApi from "@/api/meetings";
import { UserSessionNotFoundError } from "@/lib/error";
import { getUserSessionFromStorage } from "@/lib/auth";
import { sortByDate } from "@/lib/array";
import { UserType } from "@/types";

export const useMeetings = () => {
  const userSession = getUserSessionFromStorage();

  if (!userSession) throw new UserSessionNotFoundError();

  return useQuery({
    queryKey: ["meetings"],
    queryFn: meetingsApi.getAll,
    select: (data) => {
      return data
        .filter((m) => Boolean(m.timeslot))
        .sort((a, b) =>
          sortByDate(a.timeslot.start_date, b.timeslot.start_date)
        )
        .map((meeting) => ({
          id: meeting.id,
          name:
            userSession.type === UserType.PARENT
              ? meeting.teacher.name
              : meeting.parent.name,
          startDate: meeting.timeslot.start_date,
          endDate: meeting.timeslot.end_date,
        }));
    },
  });
};
