
import Slider from "@/components/slider/Slider";
import VideoTabs from "@/components/videoLibTabs/VideoTabs";
import { getDictionary } from "./dictionaries";
import Statistics from "@/components/statistics/Statistics";
import NewCourseHome from "@/components/newCoursesHome/NewCourseHome";
import SwiperLib from "@/components/swiperLib/SwiperLib";
import { coursesApi } from "@/utils/coursesApi";
import { bookApi } from "@/utils/bookApi";
import NewBookHome from "@/components/newBookHome/NewBookHome";
import CoursesTitle from "@/components/homeTitles/CoursesTitle";
import VideoTitle from "@/components/homeTitles/VideoTitle";
import BooksTitle from "@/components/homeTitles/BooksTitle";

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
        <CoursesTitle />
        <SwiperLib
          items={coursesApi}
          navigation={true}
          pagination={true}
          slidesPerView={3}
          breakpoints={{
            320: {   // Mobile
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {   // Small screens
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {   // Medium screens (tablets)
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {  // Larger screens (desktops)
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1440: {  // Larger screens (desktops)
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          <NewCourseHome />
        </SwiperLib>
        
        <VideoTitle />
        <VideoTabs />
        <BooksTitle/>
        <SwiperLib
          items={bookApi}
          navigation={true}
          pagination={true}
          slidesPerView={3}
          breakpoints={{
            320: {   // Mobile
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {   // Small screens
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {   // Medium screens (tablets)
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {  // Larger screens (desktops)
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {  // Larger screens (desktops)
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          <NewBookHome />
        </SwiperLib>

       <div className="mt-20">test</div>
      </main>
    </div>
  );
}
