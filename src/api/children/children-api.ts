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
            teachers: ["id", { teachers_id: ["id", "name"] }],
          },
        ],
      })
    )
  );

  return data;
}

const childrenApi = { getAll };
export default childrenApi;
