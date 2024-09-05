import { readItems, readMe, withToken } from "@directus/sdk";

import { apiClient } from "../client/browser";

async function getAll() {
  const data = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      readItems("meetings", {
        fields: [
          "id",
          {
            parent: ["id", "name"],
            teacher: ["id", "name"],
            timeslot: ["id", "start_date", "end_date"],
          },
        ],
      })
    )
  );

  return data;
}

const meetingsApi = { getAll };
export default meetingsApi;
