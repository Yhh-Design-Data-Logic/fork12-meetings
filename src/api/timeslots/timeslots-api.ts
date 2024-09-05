import {
  createItem,
  createItems,
  deleteItem,
  readItems,
  withToken,
} from "@directus/sdk";

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

const create = async (data: {
  teacherId: number;
  startDate: Date;
  endDate: Date;
}) => {
  console.log({
    teacher: data.teacherId,
    start_date: data.startDate.toISOString(),
    end_date: data.endDate.toISOString(),
  });
  const result = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      createItem("timeslots", {
        teacher: data.teacherId,
        start_date: data.startDate.toISOString(),
        end_date: data.endDate.toISOString(),
      })
    )
  );

  return result;
};

const bulkCreate = async (
  data: {
    teacherId: number;
    startDate: Date;
    endDate: Date;
  }[]
) => {
  const result = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      createItems(
        "timeslots",
        data.map((item) => ({
          teacher: item.teacherId,
          start_date: item.startDate.toISOString(),
          end_date: item.endDate.toISOString(),
        }))
      )
    )
  );

  console.log(result);

  return result;
};

const remove = async (id: string | number) => {
  const result = await apiClient.request(
    withToken((await apiClient.getToken()) ?? "", deleteItem("timeslots", id))
  );

  console.log("resutl", remove);

  return result;
};

const timeslotsApi = { getAvailable, create, bulkCreate, delete: remove };

export default timeslotsApi;
