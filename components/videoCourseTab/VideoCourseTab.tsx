
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

const VideoCourseTabs = ({ courseVideos, checkSubscriber }: any) => {
  const [activeTab, setActiveTab] = useState(courseVideos[0].id);

  console.log(checkSubscriber)
  const handleTabChange = (videoId: string) => {
    const token = Cookies.get('access_token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'يجب عليك تسجيل الدخول أولاً',
        text: 'قم بتسجيل الدخول لمتابعة مشاهدة الدورة.',
        confirmButtonText: 'تم',
        confirmButtonColor: '#9F854E',
      });
      return;
    }
    if (!checkSubscriber) {
      Swal.fire({
        icon: 'warning',
        title: 'يجب عليك الاشتراك فى الدورة أولاً',
        text: 'قم بالاشتراك مجانا لمشاهدة الدورة.',
        confirmButtonText: 'تم',
        confirmButtonColor: '#9F854E',
      });
      return;
    }
    setActiveTab(videoId);
  };

  const handleVideoClick = () => {
    const token = Cookies.get('access_token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'يجب عليك تسجيل الدخول أولاً',
        text: 'قم بتسجيل الدخول لمتابعة مشاهدة الدورة.',
        confirmButtonText: 'تم',
        confirmButtonColor: '#9F854E',
      });
      return;
    }
    if (!checkSubscriber) {
      Swal.fire({
        icon: 'warning',
        title: 'يجب عليك الاشتراك فى الدورة أولاً',
        text: 'قم بالاشتراك مجانا لمشاهدة الدورة.',
        confirmButtonText: 'تم',
        confirmButtonColor: '#9F854E',
      });
      return;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto">
      {/* Tabs on the left for large screens, top for small/medium screens */}
      <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r bg-white w-full lg:w-1/3 h-auto lg:h-[395px] overflow-x-scroll lg:overflow-x-auto">
        <div className="bkPrimaryColor p-[12px] w-full hidden lg:block">
          <h4 className="text-white text-right">الفيديوهات</h4>
        </div>
        {courseVideos.map((video: any) => (
          <div className="bg-white w-full" key={video.id}>
            <button
              data-tab-id={video.id}
              className={`w-48 lg:w-full px-1 md:px-4 py-2 text-left focus:outline-none ${activeTab === video.id ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold' : 'mainColor'
                }`}
              onClick={() => handleTabChange(video.id)}
            >
              <div className="flex items-center justify-center xl:justify-start">
                <Image
                  className="w-full lg:w-[150px] xl:w-[90px]"
                  width={90}
                  height={50}
                  src={`https://img.youtube.com/vi/${video.video_url}/mqdefault.jpg`}
                  alt={video.name}
                />
                <div className="text-start mr-4 hidden xl:block">
                  <p className="text-xs">{video.name}</p>
                  <p className="text-xs">{video.publish_date}</p>
                </div>
              </div>
            </button>
            <hr className="bg-black" />
          </div>
        ))}
      </div>

      {/* Video Content */}
      <div className="flex-grow w-full lg:w-auto bg-black">
        {courseVideos.map((video: any) =>
          activeTab === video.id ? (
            <div key={video.id} data-content-id={video.id}>
              {Cookies.get('access_token') && checkSubscriber ? (
                // Show the iframe if the user is logged in
                <iframe
                  className="w-full h-80"
                  src={`https://www.youtube.com/embed/${video.video_url}?enablejsapi=1`}
                  title={video.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                  allowFullScreen
                />
              ) : (
                // Show the thumbnail and alert on click if user is not logged in
                <div className="relative cursor-pointer" onClick={handleVideoClick}>
                  <Image
                    className="w-full h-96 object-cover"
                    width={520}
                    height={315}
                    src={`https://img.youtube.com/vi/${video.video_url}/maxresdefault.jpg`}
                    alt={video.name}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
                    ▶ اضغط للمشاهدة
                  </div>
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default VideoCourseTabs;




// 'use client';
// import Image from 'next/image';
// import { useState } from 'react';
// import Swal from "sweetalert2"
// import Cookies from 'js-cookie'; // Import js-cookie library
// const VideoCourseTabs = ({ courseVideos }: any) => {

//   const [activeTab, setActiveTab] = useState(courseVideos[0].id);
//   const handleTabChange = (videoId: string) => {
//     const token = Cookies.get('access_token');
//     if (!token) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'يجب عليك تسجيل الدخول أولاً',
//         text: 'قم بتسجيل الدخول لمتابعة مشاهدة الدورة.',
//         confirmButtonText: ' تم',
//         confirmButtonColor: '#9F854E',
//       });
//       return;
//     }

//     setActiveTab(videoId);
//   }


//   return (
//     <div className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto">
//       {/* Tabs on the left for large screens, top for small/medium screens */}
//       <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r bg-white w-full lg:w-1/3 h-auto lg:h-[395px] overflow-x-scroll lg:overflow-x-auto">
//         <div className='bkPrimaryColor p-[12px] w-full hidden lg:block'>
//           <h4 className='text-white text-right  '>الفيديوهات</h4>
//         </div>
//         {courseVideos.map((courseVideos: any) => (
//           <div className='bg-white w-full' key={courseVideos.id}>
//             <button
//               data-tab-id={courseVideos.id}
//               className={` w-48 lg:w-full px-1 md:px-4 py-2 text-left focus:outline-none ${activeTab === courseVideos.id ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold' : 'mainColor'
//                 }`}
//               onClick={() => handleTabChange(courseVideos.id)}
//             >
//               <div className='flex items-center justify-center xl:justify-start'>
//                 <Image className='w-full lg:w-[150px] xl:w-[90px]'
//                   width={90}
//                   height={50}
//                   src={`https://img.youtube.com/vi/${courseVideos.video_url}/mqdefault.jpg`}
//                   alt={courseVideos.name}
//                 />
//                 <div className='text-start mr-4 hidden xl:block'>
//                   <p className='text-xs'>{courseVideos.name}</p>
//                   <p className='text-xs'>{courseVideos.publish_date}</p>
//                 </div>
//               </div>
//             </button>
//             <hr className='bg-black' />
//           </div>
//         ))}
//       </div>

//       {/* Content on the right for large screens, full width for small/medium screens */}
//       <div className="flex-grow w-full lg:w-auto bg-black">
//         {courseVideos.map(
//           (courseVideos: any) =>
//             activeTab === courseVideos.id && (
//               <div key={courseVideos.id} data-content-id={courseVideos.id}>
//                 <iframe className='w-full h-80'
//                   src={`https://www.youtube.com/embed/${courseVideos.video_url}?enablejsapi=1`}
//                   title={courseVideos.name}
//                   allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
//                   allowFullScreen
//                 />
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCourseTabs;





