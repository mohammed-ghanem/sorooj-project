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
  homeTabs: TabProps[];
}

const VideoLibTabs: React.FC<TabsProps> = ({ homeTabs  }) => {
  const [activeTab, setActiveTab] = useState(homeTabs[0].id);

  return (
    <div className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto">
      {/* Tabs on the left for large screens, top for small/medium screens */}
      <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r w-full lg:w-1/3">
        <div className='bkPrimaryColor p-[12px] w-full hidden lg:block'>
          <h4 className='text-white text-right  '>الفيديوهات</h4>
        </div>
        {homeTabs.map((homeTabs) => (
          <div className='bg-white w-full' key={homeTabs.id}>
            <button
              data-tab-id={homeTabs.id}
              className={`w-full px-1 md:px-4 py-2 text-left focus:outline-none ${
                activeTab === homeTabs.id ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold' : 'mainColor'
              }`}
              onClick={() => setActiveTab(homeTabs.id)}
            >
              <div className='flex items-center justify-center xl:justify-start'>
                <Image className='w-full lg:w-[150px] xl:w-[90px]'
                  width={90}
                  height={50}
                  src={homeTabs.imgPath}
                  alt={homeTabs.title}
                />
                <div className='text-start mr-4 hidden xl:block'>
                  <p className='text-sm'>{homeTabs.title}</p>
                  <p className='text-sm'>{homeTabs.publishDate}</p>
                </div>
              </div>
            </button>
            <hr className='bg-black'/>
          </div>
        ))}
      </div>

      {/* Content on the right for large screens, full width for small/medium screens */}
      <div className="flex-grow w-full lg:w-auto bg-black">
        {homeTabs.map(
          (homeTabs) =>
            activeTab === homeTabs.id && (
              <div key={homeTabs.id} data-content-id={homeTabs.id}>
                <iframe className='w-full h-80'
                  src={`${homeTabs.content}?enablejsapi=1`}
                  title={homeTabs.title}
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