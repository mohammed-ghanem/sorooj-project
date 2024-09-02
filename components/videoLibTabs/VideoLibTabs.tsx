'use client';

import { useState, useRef, useEffect } from 'react';
import { Tabs } from 'antd';
import { videoLib } from '../../utils/LibVideoHome';
import Image from 'next/image';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const VideoLibTabs: React.FC = () => {
    const [tabPosition, setTabPosition] = useState<TabPosition>('left');
    const [activeKey, setActiveKey] = useState<string>();
    const videoRefs = useRef<HTMLIFrameElement[]>([]);

    // Define the tab items
    const tabItems = videoLib.map((data, index) => ({
        key: data.id.toString(),
        label: (
            <div>
                <p>{data.title}</p>
                <Image
                    width={50}
                    height={50}
                    src={data.imgPath}
                    alt={data.title}
                />
            </div>
        ),
        children: (
            <div className=''>
                <iframe className=''
                    ref={(el) => {
                        if (el) {
                            videoRefs.current[index] = el;
                        }
                    }}
                    width="560"
                    height="315"
                    src={`${data.video}?enablejsapi=1`} // Ensure the YouTube API parameter is included
                    title={data.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                />
            </div>
        )
    }));

    const handleTabChange = (key: string) => {
        // Pause all videos when changing tabs
        videoRefs.current.forEach((video) => {
            if (video && video.contentWindow) {
                video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });
        setActiveKey(key);
    };

    useEffect(() => {
        if (videoLib.length > 0) {
            setActiveKey(videoLib[0].id.toString()); // Set the default active key
        }
    }, []);

    return (
        <div className='container mx-auto'>
            <div className='w-3/4 mx-auto bg-blue-900 mt-5 mb-5'>
                <Tabs className="flex"
                    tabPosition={tabPosition}
                    items={tabItems}
                    activeKey={activeKey}
                    onChange={handleTabChange}
                />
            </div>
        </div>
    );
};

export default VideoLibTabs;



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





