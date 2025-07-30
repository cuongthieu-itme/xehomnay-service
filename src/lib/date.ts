import dayjs from "dayjs";

export const convertDate = (date: string | Date | number) => {
  return dayjs(date).format("DD/MM/YYYY");
};
