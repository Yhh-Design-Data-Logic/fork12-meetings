import { useQuery } from "@tanstack/react-query";

import timeslotsApi from "@/api/timeslots";

export const useAvailableMeetingSlots = () => {
  return useQuery({
    queryKey: ["available-timeslots"],
    queryFn: () => timeslotsApi.getAvailable(),
    select: (data) =>
      data.map((timeslot) => ({
        id: timeslot.id,
        from: timeslot.start_date,
        to: timeslot.end_date,
      })),
  });
};

export const useAvailableMeetingSlotsForTeacher = (teacherId: string) => {
  return useQuery({
    queryKey: ["teacher-available-timeslots", teacherId],
    queryFn: () => timeslotsApi.getAvailable(teacherId),
    select: (data) => {
      return data
        .filter((d) => new Date(d.start_date) > new Date())
        .reduce(
          (groups, timeslot) => {
            const date = timeslot.start_date.split("T")[0];
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push({
              id: timeslot.id,
              from: timeslot.start_date,
              to: timeslot.end_date,
            });
            return groups;
          },
          {} as Record<string, { id: number; from: string; to: string }[]>
        );
    },
  });
};
