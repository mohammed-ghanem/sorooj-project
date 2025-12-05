'use client';
import Image from 'next/image';
import { useState } from 'react';

const VideoBlogTab = ({ blogVideos }: any) => {


    const [activeTab, setActiveTab] = useState(blogVideos[0].id);
    return (
        <div className="flex flex-col lg:flex-row items-center bg-black rounded-[15px] overflow-hidden w-full lg:w-3/4 mx-auto">
            {/* Tabs on the left for large screens, top for small/medium screens */}
            <div className="flex lg:flex-col border-b lg:border-b-0 md:border-r bg-white w-full lg:w-1/3 h-auto lg:h-[395px] overflow-x-scroll lg:overflow-x-auto">
                <div className='bkPrimaryColor p-[12px] w-full hidden lg:block'>
                    <h4 className='text-white text-right  '>الفيديوهات</h4>
                </div>

                

                {blogVideos.map((blogVideos: any) => (

                    <div className='bg-white w-full' key={blogVideos.id}>
                        <button
                            data-tab-id={blogVideos.id}
                            className={` w-48 lg:w-full px-1 md:px-4 py-2 text-left focus:outline-none ${activeTab === blogVideos.id ? 'md:border-r-2 [border-color:#9F854E] primaryColor font-bold' : 'mainColor'
                                }`}
                            onClick={() => setActiveTab(blogVideos.id)}
                        >
                            <div className='flex items-center justify-center xl:justify-start'>
                                <Image className='w-full lg:w-[150px] xl:w-[90px]'
                                    width={90}
                                    height={50}
                                    src={`https://img.youtube.com/vi/${blogVideos.video_url}/mqdefault.jpg`}
                                    alt={blogVideos.name}
                                />
                                <div className='text-start mr-4 hidden xl:block'>
                                    <p className='text-xs'>{blogVideos.name}</p>
                                    <p className='text-xs'>{blogVideos.publish_date}</p>
                                </div>
                            </div>
                        </button>
                        <hr className='bg-black' />
                    </div>
                ))}
            </div>

            {/* Content on the right for large screens, full width for small/medium screens */}
            <div className="flex-grow w-full lg:w-auto bg-black">
                {blogVideos.map(
                    (blogVideos: any) =>
                        activeTab === blogVideos.id && (
                            <div key={blogVideos.id} data-content-id={blogVideos.id}>
                                <iframe className='w-full h-80'
                                    src={`https://www.youtube.com/embed/${blogVideos.video_url}?enablejsapi=1`}
                                    title={blogVideos.name}
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

export default VideoBlogTab;





