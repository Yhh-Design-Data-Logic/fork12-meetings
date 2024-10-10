import { useQuery } from "@tanstack/react-query";

import childrenApi from "@/api/children";

export const useChildren = () => {
  return useQuery({
    queryKey: ["children"],
    queryFn: childrenApi.getAll,
    select: (data) =>
      data.map((child) => ({
        id: child.id,
        name: child.name,
        grade: child?.class?.name ?? "-",
        teachers: (child.teachers ?? []).map((teacher) => ({
          id: teacher.teachers_id.id,
          name: teacher.teachers_id.name,
          subject: teacher.teachers_id.subject,
          timeslots: (teacher.teachers_id.timeslots ?? []).map((ts) => ({
            id: ts.id,
            from: new Date(ts.start_date),
            to: new Date(ts.end_date),
          })),
        })),
      })),
  });
};
