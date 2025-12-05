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
import fixLightGalleryYouTube from "@/utils/fixLightGalleryYouTube";



const VideoGallery = () => {
  const searchParams = useSearchParams();
  const [videos, setVideos] = useState<any[]>([]); // Videos data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Selected category
  const [totalPages, setTotalPages] = useState<number>(1); // Total pages
  const currentPage = parseInt(searchParams.get("page") || "1", 30);
  
    useEffect(() => {
      fixLightGalleryYouTube();

      // cleanup optional: disconnect the MutationObserver when component unmounts
      return () => {
        const obs = (window as any).__fixLightGalleryYouTubeObserver;
        if (obs && typeof obs.disconnect === "function") obs.disconnect();
      };
    }, []);


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
      <div className="container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4"
        style={{ direction: "rtl" }}>
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
                  // data-src={`https://www.youtube.com/embed/${video.youtube_link}?enablejsapi=1`}
                  data-src={`https://www.youtube-nocookie.com/embed/${video.youtube_link}?enablejsapi=1`}

                  data-poster={`https://img.youtube.com/vi/${video.youtube_link}/maxresdefault.jpg`}
                  data-sub-html={video.description}
                  referrerPolicy="strict-origin-when-cross-origin"

                  
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