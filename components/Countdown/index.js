import { calculateDiff } from "@/utils/time";
import { useEffect, useState } from "react";
import styled from "./styles.module.scss";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Countdown = ({ date }) => {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calculateDiff(timeInMs));
  };

  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styled.countdown}>
      <span>{remainingTime.days.split("")[0]}</span>
      <span>{remainingTime.days.split("")[1]}</span>
      <span>days</span>
      <b> : </b>
      <span>{remainingTime.hours.split("")[0]}</span>
      <span>{remainingTime.hours.split("")[1]}</span>
      <b> : </b>
      <span>{remainingTime.minutes.split("")[0]}</span>
      <span>{remainingTime.minutes.split("")[1]}</span>
      <b> : </b>
      <span>{remainingTime.seconds.split("")[0]}</span>
      <span>{remainingTime.seconds.split("")[1]}</span>
    </div>
  );
};

export default Countdown;
