
import Slider from "@/components/slider/Slider";
import { getDictionary } from "./dictionaries";
import Statistics from "@/components/statistics/Statistics";
import NewCourseHome from "@/components/newCoursesHome/NewCourseHome";
import NewBookHome from "@/components/newBookHome/NewBookHome";
import CoursesTitle from "@/components/homeTitles/CoursesTitle";
// تم إخفاؤها بناءً على طلب العميل مع مسارات video-library / audio-library / blogs / live-air
// import VideoTitle from "@/components/homeTitles/VideoTitle";
import BooksTitle from "@/components/homeTitles/BooksTitle";
import TwitterSection from "@/components/twitterSection/TwitterSection";
// import MoreWatching from "@/components/moreWatching/MoreWatching";
// import MoreWatchTitle from "@/components/homeTitles/MoreWatchTitle";
import AnswerTitle from "@/components/homeTitles/AnswerTitle";
import FatwaForm from "@/components/fatwaForm/FatwaForm";
import CommingEvents from "@/components/commingEvents/CommingEvents";
// import VideoLibTabs from "@/components/videoLibTabs/VideoLibTabs";
export const dynamic = 'force-static';

type Props = {
  params: { lang: string };
};

export default async function Home({ params }: Props) {

  const { lang } = params;

  const dict = await getDictionary(lang);
  
  return (
    <div>
      <main className="w-full">
        <Slider />
        {/* <Statistics /> */}
        {/* تم إخفاء الدورات المتاحة بناءً على طلب العميل  وتحويل مسار اللينك الخاص بها الى الاكاديمية*/}
        {/* <CoursesTitle />
        <NewCourseHome /> */}
        <CommingEvents />
        {/* تم إخفاؤها بناءً على طلب العميل مع مسارات video-library / audio-library / blogs / live-air */}
        {/* <VideoTitle /> */}
        {/* <VideoLibTabs/> */}
        <BooksTitle />
        <NewBookHome />
        {/* <MoreWatchTitle /> */}
        {/* <MoreWatching /> */}
        <AnswerTitle /> 
        <TwitterSection />
        <FatwaForm />
      </main>
    </div>
  );
}
