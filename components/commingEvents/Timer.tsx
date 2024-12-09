'use client'
import { useState, useEffect } from "react";
import "./style.css";

interface TimerProps {
  targetDate: string; // ISO date string for target date
}

const Timer: React.FC<TimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Convert the UTC target date to local time
      const targetTime = new Date(targetDate);
      const localTargetTime = new Date(targetTime.getTime() - targetTime.getTimezoneOffset() * 60000); // Convert UTC to local time

      const difference = localTargetTime.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div>
      <div className="mt-4 counterTime font-cairo text-white">
        <span>ثانية : <span>{timeLeft.seconds}</span></span>
        <span>دقيقة : <span>{timeLeft.minutes}</span></span>
        <span>ساعة : <span>{timeLeft.hours}</span></span>
        <span>يوم : <span>{timeLeft.days}</span></span>
      </div>
    </div>
  );
};

export default Timer;


// 'use client'
// import { useState, useEffect } from "react";
// import "./style.css";

// interface TimerProps {
//   targetDate: string; // ISO date string for target date
// }

// const Timer: React.FC<TimerProps> = ({ targetDate }) => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const difference = new Date(targetDate).getTime() - new Date().getTime();

//       if (difference > 0) {
//         return {
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         };
//       } else {
//         return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//       }
//     };

//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div>

//       <div className=" mt-4 counterTime font-cairo text-white">
//         <span> ثانية : <span> {timeLeft.seconds} </span></span>
//         <span> دقيقة : <span> {timeLeft.minutes} </span></span>
//         <span> ساعة  : <span> {timeLeft.hours} </span></span>
//         <span> يوم  : <span> {timeLeft.days} </span></span>
//       </div>
//     </div>
//   );
// };

// export default Timer;
