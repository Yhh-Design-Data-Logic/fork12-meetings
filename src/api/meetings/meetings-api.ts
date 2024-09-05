import { createItem, readItems, readMe, withToken } from "@directus/sdk";

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

const create = async (data: {
  parentId: number;
  teacherId: number;
  timeslotId: number;
}) => {
  const result = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      createItem("meetings", {
        teacher: data.teacherId,
        parent: data.parentId,
        timeslot: data.timeslotId,
      })
    )
  );

  return result;
};

const meetingsApi = { getAll, create };
export default meetingsApi;
