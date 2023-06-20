import dayjs from "dayjs";

const getRemainingSeconds = (nowDayjs, timestampDayjs) => {
  const seconds = addZeros(timestampDayjs.diff(nowDayjs, "seconds") % 60, 2);
  return seconds;
};

const getRemainingMinutes = (nowDayjs, timestampDayjs) => {
  const minutes = addZeros(timestampDayjs.diff(nowDayjs, "minutes") % 60, 2);
  return minutes;
};

const getRemainingHours = (nowDayjs, timestampDayjs) => {
  const hours = addZeros(timestampDayjs.diff(nowDayjs, "hours") % 24, 2);
  return hours;
};

const getRemainingDays = (nowDayjs, timestampDayjs) => {
  const days = addZeros(timestampDayjs.diff(nowDayjs, "days"));
  return days;
};

export const calculateDiff = (timeInMs) => {
  const timestampDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();

  if (timestampDayjs.isBefore(nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }

  return {
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    hours: getRemainingHours(nowDayjs, timestampDayjs),
    days: getRemainingDays(nowDayjs, timestampDayjs),
  };
};

const addZeros = (number, length) => {
  const numberString = number.toString();
  if (numberString.length >= length) return numberString;
  return "0".repeat(length - numberString.length) + numberString;
};
