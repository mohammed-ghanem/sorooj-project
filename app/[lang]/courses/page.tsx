"use client"

import Banners from "@/components/banners/Banners"
import CoursesCard from "@/components/coursesCard/CoursesCard"
import test from '@/assets/images/test.png'
import defImage from "@/assets/images/default.webp"; // Default image
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
          <Banners src={defImage} textPath="الدورات المجانية"/>
        </div>
        <div className="coursesContainer container mx-auto my-20 grid grid-cols-4 gap-10 w-[80%]">
          <div className="">
            <CategoriesBox />
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-4">
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
  )
}

export default page