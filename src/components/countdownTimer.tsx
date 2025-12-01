"use client";
import { useEffect, useState } from "react";

export const CountdownTimer = ({
  targetDate,
  endedText = "Ended",
}: {
  targetDate: number;
  endedText?: string;
}) => {
  const [timeLeft, setTimeLeft] = useState(() => targetDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;
      setTimeLeft(distance);
      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft < 0)
    return <span className="font-bold text-red-600">{endedText}</span>;

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="inline-block rounded border border-red-100 bg-red-50 px-2 py-1 font-mono font-medium text-red-600">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
};
