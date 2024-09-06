import dayjs from "dayjs";

export const formatDate = (date: string | Date, format: string) => {
  return dayjs(date).format(format);
};

export const isSameDay = (date: string | Date, baseDate?: string | Date) => {
  return dayjs(baseDate).isSame(date, "day");
};
