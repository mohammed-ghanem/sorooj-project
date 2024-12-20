"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faStar, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import CourseBtnComment from "../courseBtnComment/CourseBtnComment";
import parse from "html-react-parser"; 

const CourseDescriptionTabs = ({ courseDetails }: any) => {
  // Ensure course_content is a string or provide a fallback
  const courseContent =
    typeof courseDetails?.course_content === "string"
      ? courseDetails.course_content
      : "<p>لا يوجد وصف للدورة</p>"; 

  return (
    <Tabs>
      <TabList className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-10 mb-8 rounded-[6px] overflow-hidden text-center [box-shadow:1px_1px_10px_#ddd]">
        <Tab>وصف الدورة</Tab>
        <Tab>الملفات المرفقة</Tab>
        <Tab>التعليقات</Tab>
      </TabList>

      <TabPanel className="courseDes">
        <div>{parse(courseContent)}</div>
      </TabPanel>

      <TabPanel className="pdfFiles">
        {courseDetails.attachments && courseDetails.attachments.length > 0 ? (
          <ul>
            {courseDetails.attachments.map((file: any) => (
              <li
                key={file.id}
                className="p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px] bkBox"
              >
                <FontAwesomeIcon className="primaryColor ml-1" icon={faFilePdf} />
                <a href={file.url} className="mainColor">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">لا توجد ملفات مرفقة</p>
        )}
      </TabPanel>

      <TabPanel className="allComments">
        {courseDetails.comments && courseDetails.comments.length > 0 ? (
          courseDetails.comments.map((comment: any) => (
            <div
              key={comment.id}
              className="userComment flex items-center p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px]"
            >
              <span>
                <FontAwesomeIcon
                  className="text-3xl primaryColor mx-4"
                  icon={faUserGraduate}
                />
              </span>
              <div className="w-full">
                <div className="flex justify-between">
                  <h4 className="mainColor font-bold">{comment.name}</h4>
                  <p className="text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        className={i < comment.stars ? "" : "opacity-30"}
                        icon={faStar}
                      />
                    ))}
                  </p>
                </div>
                <p className="comment text-gray-600 mt-2">{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div>لا توجد تعليقات</div>
        )}

        {/* btn add comment */}
        <div>
          <CourseBtnComment courseDetails={courseDetails} />
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default CourseDescriptionTabs;







// "use client"
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import './style.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFilePdf, faStar, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
// import CourseBtnComment from '../courseBtnComment/CourseBtnComment';
// import parse from 'html-react-parser';

// const CourseDescriptionTabs = ({ courseDetails }: any) => (

//   <Tabs>

//     <TabList className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-10 mb-8 rounded-[6px] overflow-hidden text-center [box-shadow:1px_1px_10px_#ddd]">
//       <Tab>وصف الدورة</Tab>
//       <Tab>الملفات المرفقة</Tab>
//       <Tab>التعليقات</Tab>
//     </TabList>

//     <TabPanel className="courseDes">
//       <div>
//         {parse(courseDetails.course_content)}
//       </div>
//     </TabPanel>
//     <TabPanel className="pdfFiles">
//       <ul>
//         {courseDetails.attachments.map((file: any) =>
//           <li key={file.id} className='p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px] bkBox'>
//             <FontAwesomeIcon className='primaryColor ml-1' icon={faFilePdf} />
//             <a href={file.url} className="mainColor">{file.name}</a>
//           </li>
//         )}
//       </ul>
//     </TabPanel>
//     <TabPanel className="allComments">

//       {courseDetails.comments && courseDetails.comments.length > 0 ? (
//         courseDetails.comments.map((comment: any) => (
//           <div
//             key={comment.id}
//             className="userComment flex items-center p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px]"
//           >
//             <span>
//               <FontAwesomeIcon className="text-3xl primaryColor mx-4" icon={faUserGraduate} />
//             </span>
//             <div className="w-full">
//               <div className="flex justify-between">
//                 <h4 className="mainColor font-bold">{comment.name}</h4>
//                 <p className="text-yellow-400">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <FontAwesomeIcon
//                       key={i}
//                       className={i < comment.rating ? "" : "opacity-50"}
//                       icon={faStar}
//                     />
//                   ))}
//                 </p>
//               </div>
//               <p className="comment text-gray-600 mt-2">{comment.text}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>لا توجد تعليقات</div>
//       )}


//       {/* btn add comment */}
//       <div>
//         <CourseBtnComment />
//       </div>
//     </TabPanel>
//   </Tabs>
// );

// export default CourseDescriptionTabs






{/* <div className="mainColor">
        <p>تقدم هذه الدورة المميزة، التي يُشرف عليها فضيلة الشيخ الدكتور محمد بن هشام طاهري، فرصة فريدة لاستكشاف عميق لمفهوم الإيمان بالله وأهميته في حياة المسلم.</p>
        <h2 className='mainColor font-bold my-2'>اهداف الدورة :</h2>
        <div>
          <p>تعزيز الإيمان: تسعى الدورة إلى تقوية الإيمان بالله من خلال فهم أركانه وأثره في السلوك اليومي.</p>
          <p className='my-1'>فهم العقيدة: تقديم محطات رئيسية في العقيدة الإسلامية، وتفسير معانيها وكيفية تطبيقها في الحياة.</p>
          <p>تطوير الوعي الروحي: مساعدة المشاركين على بناء علاقة أعمق مع الله من خلال التأمل والتفكر في آيات القرآن والسنة.</p>
        </div>
        <h3 className='mainColor font-bold my-2'>محاور الدورة :</h3>
        <div>
          <ul className='mr-1'>
            1- مفهوم الايمان بالله
            <li className='mr-3 mt-2'>* تعريف الإيمان وأركانه. </li>
            <li className='mr-3'>* الفرق بين الإيمان والإسلام.</li>
          </ul>
        </div>
        <div>
          <ul className='mr-1 mt-3'>
            2- محطات فى العقيدة
            <li className='mr-3 mt-2'>* استعراض لاهم القضايا العقائدية. </li>
            <li className='mr-3'>* كيفية مواجهة الشكوك والتحديات الإيمانية..</li>
          </ul>
        </div>
        <div>
          <ul className='mr-1 mt-3'>
            3- أثر الإيمان في الحياة اليومية:
            <li className='mr-3 mt-2'>* كيف يُغير الإيمان من سلوك الفرد. </li>
            <li className='mr-3'>* قصص من حياة السلف الصالح في تجسيد الإيمان..</li>
          </ul>
        </div>
        <div>
          <ul className='mr-1 mt-3'>
            4- الأساليب العملية لتعزيز الإيمان:
            <li className='mr-3 mt-2'>* نصائح عملية للمحافظة على الإيمان في زمن الفتن.. </li>
            <li className='mr-3'>* أهمية الدعاء والذكر في تقوية الإيمان.  .</li>
          </ul>
        </div>
        <h3 className='mainColor font-bold my-2'> المستهدفون :</h3>
        <p>
          تستهدف هذه الدورة المسلمين من جميع الأعمار، سواءً كانوا مبتدئين أو لديهم دراية سابقة بالعقيدة الإسلامية.
          الختام
          انضموا إلينا في هذه الرحلة الروحية المميزة مع فضيلة الشيخ الدكتور محمد بن هشام طاهري، واكتشفوا نعمة الإيمان بالله وكيف يمكن أن يكون دليلكم في حياتكم اليومية.
        </p>
      </div> */}




// <li className='p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px] bkBox'>
//     <FontAwesomeIcon className='primaryColor ml-1' icon={faFilePdf} />
//     <a href="#" className="mainColor">كتاب البراهين العقلية</a>
//   </li>
//   <li className='p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px] bkBox '>
//     <FontAwesomeIcon className='primaryColor ml-1' icon={faFilePdf} />
//     <a href="#" className="mainColor">كتاب البراهين العقلية</a>
//   </li>
//   <li className='p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px] bkBox'>
//     <FontAwesomeIcon className='primaryColor ml-1' icon={faFilePdf} />
//     <a href="#" className="mainColor">كتاب البراهين العقلية</a>
//   </li>





// {courseDetails.comments.map((comment: any) =>
//   <div key={comment.id} className='userComment flex items-center p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px]'>
//     <span><FontAwesomeIcon className='text-3xl primaryColor mx-4' icon={faUserGraduate} /></span>
//     <div className='w-full'>
//       <div className='flex justify-between'>
//         <h4 className='mainColor font-bold'>بلال محمد</h4>
//         <p className='text-yellow-400'>
//           <FontAwesomeIcon icon={faStar} />
//           <FontAwesomeIcon icon={faStar} />
//           <FontAwesomeIcon icon={faStar} />
//           <FontAwesomeIcon className=' opacity-50' icon={faStar} />
//           <FontAwesomeIcon className=' opacity-50' icon={faStar} />
//         </p>
//       </div>
//       <p className='comment text-gray-600 mt-2'>
//         كانت الدورة مذهلة! لقد ساعدتني على فهم عميق لمعنى الإيمان وكيف يؤثر على حياتنا اليومية. شكرًا لفضيلة الشيخ محمد بن هشام طاهري!
//       </p>
//     </div>
//   </div>
// )}