'use client';
import { useEffect, useState, useCallback } from 'react';

const Countdown = () => {
  const targetDate = new Date('2024-12-09T03:30:00.000Z').getTime(); // UTC time
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime() - (2 * 60 * 60 * 1000); // Adjust for +2 hours
    const difference = targetDate - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [calculateTimeLeft]);

  return (
    <div className="countdown">
      <div>
        <span>{timeLeft.days}</span> days
      </div>
      <div>
        <span>{timeLeft.hours}</span> hours
      </div>
      <div>
        <span>{timeLeft.minutes}</span> minutes
      </div>
      <div>
        <span>{timeLeft.seconds}</span> seconds
      </div>
    </div>
  );
};

export default Countdown;
