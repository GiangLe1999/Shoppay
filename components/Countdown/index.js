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

  const daysRadius = mapNumber(remainingTime.days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(remainingTime.hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(remainingTime.minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(remainingTime.seconds, 60, 0, 0, 360);

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
      <div className={styled.countdown__wrapper}>
        <div className={styled.countdown__item}>
          <SVGCircle radius={daysRadius} />
          <div className={styled.countdown__circleBeneath}></div>
          {remainingTime.days}
          <span>days</span>
        </div>
        <div className={styled.countdown__item}>
          <div className={styled.countdown__circleBeneath}></div>
          <SVGCircle radius={hoursRadius} />
          {remainingTime.hours}
          <span>hours</span>
        </div>
        <div className={styled.countdown__item}>
          <div className={styled.countdown__circleBeneath}></div>
          <SVGCircle radius={minutesRadius} />
          {remainingTime.minutes}
          <span>minutes</span>
        </div>
        <div className={styled.countdown__item}>
          <div className={styled.countdown__circleBeneath}></div>
          <SVGCircle radius={secondsRadius} />
          {remainingTime.seconds}
          <span>seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

const SVGCircle = ({ radius }) => (
  <svg className={styled.countdown__svg}>
    <path
      fill="none"
      stroke="red"
      stroke-width="4"
      d={describeArc(35, 35, 33, 0, radius)}
    />
  </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}
