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
  tabs: TabProps[];
}

const CustomTabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto">
      {/* Tabs on the left for large screens, top for small/medium screens */}
      <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r w-full lg:w-1/3">
        <div className='bkPrimaryColor p-[12px] w-full hidden lg:block'>
          <h4 className='text-white text-right  '>الفيديوهات</h4>
        </div>
        {tabs.map((tab) => (
          <div className='bg-white w-full' key={tab.id}>
            <button
              data-tab-id={tab.id}
              className={`w-full px-1 md:px-4 py-2 text-left focus:outline-none ${
                activeTab === tab.id ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold' : 'mainColor'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className='flex items-center justify-center xl:justify-start'>
                <Image className='w-full lg:w-[150px] xl:w-[90px]'
                  width={90}
                  height={50}
                  src={tab.imgPath}
                  alt={tab.title}
                />
                <div className='text-start mr-4 hidden xl:block'>
                  <p className='text-sm'>{tab.title}</p>
                  <p className='text-sm'>{tab.publishDate}</p>
                </div>
              </div>
            </button>
            <hr className='bg-black'/>
          </div>
        ))}
      </div>

      {/* Content on the right for large screens, full width for small/medium screens */}
      <div className="flex-grow w-full lg:w-auto bg-black">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} data-content-id={tab.id}>
                <iframe className='w-full h-80'
                  src={`${tab.content}?enablejsapi=1`}
                  title={tab.title}
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

export default CustomTabs;


// "use client"
// import Image from 'next/image';
// // components/CustomTabs.tsx
// import { useState } from 'react';

// interface TabProps {
//   imgPath: any;
//   publishDate: string;
//   id: number;
//   title: any;
//   content: string;
// }

// interface TabsProps {
//   tabs: TabProps[];
// }

// const CustomTabs: React.FC<TabsProps> = ({ tabs }) => {
//   const [activeTab, setActiveTab] = useState(tabs[0].id);

//   return (
//     <div className="flex items-center bg-black rounded-[15px] overflow-hidden w-3/4 mx-auto">
//       {/* Tabs on the left */}
//       <div className="flex flex-col border-r w-1/3">
//         <div className='bkPrimaryColor p-[12px]'>
//           <h4 className=' text-white hidden md:block'>الفيديوهات</h4>
//         </div>
//         {tabs.map((tab) => (
//           <div className='bg-white'>
//             <button
//             key={tab.id}
//             data-tab-id={tab.id}
//             className={`px-4 py-2 text-left focus:outline-none ${
//               activeTab === tab.id ? 'border-r-2 [border-right-color:#9F854E] primaryColor font-bold' : 'mainColor'
//             }`}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             <div className='flex items-center'>
//               <div>
//                   <Image
//                       width={90}
//                       height={50}
//                       src={tab.imgPath}
//                       alt={tab.title}
//                   />
//               </div>
//                   <div className='text-start mr-4 hidden md:block'>
//                       <p className='text-sm'>{tab.title}</p>
//                       <p className='text-sm'>{ tab.publishDate}</p>
//                 </div>
//               </div>
//           </button>
//           <hr className='bg-black'/>
//           </div>
//         ))}
        
        
//       </div>
//       {/* Content on the right */}
//       <div className="flex-grow bg-black">
//         {tabs.map(
//           (tab) =>
//             activeTab === tab.id && (
//               <div key={tab.id} data-content-id={tab.id}>
//                 <iframe className='w-full h-80'
//                     src={`${tab.content}?enablejsapi=1`}
//                     title={tab.title}
//                     allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
//                     allowFullScreen
//                 />
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomTabs;





// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { ConfigProvider, Tabs } from 'antd';
// import { videoLib } from '../../utils/LibVideoHome';
// import Image from 'next/image';

// type TabPosition = 'left' | 'right' | 'top' | 'bottom';

// const VideoLibTabs: React.FC = () => {
//     const [tabPosition] = useState<TabPosition>('left');
//     const [activeKey, setActiveKey] = useState<string>();
//     const videoRefs = useRef<HTMLIFrameElement[]>([]);

//     const tabItems = videoLib?.map((data, index) => ({
//         key: data.id.toString(),
//         label: (
//             <div className='flex items-start w-80'>
                
//                 <Image
//                     width={130}
//                     height={130}
//                     src={data.imgPath}
//                     alt={data.title}
//                 />
//                 <div className='text-start mr-4 font-cairo font-bold'>
//                     <p>{data.title}</p>
//                     <p>{ data.publishDate}</p>
//                 </div>
//             </div>
//         ),
//         children: (
//             <div>
//                 <iframe className='w-full h-80'
//                     ref={(el) => {
//                         if (el) {
//                             videoRefs.current[index] = el;
//                         }
//                     }}
//                     src={`${data.video}?enablejsapi=1`}
//                     title={data.title}
//                     allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
//                     allowFullScreen
//                 />
//             </div>
//         )
//     }));

//     const handleTabChange = (key: string) => {
//         videoRefs.current.forEach((video) => {
//             if (video?.contentWindow) {
//                 video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
//             }
//         });
//         setActiveKey(key);
//     };

//     useEffect(() => {
//         if (videoLib?.length > 0) {
//             setActiveKey(videoLib[0].id.toString());
//         }
//     }, []);

//     return (
//         <ConfigProvider
//         theme={{
//             components: {
//             Tabs: {
//                     inkBarColor: "#9F854E",
//                     itemActiveColor: "#9F854E",
//                     itemHoverColor: "#9F854E",
//                     itemSelectedColor: "#424C61"
                    
//             },
//             },
//         }}
//         >
//         <div className='container mx-auto'>
//             <div className='w-2/3 mx-auto  mt-5 mb-5 rounded-[10px] overflow-hidden border-[1px] border-[solid] border-[#9F854E]'>
//                 <div className='parent-div'>
//                     {/* Tabs component */}
//                     <div className='bkPrimaryColor p-[20px]'>
//                         <h4 className='text-white'>فيديوهات</h4>
//                      </div>
//                     <Tabs
//                         className="flex items-center"
//                         tabPosition={tabPosition}
//                         items={tabItems}
//                         activeKey={activeKey}
//                         onChange={handleTabChange}
//                     />
//                     {/* The correct iframe is automatically rendered by the Tabs component */}
//                 </div>
//             </div>
//         </div>
//         </ConfigProvider>
        
//     );
// };

// export default VideoLibTabs;



// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { Tabs } from 'antd';
// import { videoLib } from '../../utils/LibVideoHome';
// import Image from 'next/image';

// type TabPosition = 'left' | 'right' | 'top' | 'bottom';

// const VideoLibTabs: React.FC = () => {
//     const [tabPosition, setTabPosition] = useState<TabPosition>('left');
//     const [activeKey, setActiveKey] = useState<string>();
//     const videoRefs = useRef<HTMLIFrameElement[]>([]);

//     // Define the tab items
//     const tabItems = videoLib.map((data, index) => ({
//         key: data.id.toString(),
//         label: (
//             <div>
//                 <p>{data.title}</p>
//                 <Image
//                     width={100}
//                     height={100}
//                     src={data.imgPath}
//                     alt={data.title}
//                 />
//             </div>
//         ),
//         children: (
//             <div className=''>
//                 <iframe className=' w-[830px] h-[560px]'
//                     ref={(el) => {
//                         if (el) {
//                             videoRefs.current[index] = el;
//                         }
//                     }}


//                     src={`${data.video}?enablejsapi=1`} // Ensure the YouTube API parameter is included
//                     title={data.title}
//                     allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
//                     allowFullScreen
//                 />
//             </div>
//         )
//     }));

//     const handleTabChange = (key: string) => {
//         // Pause all videos when changing tabs
//         videoRefs.current.forEach((video) => {
//             if (video && video.contentWindow) {
//                 video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
//             }
//         });
//         setActiveKey(key);
//     };

//     useEffect(() => {
//         if (videoLib.length > 0) {
//             setActiveKey(videoLib[0].id.toString()); // Set the default active key
//         }
//     }, []);

//     return (
//         <div className='container mx-auto'>
//             <div className='w-2/3 mx-auto bg-blue-300 mt-5 mb-5 rounded-[10px] overflow-hidden'>
//                 <Tabs className="flex"
//                     tabPosition={tabPosition}
//                     items={tabItems}
//                     activeKey={activeKey}
//                     onChange={handleTabChange}
//                 />
                
//             </div>
//         </div>
//     );
// };

// export default VideoLibTabs;



// 'use client';

// import { useState } from 'react';
// import { Tabs } from 'antd';
// import { videoLib } from '../../utils/LibVideoHome';
// import Image from 'next/image';

// type TabPosition = 'left' | 'right' | 'top' | 'bottom';

// const VideoLibTabs: React.FC = () => {
//     const [tabPosition, setTabPosition] = useState<TabPosition>('left');

//     // Define the tab items
//     const tabItems = videoLib.map(data => ({
//         key: data.id.toString(),
//         label: (
//             <div className='flex'>
//                 <div>
//                     <Image
//                         width={100}
//                         height={100}
//                         src={data.imgPath}
//                         alt={data.title}
//                     />
//                 </div>
//                 <div className='text-start'>
//                     <p>{data.title}</p>
//                     <p>{data.publishDate}</p>
//                 </div>

//             </div>
//         ),
//         children: (
//             <div className='flex flex-col'>
//                 <iframe className='w-auto lg:w-[550px] h-auto lg:h-[400px]'
//                     src={data.video}
//                     title="YouTube video player"
//                     allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
//                 />
//             </div>
//         )
//     }));

//     return (
//         <div className='w-3/4 bg-red-500 mx-auto'>
//             <div className=''>
//                 <Tabs defaultActiveKey="" tabPosition={tabPosition} items={tabItems} className='bg-white' />
//             </div>
//         </div>
//     );
// };

// export default VideoLibTabs;





