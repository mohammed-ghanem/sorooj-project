"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import Swal from "sweetalert2";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const BooksAddWishList = ({ bookDetails }: any) => {
  const token = Cookies.get('access_token');
  const { slug } = useParams();
  const book_id = bookDetails.id
  const [is_favorite, setIs_favorite] = useState<boolean>(bookDetails.is_favorite);
  useEffect(() => {
    const wishList = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              withCredentials: true,
            },

          }
        );
        const wishState = res.data.data.Books.is_favorite;
        //console.log("Wish State:", wishState);
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
        confirmButtonText: `تم`

      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/toggle-favorite/${book_id}`,
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
        </div>
      ) : (
        <div className="flex items-center">
          <HeartOutlined />
        </div>
      )}
    </button>
  </div>;
};


export default BooksAddWishList