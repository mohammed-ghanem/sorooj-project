

import Banners from "@/components/banners/Banners"
import BooksCard from "@/components/booksCard/BooksCard";
import soroojImg from "@/public/assets/images/111.webp"; // Default image
import bookdef from "@/public/assets/images/bookdef.png";
import bookkk from "@/public/assets/images/book.jpg";


const page = () => {
  return (
    <div>
      <div>
        <Banners src={soroojImg} textPath="الكتب والابحاث" />
      </div>
      <div className="bookContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
        <div className="my-5 lg:my-0">
          books categories
        </div>
        <div className="lg:col-span-3">
          <div className="mx-auto w-[95%] md:w-full">
            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <BooksCard
                  imgSrc={bookdef}
                  bookTitle="تساؤلات وشبهات متعلقة فى العقيدة والسنة والفقة والشريعة"
                  watchNumber="120"
                  datePublish="1-12-2024"
                  doctorName="بندر بن محمد الميمونى"
                  descriptionCourse="برنامج محطات فى العقيدة المحور الثانى"
                  //likeBtn = any
                  pathLinkToContent={`/#`}
                />
                <BooksCard
                  imgSrc={bookkk}
                  bookTitle="تساؤلات وشبهات متعلقة فى العقيدة"
                  watchNumber="120"
                  datePublish="1-12-2024"
                  doctorName="بندر بن محمد الميمونى"
                  descriptionCourse="برنامج محطات فى العقيدة المحور الثانى"
                  //likeBtn = any
                  pathLinkToContent={`/#`}
                />
                <BooksCard
                  imgSrc={bookkk}
                  bookTitle="تساؤلات وشبهات متعلقة فى العقيدة"
                  watchNumber="120"
                  datePublish="1-12-2024"
                  doctorName="بندر بن محمد الميمونى"
                  descriptionCourse="برنامج محطات فى العقيدة المحور الثانى"
                  //likeBtn = any
                  pathLinkToContent={`/#`}
                />
                <BooksCard
                  imgSrc={bookdef}
                  bookTitle="تساؤلات وشبهات متعلقة فى العقيدة"
                  watchNumber="120"
                  datePublish="1-12-2024"
                  doctorName="بندر بن محمد الميمونى"
                  descriptionCourse="برنامج محطات فى العقيدة المحور الثانى"
                  //likeBtn = any
                  pathLinkToContent={`/#`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page