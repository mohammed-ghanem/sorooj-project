// components/FirstNav.tsx
import { getTimeDate } from "@/app/utils/DateApi";
import SocialMedia from "../socialMedia/SocialMedia";

const FirstNav = async () => {
    const data = await getTimeDate();

    // Check if data is null or undefined
    if (!data || !data.data) {
        return (
            <div className="py-3">
                <div className="container mx-auto justify-center row grid md:grid-cols-2 gap-2 sm:grid-cols-1">
                    <div className="text-center">
                        <span>Error fetching date information</span>
                    </div>
                    <div className="text-center">
                        <SocialMedia />
                    </div>
                </div>
            </div>
        );
    }

    const { hijri, gregorian } = data.data;

    // Format Gregorian month to Arabic equivalent
    const arabicMonths: { [key: string]: string } = {
        January: 'يناير',
        February: 'فبراير',
        March: 'مارس',
        April: 'أبريل',
        May: 'مايو',
        June: 'يونيو',
        July: 'يوليو',
        August: 'أغسطس',
        September: 'سبتمبر',
        October: 'أكتوبر',
        November: 'نوفمبر',
        December: 'ديسمبر',
    };

    // Use fallback for Gregorian data if it's not present
    const fallbackGregorian = gregorian || { day: 'N/A', month: { en: 'N/A' }, year: 'N/A' };

    // Format the dates as desired
    const formattedHijriDate = `${hijri.day} ${hijri.month.ar} ${hijri.year}هـ`;
    const formattedGregorianDate = `${fallbackGregorian.day} ${arabicMonths[fallbackGregorian.month.en]} ${fallbackGregorian.year} مـ`;

    return (
        <div className="bkMainColor py-3">
            <div className="container mx-auto justify-center row items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1">
                <div className="text-center  text-sm text-white">
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