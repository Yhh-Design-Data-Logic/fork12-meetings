export const sortByDate = (
  dateA: Date | string,
  dateB: Date | string,
  order: "asc" | "desc" = "asc"
) => {
  const firstDate = dateA instanceof Date ? dateA : new Date(dateA);
  const secondDate = dateB instanceof Date ? dateB : new Date(dateB);

  if (firstDate < secondDate) return order === "desc" ? 1 : -1;
  if (firstDate > secondDate) return order === "desc" ? -1 : 1;
  return 0;
};
