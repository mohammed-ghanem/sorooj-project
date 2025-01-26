"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import Swal from "sweetalert2";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const CourseAddWishList = ({ courseDetails }: any) => {
  const token = Cookies.get('access_token');
  const { slug } = useParams();
  const course_id = courseDetails.id
  const [is_favorite, setIs_favorite] = useState<boolean>(courseDetails.is_favorite);
  useEffect(() => {
    const wishList = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              withCredentials: true,
            },

          }
        );
        const wishState = res.data.data.Courses.is_favorite;
        setIs_favorite(wishState)
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      wishList();
    }
  }, [slug, token]);
  //////////////////////////////////////
  const handleWishlist = async () => {
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'غير مسجل',
        text: 'يرجى تسجيل الدخول أولاً لتتمكن من اضافة المفضلة',
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/toggle-favorite/${course_id}`,
        {}, // Empty body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        }
      );
      if (response.status === 200) {
        setIs_favorite((prev) => !prev);
        Swal.fire({
          icon: 'success',
          title: 'تم الإرسال',
          text: response.data.message || 'تم إضافة المفضلة بنجاح!',
          confirmButtonText: `تم`

        });
      }
      Swal.fire({
        icon: 'success',
        title: 'تم الإرسال',
        text: response.data.message || 'تم إضافة المفضلة بنجاح!',
        confirmButtonText: `تم`
      });
    } catch (error: any) {
      console.error('Wishlist Error:', error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.',
        confirmButtonText: `تم`

      });
    }
  };
  return <div className="flex items-center">
    <button onClick={handleWishlist} className="text-2xl">
      {is_favorite ? (
        <div className="flex items-center">
          <HeartFilled className="" style={{ "color": "#424C61" }} />
          {/* <span className="textFav text-sm font-bold mr-2">حذف من المفضلة</span> */}
        </div>
      ) : (
        <div className="flex items-center">
          <HeartOutlined />
          {/* <span className="textFav text-xs font-bold mr-2">اضف الى المفضلة</span> */}
        </div>
      )}
    </button>
  </div>;
};

export default CourseAddWishList;