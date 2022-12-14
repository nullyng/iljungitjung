import { SchedulerDate, SchedulerDateTime } from "@components/types/types";
import { DateNavigatorProps } from "@devexpress/dx-react-scheduler";

/* type, interface */
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface InfoItemProps {
  item: SchedulerDate;
}

/* variables */
export const days = ["일", "월", "화", "수", "목", "금", "토"];

/* function */
export const getDay = (
  nextDate: SchedulerDateTime | undefined,
  nextOptions: any
) => {
  const date =
    typeof nextDate === "object"
      ? nextDate
      : typeof nextDate === "string"
      ? new Date(nextDate)
      : new Date();
  const { day } = nextOptions;

  let value = "";

  if (day) {
    value = date.getDate().toString();
  } else {
    value = days[date.getDay()];
  }

  return value;
};

export const formatTime = (
  startDate: string | undefined,
  endDate: string | undefined
) => {
  if (typeof startDate === "undefined" || typeof endDate === "undefined")
    return;

  const start = new Date(startDate);
  const end = new Date(endDate);

  let startHour = start.getHours();
  const startMinutes =
    start.getMinutes() < 10
      ? "0" + start.getMinutes().toString()
      : start.getMinutes().toString();

  let endHour = end.getHours();
  const endMinutes =
    end.getMinutes() < 10
      ? "0" + end.getMinutes().toString()
      : end.getMinutes().toString();

  let startTime = startHour < 12 ? "오전 " : "오후 ";
  if (startHour > 12) {
    startHour -= 12;
  }
  startTime += startHour + ":" + startMinutes;

  let endTime = endHour < 12 ? "오전 " : "오후 ";
  if (endHour > 12) {
    endHour -= 12;
  }
  endTime += endHour + ":" + endMinutes;

  return startTime + " - " + endTime;
};

export const getStringFromDate = (time: Date | string | undefined) => {
  if (!time) return "";

  let date = new Date();

  if (typeof time === "string") date = new Date(time);
  else date = time;

  const str =
    date.getFullYear().toString() +
    (date.getMonth() + 1) +
    date.getDate().toString();

  return str;
};

export const makeFormat = (time: string) => {
  if (time.length === 1) return "0" + time;
  return time;
};

export const getFullStringFromDate = (time: Date, endTime: Date) => {
  if (!time) return "";

  const day = time.getDay().toString();
  const year = time.getFullYear().toString();
  const month = makeFormat((time.getMonth() + 1).toString());
  const date = makeFormat(time.getDate().toString());
  const hour = makeFormat(time.getHours().toString());
  const min = makeFormat(time.getMinutes().toString());
  const endHour = makeFormat(endTime.getHours().toString());
  const endMin = makeFormat(endTime.getMinutes().toString());

  return day + year + month + date + hour + min + endHour + endMin;
};

export const getFullDate = (date: SchedulerDateTime | undefined) => {
  switch (typeof date) {
    case "undefined":
      return "-";
    case "string":
      return date;
    case "object":
      return (
        date.getFullYear() +
        "년 " +
        (date.getMonth() + 1) +
        "월 " +
        date.getDate() +
        "일"
      );
  }
};

export const formatReservationDate = (fullDate: Date) => {
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return `${fullDate.getFullYear()}${makeFormat(month.toString())}${makeFormat(
    date.toString()
  )}`;
};

// 이번주 일정 중에서 오늘 날짜보다 큰 것만 표시
export const parseList = (list: SchedulerDate[] | undefined) => {
  if (!list) return [];

  const plus = [0, 6, 5, 4, 3, 2, 1];

  let parsed: SchedulerDate[] = [];
  const today = new Date();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + plus[today.getDay()]
  );
  lastDay.setHours(23);
  lastDay.setMinutes(59);

  for (let item of list) {
    const { startDate } = item;
    if (!startDate) continue;

    const start = new Date(startDate);

    if (start >= today && start <= lastDay) {
      parsed.push(item);
    }
  }

  return parsed;
};
