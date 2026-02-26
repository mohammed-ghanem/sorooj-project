'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchVideosHome, VideoItem } from '@/utils/fetchVideosHome'; // Adjust the path to your API file
import noQues from "@/public/assets/images/noques.svg"

const VideoLibTabs = () => {
  const [homeVideoTabs, setHomeVideoTabs] = useState<VideoItem[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
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
      }
    };

    loadAllVideos();
  }, []);

 
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
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="lazy"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default VideoLibTabs;