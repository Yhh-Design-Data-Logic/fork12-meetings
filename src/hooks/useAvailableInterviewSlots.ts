import { useEffect, useState } from "react";

const today = new Date();

const todayMilli = today.getTime();

const millisecToDay = 24 * 60 * 60 * 1000;

const slots = [
  {
    id: 1,
    from: today,
    to: new Date(todayMilli + 30 * 60 * 1000),
  },
  {
    id: "11",
    from: new Date(todayMilli + 60 * 60 * 1000),
    to: new Date(todayMilli + 90 * 60 * 1000),
  },
  {
    id: "13",
    from: new Date(todayMilli + 100 * 60 * 1000),
    to: new Date(todayMilli + 110 * 60 * 1000),
  },
  {
    id: "2",
    from: new Date(todayMilli + millisecToDay),
    to: new Date(todayMilli + millisecToDay + 30 * 60 * 1000),
  },
  {
    id: "3",
    from: new Date(todayMilli + 3 * millisecToDay),
    to: new Date(todayMilli + 3 * millisecToDay + 30 * 60 * 1000),
  },
  {
    id: "33",
    from: new Date(todayMilli + 3 * millisecToDay + 40 * 60 * 1000),
    to: new Date(
      todayMilli + 3 * millisecToDay + 30 * 60 * 1000 + 30 * 60 * 1000
    ),
  },
];

export const useAvailableInterviewSlots = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<typeof slots | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setData(slots);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { data, isLoading };
};
