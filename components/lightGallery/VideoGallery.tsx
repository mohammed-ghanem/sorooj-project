// "use client"
// import React, { Suspense } from "react";
// import LightGallery from "lightgallery/react";
// import lgThumbnail from "lightgallery/plugins/thumbnail";
// import lgZoom from "lightgallery/plugins/zoom";
// import lgVideo from "lightgallery/plugins/video";
// import share from "lightgallery/plugins/share";
// import fullscreen from "lightgallery/plugins/fullscreen";
// import autoplay from "lightgallery/plugins/autoplay";
// import defImage from "@/public/assets/images/default.webp"; // Default image
// import "./style.css";
// import Image from "next/image";
// import Banners from "../banners/Banners";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlay, faPenNib, faPenToSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import VideoGalleryCategories from "./VideoGalleryCategories";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// // Importing the 'lightgallery' library directly
// import lightGallery from "lightgallery";

// const VideoGallery = () => {
//   const searchParams = useSearchParams();
//   const [videos, setVideos] = useState<any[]>([]); // Videos data
//   const [loading, setLoading] = useState<boolean>(true); // Loading state
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Selected category
//   const [totalPages, setTotalPages] = useState<number>(1); // Total pages
//   const currentPage = parseInt(searchParams.get("page") || "1", 30);
//   const galleryContainerRef = useRef<HTMLDivElement | null>(null); // Reference for gallery container

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/videos`, {
//           params: {
//             category_id: selectedCategoryId || undefined,
//             limit: 12,
//             page: currentPage,
//           },
//           headers: {
//             "Content-Type": "application/json",
//             withCredentials: true,
//           },
//         });
//         setVideos(response.data.data || []);
//         setTotalPages(response.data.meta?.last_page || 1);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [selectedCategoryId, currentPage]);

//   const handlePageChange = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       window.location.href = `?page=${page}`;
//     }
//   };

//   const renderPageNumbers = () => {
//     return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//       <button
//         key={page}
//         onClick={() => handlePageChange(page)}
//         className={`px-4 py-2 mx-1 rounded ${
//           page === currentPage ? "bkMainColor text-white font-bold" : "bg-gray-200"
//         }`}
//       >
//         {page}
//       </button>
//     ));
//   };

//   // Initialize LightGallery when component mounts
//   useEffect(() => {
//     let lightGalleryInstance: any = null;

//     if (galleryContainerRef.current) {
//       lightGalleryInstance = lightGallery(galleryContainerRef.current, {
//         selector: ".gallery-item",
//         mode: "lg-fade",
//         speed: 500,
//         plugins: [lgThumbnail, lgZoom, lgVideo, fullscreen, share, autoplay],
//       });
//     }

//     // Cleanup on unmount
//     return () => {
//       if (lightGalleryInstance) {
//         lightGalleryInstance.destroy(true);
//       }
//     };
//   }, [videos]);

//   if (loading) {
//     return (
//       <div className="text-center">
//         <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Banners src={defImage} parentTitle={`الرئيسية`} textPath="المكتبة المرئية" />
//       <div className="container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4">
//         <div>
//           <VideoGalleryCategories onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)} />
//         </div>
//         <div className="col-span-3">
//           {videos.length > 0 ? (
//             <div ref={galleryContainerRef}>
//               {videos.map((video) => (
//                 <a
//                   key={video.id}
//                   className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#ddd] cursor-pointer"
//                   data-src={`https://www.youtube.com/embed/${video.youtube_link}?enablejsapi=1`}
//                   data-poster={`https://img.youtube.com/vi/${video.youtube_link}/maxresdefault.jpg`}
//                   data-sub-html={video.description}
//                 >
//                   <div className="relative overflow-hidden">
//                     <div className="absolute inset-0 bg-black bg-opacity-30 z-30">
//                       <FontAwesomeIcon
//                         icon={faCirclePlay}
//                         className="text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]"
//                       />
//                     </div>
//                     <Image
//                       className="max-w-full w-full"
//                       src={`https://img.youtube.com/vi/${video.youtube_link}/maxresdefault.jpg`}
//                       width={100}
//                       height={100}
//                       alt={video.name}
//                     />
//                   </div>
//                   <div className="flex items-center px-2 pt-2">
//                     <FontAwesomeIcon className="primaryColor ml-2" icon={faPenNib} />
//                     <h2 className="mainColor font-bold text-[12px]">
//                       {video.name.length > 40 ? `${video.name.slice(0, 40)}...` : video.name}
//                     </h2>
//                   </div>
//                   <div className="flex items-center px-2 py-2">
//                     <FontAwesomeIcon className="primaryColor ml-2" icon={faPenToSquare} />
//                     <p className="mainColor font-bold text-[10px]">
//                       {video.description.length > 100 ? `${video.description.slice(0, 100)}...` : video.description}
//                     </p>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 font-bold">لا توجد فيديوهات متاحة فى هذا القسم</div>
//           )}
//         </div>
//       </div>
//       {videos.length > 0 && (
//         <div className="flex justify-center items-center my-8">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
//           >
//             السابق
//           </button>
//           {renderPageNumbers()}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
//           >
//             التالي
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Wrapping the component in Suspense boundary
// const VideoGalleryWithSuspense = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <VideoGallery />
//     </Suspense>
//   );
// };

// export default VideoGalleryWithSuspense;



"use client";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import share from "lightgallery/plugins/share";
import fullscreen from "lightgallery/plugins/fullscreen";
import autoplay from "lightgallery/plugins/autoplay";
import defImage from "@/public/assets/images/default.webp"; // Default image
import "./style.css";
import Image from "next/image";
import Banners from "../banners/Banners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faPenNib, faPenToSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
import VideoGalleryCategories from "./VideoGalleryCategories";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const VideoGallery = () => {
  const searchParams = useSearchParams();
  const [videos, setVideos] = useState<any[]>([]); // Videos data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Selected category
  const [totalPages, setTotalPages] = useState<number>(1); // Total pages
  const currentPage = parseInt(searchParams.get("page") || "1", 30);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/videos`, {
          params: {
            category_id: selectedCategoryId || undefined,
            limit: 12,
            page: currentPage,
          },
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        });
        setVideos(response.data.data || []);
        setTotalPages(response.data.meta?.last_page || 1);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategoryId, currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      window.location.href = `?page=${page}`
    }
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-4 py-2 mx-1 rounded ${
          page === currentPage ? "bkMainColor text-white font-bold" : "bg-gray-200"
        }`}
      >
        {page}
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="text-center">
        <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
      </div>
    );
  }

  return (
    <div>
      <Banners src={defImage} parentTitle={`الرئيسية`} textPath="المكتبة المرئية" />
      <div className="container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div>
          <VideoGalleryCategories onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)} />
        </div>
        <div className="col-span-3">
          {videos.length > 0 ? (
            <LightGallery
              key={selectedCategoryId}
              elementClassNames="grid grid-cols-1 lg:grid-cols-3 gap-4"
              mode="lg-fade"
              speed={500}
              plugins={[lgThumbnail, lgZoom, lgVideo, fullscreen, share, autoplay]}
            >
              {videos.map((video) => (
                <a
                  key={video.id}
                  className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#ddd] cursor-pointer"
                  data-src={`https://www.youtube.com/embed/${video.youtube_link}?enablejsapi=1`}
                  data-poster={`https://img.youtube.com/vi/${video.youtube_link}/maxresdefault.jpg`}
                  data-sub-html={video.description}
                >
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-30 z-30">
                      <FontAwesomeIcon
                        icon={faCirclePlay}
                        className="text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]"
                      />
                    </div>
                    <Image
                      className="max-w-full w-full"
                      src={`https://img.youtube.com/vi/${video.youtube_link}/maxresdefault.jpg`}
                      width={100}
                      height={100}
                      alt={video.name}
                    />
                  </div>
                  <div className="flex items-center px-2 pt-2">
                    <FontAwesomeIcon className="primaryColor ml-2" icon={faPenNib} />
                    <h2 className="mainColor font-bold text-[12px]">
                      {video.name.length > 40 ? `${video.name.slice(0, 40)}...` : video.name}
                    </h2>
                  </div>
                  <div className="flex items-center px-2 py-2">
                    <FontAwesomeIcon className="primaryColor ml-2" icon={faPenToSquare} />
                    <p className="mainColor font-bold text-[10px]">
                      {video.description.length > 100 ? `${video.description.slice(0, 100)}...` : video.description}
                    </p>
                  </div>
                </a>
              ))}
            </LightGallery>
          ) : (
            <div className="text-center text-gray-500 font-bold">لا توجد فيديوهات متاحة فى هذا القسم</div>
          )}
        </div>
      </div>
      {videos.length > 0 && (
        <div className="flex justify-center items-center my-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
          >
            السابق
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
};

const VideoGalleryWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoGallery />
    </Suspense>
  );
};

export default VideoGalleryWithSuspense;



// "use client"
// import LightGallery from 'lightgallery/react';
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgVideo from 'lightgallery/plugins/video';
// import share from 'lightgallery/plugins/share'
// import fullscreen from 'lightgallery/plugins/fullscreen'
// import autoplay from 'lightgallery/plugins/autoplay';
// import defImage from "@/public/assets/images/default.webp"; // Default image
// import "./style.css"
// import Image from 'next/image';
// import Banners from '../banners/Banners';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCirclePlay, faPenNib, faPenToSquare, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import VideoGalleryCategories from './VideoGalleryCategories';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const VideoGallery = () => {

//   const [videos, setVideos] = useState<any[]>([]); // State to store videos
//   const [loading, setLoading] = useState<boolean>(true); // State to handle loading
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Store category ID
//   const [currentPage, setCurrentPage] = useState(1); // Track current page
//   const [totalPages, setTotalPages] = useState(1); // Track total pages

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/videos`,
//           {
//             params: {
//               category_id: selectedCategoryId || undefined, // Use category_id
//               limit: 2,
//               page: currentPage // Add current page to params
//             },
//             headers: {
//               "Content-Type": "application/json",
//               withCredentials: true,
//             },
//           }
//         );
//         setVideos(response.data.data); // Set the fetched videos
//         setTotalPages(response.data.meta.last_page || 1); // Update total pages if available
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [selectedCategoryId, currentPage]);
//   const handlePageChange = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };
//   const renderPageNumbers = () => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           // active page
//           className={`px-4 py-2 mx-1 rounded ${i === currentPage ? "bkMainColor text-white font-bold" : "bg-gray-200"
//             }`}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pages;
//   };
//   if (loading) {
//     return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
//   }
//   const videoCards = videos.map((video) => (
//     <a
//       key={video.id}
//       className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#ddd] cursor-pointer"
//       data-src={`https://www.youtube.com/embed/${video.youtube_link}?enablejsapi=1`}
//       data-poster={`https://img.youtube.com/vi/${video.youtube_link}/maxresdefault.jpg`}
//       data-sub-html={video.description}
//     >
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-black bg-opacity-30 z-30">
//           <FontAwesomeIcon
//             icon={faCirclePlay}
//             className="text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]"
//           />
//         </div>
//         <div className="absolute text-white w-96 font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85">
//           <span className='font-cairo text-[10px] w-fit font-bold mainColor absolute top-[6px] left-[6px] bkColor px-[8px] py-[3px] rounded-[15px]'>{video.publish_date}</span>
//         </div>

//         <Image
//           className="max-w-full w-full"
//           src={`https://img.youtube.com/vi/${video.youtube_link}/maxresdefault.jpg`}
//           width={100}
//           height={100}
//           alt={video.name}
//         />
//       </div>
//       <div className="flex items-center px-2 pt-2">
//         <span>
//           <FontAwesomeIcon className="primaryColor ml-2" icon={faPenNib} />
//         </span>
//         <h2 className="mainColor font-bold text-[12px]">
//           {video.name.length > 40
//             ?
//             video.name.slice(0, 40) + "..."
//             : video.name
//           }
//         </h2>
//       </div>
//       <div className="flex items-center px-2 py-2">
//         <span>
//           <FontAwesomeIcon className="primaryColor ml-2" icon={faPenToSquare} />
//         </span>
//         <p className="mainColor font-bold text-[10px]">
//           {video.description.length > 100
//             ? video.description.slice(0, 100) + "..."
//             : video.description
//           }
//         </p>
//       </div>
//     </a>
//   ))
//   return (
//     <div>
//       <div>
//         <Banners src={defImage} textPath="المكتبة المرئية" />
//       </div>
//       <div className='container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4'>
//         <div><VideoGalleryCategories onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)} /></div>

//         {videoCards.length > 0
//           ?
//           <LightGallery
//             key={selectedCategoryId} // Add key to force re-initialization
//             elementClassNames={`col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4`}
//             mode="lg-fade"
//             speed={500}
//             videojsOptions={{ muted: false }}
//             plugins={[lgThumbnail, lgZoom, lgVideo, fullscreen, share, autoplay]}
//           >
//             {videoCards}
//           </LightGallery>
//           :
//           <div className="text-center text-gray-500 font-bold">لا توجد فيديوهات متاحة فى هذا القسم</div>

//         }
//       </div>
//       <div>
//         {/* Pagination Controls */}
//         {videos.length > 0 ? (
//           <div className="flex justify-center items-center my-8">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
//             >
//               السابق
//             </button>
//             {/* Render numbered pages */}
//             {renderPageNumbers()}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
//             >
//               التالي
//             </button>
//           </div>
//         ) :
//           ""
//         }
//         {/* Pagination Controls */}
//       </div>
//     </div>
//   );
// };

// export default VideoGallery










///////////////////// its work with photo



/* eslint-disable @next/next/no-img-element */

// #lg-inner-1 .lg-item {
//  display: block!important;
// }

// import LightGallery from 'lightgallery/react';

// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import "./style.css"
// import Image from 'next/image';

// const videoGallery = () => {
//   return (
//     <div>
//       <LightGallery
//         mode="lg-fade"
//         speed={500}
//         plugins={[lgThumbnail, lgZoom]}
//       >
//         <a
//           data-lg-size="1406-1390"
//           className="gallery-item"
//           data-src="//www.youtube.com/watch?v=EIUJfXk3_3w"
//         data-poster="https://img.youtube.com/vi/EIUJfXk3_3w/maxresdefault.jpg"
//           data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
//         >

//           <img
//             alt=''
//             className=" max-w-full"
//             src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
//           />
//         </a>
//         <a
//           data-lg-size="1406-1390"
//           className="gallery-item"
//           data-src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80"
//           data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
//         >

//           <img
//             alt=''
//             className="max-w-full"
//             src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
//           />
//         </a>
//       </LightGallery>
//     </div>
//   )
// }

// export default videoGallery