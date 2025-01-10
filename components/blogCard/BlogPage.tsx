"use client"
import soroojImg from "@/public/assets/images/default.webp"; // Default image
import Banners from '../banners/Banners'
import BlogCardBox from "./BlogCardBox";
import { useEffect, useState } from "react";
import LangUseParams from "../translate/LangUseParams";
import axios from "axios"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import BlogCategories from "./BlogCategories";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Store category ID
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const lang = LangUseParams();
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try { 
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs`,
          {
            params: {
              lang,
              category_id: selectedCategoryId || undefined, // Use category_id
              page: currentPage // Add current page to params
            },
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        );

        setBlogs(response.data.data);
        setTotalPages(response.data.meta.last_page || 1); // Update total pages if available
         console.log(response.data.data)
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [lang, selectedCategoryId, currentPage]); // Re-fetch when category ID changes

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          // active page
          className={`px-4 py-2 mx-1 rounded ${i === currentPage ? "bkMainColor text-white font-bold" : "bg-gray-200"
            }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  if (loading) {
    return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const fetchBlogs = blogs.map((blog: any) => {
    return (
      <BlogCardBox
        key={blog.id}
        imgSrc={blog.image}
        watchNumber={`${blog.view_count} مشاهدة`}
        datePublish={blog.publish_date}
        blogTitle={blog.blog_name}
        doctorName={blog.author_name}
        descriptionBlog={blog.brief_description}
        pathLinkToContent={`/${lang}/blogs/${blog.slug}`}
      />
    );
  });

  return (
    <div>
      <div>
        <Banners src={soroojImg} parentTitle={`الرئيسية`} textPath="المدونة" />
      </div>
      <div className="container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
        <div>
          <BlogCategories
            onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)} 
          />
        </div>
        <div className="lg:col-span-3">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fetchBlogs}
            </div>

          ) : (
            <div className="text-center text-gray-500 font-bold">لا توجد مدونات متاحة فى هذا القسم</div>
          )}
          {/* start Pagination Controls */}
          {blogs.length > 0 ? (
            <div className="flex justify-center items-center mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
              >
                السابق
              </button>
              {/* Render numbered pages */}
              {renderPageNumbers()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          ) :
            ""
          }
          {/*end Pagination Controls */}
        </div>
      </div>
    </div>
  )
}

export default BlogPage