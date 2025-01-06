"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import Swal from "sweetalert2";


const SubscribeCourse = ({ courseDetails }: any) => {
    const token = Cookies.get('access_token');
    const { slug } = useParams();
    const course_id = courseDetails.id
    const [is_subscribed, setIs_subscribed] = useState<boolean>(courseDetails.is_subscribed);

    useEffect(() => {
        const subscribeCourseContent = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/courses/${slug}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            withCredentials: true,
                        },

                    }
                );
                const courseState = res.data.data.Courses.is_subscribed;
                //console.log("Wish State:", wishState);
                setIs_subscribed(courseState)
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            subscribeCourseContent();
        }
    }, [slug, token]);
    //////////////////////////////////////
    const handleSubscribeBtn = async () => {
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'غير مسجل',
                text: 'يرجى تسجيل الدخول أولاً لتتمكن من  الاشتراك فى الدورة',
            });
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/add-subscription/${course_id}`,
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
                setIs_subscribed((prev) => !prev);
                Swal.fire({
                    icon: 'success',
                    title: 'تم الإرسال',
                    text: response.data.message || 'تم الاشتراك بنجاح!',
                });
            }
            Swal.fire({
                icon: 'success',
                title: 'تم الإرسال',
                text: response.data.message || 'تم الاشتراك  بنجاح!',
            });
        } catch (error: any) {
            console.error('subscrib couese Error:', error.response?.data || error.message);
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.',
            });
        }
    };

    return (
        <div className="testCourse mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div onClick={handleSubscribeBtn}
                className='col-span-2 cursor-pointer'>
                {is_subscribed
                    ? <span></span>
                    : <span className="bkMainColor text-white px-[20px] py-[10px] rounded-[6px]">
                        اشترك فى الدورة مجانا
                    </span>}
            </div>
            {/* <div className='col-span-2'>
                <button onClick={handleSubscribeBtn}
                    className={`bkMainColor text-white px-[20px] py-[10px] rounded-[6px]`}>
                    {is_subscribed ? 'الغاء الاشتراك' : 'اشترك فى الدورة مجانا'}
                </button>
            </div> */}
            <div className="col-span-2">
                {is_subscribed
                    ?
                    <button className='bkMainColor text-white px-[20px] py-[10px] rounded-[6px]'>
                        بدء الاختبار
                    </button>
                    :
                    ''}
            </div>
        </div>
    )
}

export default SubscribeCourse