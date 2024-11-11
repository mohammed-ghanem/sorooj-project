'use client';

import Image from 'next/image';
import { useState } from 'react';

interface TabProps {
  imgPath: any;
  publishDate: string;
  id: number;
  title: any;
  content: string;
}

interface TabsProps {
  courseVideoTabs: TabProps[];
}

const VideoCourseTabs: React.FC<TabsProps> = ({ courseVideoTabs }) => {
  const [activeTab, setActiveTab] = useState(courseVideoTabs[0].id);

  return (
    <div className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto">
      {/* Tabs on the left for large screens, top for small/medium screens */}
      <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r w-full lg:w-1/3 h-auto lg:h-[400px] overflow-x-scroll lg:overflow-x-auto">
        <div className='bkPrimaryColor p-[12px] w-full hidden lg:block'>
          <h4 className='text-white text-right  '>الفيديوهات</h4>
        </div>
        {courseVideoTabs.map((courseVideoTabs) => (
          <div className='bg-white w-full' key={courseVideoTabs.id}>
            <button
              data-tab-id={courseVideoTabs.id}
              className={` w-48 lg:w-full px-1 md:px-4 py-2 text-left focus:outline-none ${
                activeTab === courseVideoTabs.id ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold' : 'mainColor'
              }`}
              onClick={() => setActiveTab(courseVideoTabs.id)}
            >
              <div className='flex items-center justify-center xl:justify-start'>
                <Image className='w-full lg:w-[150px] xl:w-[90px]'
                  width={90}
                  height={50}
                  src={courseVideoTabs.imgPath}
                  alt={courseVideoTabs.title}
                />
                <div className='text-start mr-4 hidden xl:block'>
                  <p className='text-sm'>{courseVideoTabs.title}</p>
                  <p className='text-sm'>{courseVideoTabs.publishDate}</p>
                </div>
              </div>
            </button>
            <hr className='bg-black'/>
          </div>
        ))}
      </div>

      {/* Content on the right for large screens, full width for small/medium screens */}
      <div className="flex-grow w-full lg:w-auto bg-black">
        {courseVideoTabs.map(
          (courseVideoTabs) =>
            activeTab === courseVideoTabs.id && (
              <div key={courseVideoTabs.id} data-content-id={courseVideoTabs.id}>
                <iframe className='w-full h-80'
                  src={`${courseVideoTabs.content}?enablejsapi=1`}
                  title={courseVideoTabs.title}
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

export default VideoCourseTabs;






