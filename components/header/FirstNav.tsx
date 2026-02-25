// components/FirstNav.tsx

import { getTimeDate } from "@/utils/DateApi";
import SocialMedia from "../socialMedia/SocialMedia";

export const revalidate = 0; // منع كاش Next.js

const FirstNav = async () => {
  const data = await getTimeDate();

  const now = new Date();

  const arabicMonths: { [key: string]: string } = {
    January: "يناير",
    February: "فبراير",
    March: "مارس",
    April: "أبريل",
    May: "مايو",
    June: "يونيو",
    July: "يوليو",
    August: "أغسطس",
    September: "سبتمبر",
    October: "أكتوبر",
    November: "نوفمبر",
    December: "ديسمبر",
  };

  const currentMonthEn = now.toLocaleString("en-US", { month: "long" });

  const fallbackGregorianDate = `${now.getDate()} ${
    arabicMonths[currentMonthEn]
  } ${now.getFullYear()} مـ`;

  // لو الـ API فشلت
  if (!data?.data?.hijri) {
    return (
      <div className="bkColor py-1">
        <div className="container mx-auto grid md:grid-cols-2 gap-2 sm:grid-cols-1">
          <div className="text-center text-sm primaryColor">
            <span>{fallbackGregorianDate}</span>
          </div>
          <div className="text-center">
            <SocialMedia />
          </div>
        </div>
      </div>
    );
  }

  const { hijri, gregorian } = data.data;

  const formattedHijriDate = `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;

  const formattedGregorianDate = gregorian
    ? `${gregorian.day} ${
        arabicMonths[gregorian.month.en] ?? ""
      } ${gregorian.year} مـ`
    : fallbackGregorianDate;

  return (
    <div className="bkColor py-1">
      <div className="container mx-auto grid md:grid-cols-2 gap-2 sm:grid-cols-1">
        <div className="text-center text-sm primaryColor">
          <span>{formattedHijriDate}</span>
          <span> الموافق </span>
          <span>{formattedGregorianDate}</span>
        </div>
        <div className="text-center">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default FirstNav;




// // components/FirstNav.tsx


// import { getTimeDate } from "@/utils/DateApi";
// import SocialMedia from "../socialMedia/SocialMedia";

// const FirstNav = async () => {
//     const data = await getTimeDate();
 
//     // Check if data is null or undefined
//     if (!data || !data.data) {
//         return (
//             <div className="py-3">
//                 <div className="container mx-auto justify-center row grid md:grid-cols-2 gap-2 sm:grid-cols-1">
//                     <div className="text-center">
//                         <span>Error fetching date information</span>
//                     </div>
//                     <div className="text-center">
//                         <SocialMedia />
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const { hijri, gregorian } = data.data;

//     // Format Gregorian month to Arabic equivalent
//     const arabicMonths: { [key: string]: string } = {
//         January: 'يناير',
//         February: 'فبراير',
//         March: 'مارس',
//         April: 'أبريل',
//         May: 'مايو',
//         June: 'يونيو',
//         July: 'يوليو',
//         August: 'أغسطس',
//         September: 'سبتمبر',
//         October: 'أكتوبر',
//         November: 'نوفمبر',
//         December: 'ديسمبر',
//     };

//     // Use fallback for Gregorian data if it's not present
//     const fallbackGregorian = gregorian || { day: 'N/A', month: { en: 'N/A' }, year: 'N/A' };

//     // Format the dates as desired
//     const formattedHijriDate = `${hijri.day} ${hijri.month.ar} ${hijri.year}هـ`;
//     const formattedGregorianDate = `${fallbackGregorian.day} ${arabicMonths[fallbackGregorian.month.en]} ${fallbackGregorian.year} مـ`;

//     return (
//         <div className="bkColor py-1">
//             <div className="container mx-auto justify-center row items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1">
//                 <div className="text-center  text-sm primaryColor">
//                     <span>{formattedHijriDate}</span>
//                     <span> الموافق </span>
//                     <span>{formattedGregorianDate}</span>
//                 </div>
//                 <div className="text-center">
//                     <SocialMedia />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FirstNav;