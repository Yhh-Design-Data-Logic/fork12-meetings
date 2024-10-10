import { readItems, withToken } from "@directus/sdk";

import { apiClient } from "../client/browser";

async function getAll() {
  const data = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      readItems("children", {
        fields: [
          "id",
          "name",
          {
            parent: ["id", "name"],
            teachers: [
              "id",
              {
                teachers_id: [
                  "id",
                  "name",
                  "subject",
                  { timeslots: ["id", "start_date", "end_date", "meeting"] },
                ],
              },
            ],
            class: ["id", "name"],
          },
        ],
      })
    )
  );

  return data.map((d) => ({
    ...d,
    teachers: d.teachers?.map((tc) => ({
      ...tc,
      teachers_id: {
        ...tc.teachers_id,
        timeslots: tc.teachers_id.timeslots?.filter(
          (ts) => ts.meeting.length === 0
        ),
      },
    })),
  }));
}

const childrenApi = { getAll };
export default childrenApi;
