'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchVideosHome, VideoItem } from '@/utils/fetchVideosHome'; // Adjust the path to your API file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import noQues from "@/public/assets/images/noques.svg"

const VideoLibTabs = () => {
  const [homeVideoTabs, setHomeVideoTabs] = useState<VideoItem[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadAllVideos = async () => {
      try {
        const data = await fetchVideosHome();
        setHomeVideoTabs(data);

        // Set the first tab as active by default
        if (data.length > 0) {
          setActiveTab(data[0].id);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    loadAllVideos();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (homeVideoTabs.length === 0) {
    return <div className="text-center font-cairo mainColor text-lg">
      <Image className='w-full' src={noQues} width={100} height={100} alt='no question' />
      <p className='font-bold mt-5'>لا توجد فيديوهات الان الان !!</p>
    </div>;
  }

  return (
    <div
      className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto"
      style={{ direction: 'rtl' }}
    >
      <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r w-full lg:w-1/3 overflow-x-scroll lg:overflow-x-auto">
        <div className="bkPrimaryColor p-[12px] w-full hidden lg:block">
          <h4 className="text-white text-right">الفيديوهات</h4>
        </div>
        {homeVideoTabs.map((tab) => (
          <div className="bg-white w-full" key={tab.id}>
            <button
              data-tab-id={tab.id}
              className={`w-48 lg:w-full px-1 md:px-4 py-2 text-left focus:outline-none ${activeTab === tab.id
                ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold'
                : 'mainColor'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center justify-center xl:justify-start">
                <Image
                  className="w-full lg:w-[150px] xl:w-[100px]"
                  width={90}
                  height={50}
                  src={`https://img.youtube.com/vi/${tab.youtube_link}/mqdefault.jpg`}
                  alt={tab.name}
                />
                <div className="text-start mr-4 hidden xl:block">
                  <p className="text-sm">{tab.name}</p>
                  <p className="text-sm">{tab.publish_date}</p>
                </div>
              </div>
            </button>
            <hr className="bg-black" />
          </div>
        ))}
      </div>
      <div className="flex-grow w-full lg:w-auto bg-black">
        {homeVideoTabs.map(
          (tab: any) =>
            activeTab === tab.id && (
              <div key={tab.id} data-content-id={tab.id}>
                <iframe
                  className="w-[95%] h-80 mx-auto"
                  src={`https://www.youtube.com/embed/${tab.youtube_link}`}
                  title={tab.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                  allowFullScreen
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default VideoLibTabs;






// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';

// interface TabProps {
//   imgPath: any;
//   publishDate: string;
//   id: number;
//   title: any;
//   content: string;
// }

// interface TabsProps {
//   homeTabs: TabProps[];
// }

// const VideoLibTabs: React.FC<TabsProps> = ({ homeTabs }) => {
//   const [activeTab, setActiveTab] = useState(homeTabs[0].id);

//   return (
//     <div className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto"
//       style={{ "direction": "rtl" }}
//     >
//       {/* Tabs on the left for large screens, top for small/medium screens */}
//       <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r w-full lg:w-1/3 overflow-x-scroll lg:overflow-x-auto">
//         <div className='bkPrimaryColor p-[12px] w-full hidden lg:block'>
//           <h4 className='text-white text-right  '>الفيديوهات</h4>
//         </div>
//         {homeTabs.map((homeTabs) => (
//           <div className='bg-white w-full' key={homeTabs.id}>
//             <button
//               data-tab-id={homeTabs.id}
//               className={` w-48 lg:w-full px-1 md:px-4 py-2 text-left focus:outline-none ${activeTab === homeTabs.id ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold' : 'mainColor'
//                 }`}
//               onClick={() => setActiveTab(homeTabs.id)}
//             >
//               <div className='flex items-center justify-center xl:justify-start'>
//                 <Image className='w-full lg:w-[150px] xl:w-[90px]'
//                   width={90}
//                   height={50}
//                   src={homeTabs.imgPath} 
//                   alt={homeTabs.title}
//                 />
//                 <div className='text-start mr-4 hidden xl:block'>
//                   <p className='text-sm'>{homeTabs.title}</p>
//                   <p className='text-sm'>{homeTabs.publishDate}</p>
//                 </div>
//               </div>
//             </button>
//             <hr className='bg-black' />
//           </div>
//         ))}
//       </div>

//       {/* Content on the right for large screens, full width for small/medium screens */}
//       <div className="flex-grow w-full lg:w-auto bg-black">
//         {homeTabs.map(
//           (homeTabs) =>
//             activeTab === homeTabs.id && (
//               <div key={homeTabs.id} data-content-id={homeTabs.id}>
//                 <iframe className='w-full h-80'
//                   src={`${homeTabs.content}?enablejsapi=1`}
//                   title={homeTabs.title}
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

// export default VideoLibTabs;