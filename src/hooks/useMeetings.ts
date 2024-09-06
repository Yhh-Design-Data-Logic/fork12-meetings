import { useQuery } from "@tanstack/react-query";

import meetingsApi from "@/api/meetings";
import { getUserSessionFromStorage } from "@/lib/auth";
import { UserType } from "@/types";

export const useMeetings = () => {
  return useQuery({
    queryKey: ["meetings"],
    queryFn: meetingsApi.getAll,
    select: (data) => {
      return data
        .filter((m) => Boolean(m.timeslot))
        .sort((a, b) => {
          const dateA = new Date(a.timeslot.start_date);
          const dateB = new Date(b.timeslot.start_date);

          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        })
        .map((meeting) => ({
          id: meeting.id,
          name:
            getUserSessionFromStorage().type === UserType.PARENT
              ? meeting.teacher.name
              : meeting.parent.name,
          startDate: meeting.timeslot.start_date,
          endDate: meeting.timeslot.end_date,
        }));
    },
  });
};
