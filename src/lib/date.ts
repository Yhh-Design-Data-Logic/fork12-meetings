import dayjs from "dayjs";

export const formatDate = (date: string | Date, format: string) => {
  return dayjs(date).format(format);
};

export const isSameDay = (date: string | Date, baseDate?: string | Date) => {
  return dayjs(baseDate).isSame(date, "day");
};

export const isSameDayAndAfter = (
  date: string | Date,
  baseDate?: string | Date
) => {
  return (
    dayjs(baseDate).isSame(date, "day") ||
    dayjs(date).isAfter(new Date(), "day")
  );
};

export const isTimeBeforeNow = (date: string | Date) => {
  return dayjs(date).isAfter(new Date(), "second");
};

export const isTimeAfterNow = (date: string | Date) => {
  return dayjs(date).isAfter(new Date(), "second");
};

export const msToTime = (duration: number) => {
  //const milliseconds = Math.floor((duration % 1000) / 100);
  let seconds: string | number = Math.floor((duration / 1000) % 60);
  let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
  let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};
