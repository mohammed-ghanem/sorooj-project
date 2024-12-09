'use client'
import { useState, useEffect } from "react";
import "./style.css";

interface TimerProps {
  targetDate: string; // ISO date string for target date in UTC
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
      const targetDateUTC = new Date(targetDate); // Parse as UTC
      const currentTimeUTC = new Date(); // Local time automatically converted
      
      const difference = targetDateUTC.getTime() - currentTimeUTC.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div>
      <div className="mt-4 counterTime font-cairo text-white">
        <span> ثانية : <span>{timeLeft.seconds}</span></span>
        <span> دقيقة : <span>{timeLeft.minutes}</span></span>
        <span> ساعة : <span>{timeLeft.hours}</span></span>
        <span> يوم : <span>{timeLeft.days}</span></span>
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
//       console.log(targetDate)
//       console.log(new Date())
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
