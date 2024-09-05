import { readItems, withToken } from "@directus/sdk";

import { apiClient } from "../client/browser";

const getAvailable = async (byTeacherId?: string) => {
  const data = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      readItems("timeslots", {
        fields: ["id", "start_date", "end_date", "teacher", "meeting"],
        filter: {
          ...(byTeacherId && {
            teacher: {
              _eq: byTeacherId,
            },
          }),

          "count(meeting)": {
            _eq: 0,
          },
        },
      })
    )
  );

  return data;
};

const timeslotsApi = { getAvailable };

export default timeslotsApi;
