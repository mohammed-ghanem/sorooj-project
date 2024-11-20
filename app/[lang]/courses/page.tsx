"use client"

import Banners from "@/components/banners/Banners"
import CoursesCard from "@/components/coursesCard/CoursesCard"
import test from '@/assets/images/test.jpg'
import soroojImg from "@/assets/images/111.webp"; // Default image
import CategoriesBox from "@/components/categoryBox/CategoriesBox";
import LangUseParams from "@/components/translate/LangUseParams"



const page = () => {
  // lang param (ar Or en)
  const lang = LangUseParams()
  // test id remove it when i get real data response
  const coursesId: number = 1
  return (
    <div>
      <div>
        <div>
          <Banners src={soroojImg} textPath="الدورات المجانية" />
        </div>
        <div className="coursesContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
          <div className="my-5 lg:my-0">
            <CategoriesBox />
          </div>
          <div className=" lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                likeBtn={"like"}
                pathLinkToContent={`/${lang}/courses/${coursesId}`}
              />
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                likeBtn={"like"}
                pathLinkToContent={`/${lang}/courses/${coursesId}`}
              />
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                likeBtn={"like"}
                pathLinkToContent={`/${lang}/courses/${coursesId}`}
              />
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                likeBtn={"like"}
                pathLinkToContent={`/${lang}/courses/${coursesId}`}
              />
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                likeBtn={"like"}
                pathLinkToContent={`/${lang}/courses/${coursesId}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page