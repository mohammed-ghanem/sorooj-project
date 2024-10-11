//
import Slider from "@/components/slider/Slider";
import ProgressBar from "@/components/progressBar/ProgressBar";
import VideoLibTabs from "@/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/components/videoLibTabs/VideoTabs";
import { getDictionary } from "./dictionaries";
import Statistics from "@/components/statistics/Statistics";
import NewCourseHome from "@/components/newCoursesHome/NewCourseHome";
import SwiperLib from "@/components/swiperLib/SwiperLib";
import { coursesApi } from "@/utils/coursesApi";
import { bookApi } from "@/utils/bookApi";
import NewBookHome from "@/components/newBookHome/NewBookHome";

coursesApi;
bookApi;


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
        <h1 className=" hidden">{dict.pages.homePage.title}</h1>

        <Slider />
        <Statistics />
        <SwiperLib
            items={coursesApi}
            navigation={true}
            pagination={true}
          slidesPerView={4}
          breakpoints={{
            320: {   // Mobile
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {   // Small screens
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {   // Medium screens (tablets)
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {  // Larger screens (desktops)
                slidesPerView: 4,
                spaceBetween: 40,
            },
        }}
        >  
          <NewCourseHome />
        </SwiperLib>
        <VideoTabs />
        <SwiperLib
            items={bookApi}
            navigation={true}
            pagination={false}
          slidesPerView={1}
          breakpoints={{
            320: {   // Mobile
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {   // Small screens
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {   // Medium screens (tablets)
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {  // Larger screens (desktops)
                slidesPerView: 1,
                spaceBetween: 40,
            },
        }}
        >
          <NewBookHome />
        </SwiperLib>
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}
