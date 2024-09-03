import { useEffect, useState } from "react";

const today = new Date();

const todayMilli = today.getTime();

const millisecToDay = 24 * 60 * 60 * 1000;

const meetings = [
  {
    id: "1",
    startDate: today,
    endDate: new Date(todayMilli + 30 * 60 * 1000),
    name: "Ali Omar",
  },
  {
    id: "11",
    startDate: new Date(todayMilli + 60 * 60 * 1000),
    endDate: new Date(todayMilli + 90 * 60 * 1000),
    name: "Quasi Nader",
  },
  {
    id: "13",
    startDate: new Date(todayMilli + 100 * 60 * 1000),
    endDate: new Date(todayMilli + 110 * 60 * 1000),
    name: "Alton John",
  },
  {
    id: "2",
    startDate: new Date(todayMilli + millisecToDay),
    endDate: new Date(todayMilli + millisecToDay + 30 * 60 * 1000),
    name: "John Oliviaraf",
  },
  {
    id: "3",
    startDate: new Date(todayMilli + 3 * millisecToDay),
    endDate: new Date(todayMilli + 3 * millisecToDay + 30 * 60 * 1000),
    name: "Husam Mohamed",
  },
  {
    id: "33",
    startDate: new Date(todayMilli + 3 * millisecToDay + 40 * 60 * 1000),
    endDate: new Date(
      todayMilli + 3 * millisecToDay + 30 * 60 * 1000 + 30 * 60 * 1000
    ),
    name: "Husam Mohamed",
  },
];

export const useMeetings = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<typeof meetings | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setData(meetings);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { data, isLoading };
};
