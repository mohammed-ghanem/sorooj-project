'use client';

import LangUseParams from "../translate/LangUseParams";
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';
import './style.css';
import PhoneInput from 'react-phone-input-2';
import FlowerImg from '@/components/flowerImg/FlowerImg';
import { useState } from 'react';
import Swal from 'sweetalert2'; // Optional: For better feedback messages
import Banners from "../banners/Banners";
import soroojImg from "@/public/assets/images/default.webp"; // Default image

const ContactUs = () => {
    const lang = LangUseParams(); // Access dynamic [lang] parameter

    // State to manage form data and errors
    const [form, setForm] = useState({
        name: '',
        email: '',
        mobile: '',
        type: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle phone input changes
    const handlePhoneChange = (value: string) => {
        setForm((prev) => ({ ...prev, mobile: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
                withCredentials: true, // Ensure credentials (cookies) are sent
            });

            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
            // Step 2: Make the signup request after CSRF token is set
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/contacts`, form, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                },
                withCredentials: true, // Make sure to include cookies in the request
            });


            // Close loading indicator upon success
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: lang === 'ar' ? 'تم الإرسال بنجاح' : 'Message sent successfully!',
                text: lang === 'ar' ? 'سوف نتواصل معك قريباً' : 'We will get back to you soon.',
            });

            // Reset form on success
            setForm({
                name: '',
                email: '',
                mobile: '',
                type: '',
                message: '',
            });
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: lang === 'ar' ? 'حدث خطأ' : 'Error occurred!',
                text: error.response?.data?.message || (lang === 'ar' ? 'يرجى المحاولة لاحقاً' : 'Please try again later.'),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative grdianBK" style={{ direction: "rtl" }}>
            <div>
                <Banners src={soroojImg} parentTitle={`الرئيسية`} textPath="تواصل معنا" />
            </div>
            <div className="container mx-auto items-center">
                <div className="my-10" style={{ direction: "ltr" }}>

                    <div className="bkBox p-2 lg:p-10 w-[95%] lg:w-[80%] mx-auto bg-white items-center [box-shadow:1px_1px_10px_#ddd] rounded-[10px]">
                        <h1 className="text-center font-bold pt-0 pb-5 text-xl md:text-2xl mainColor">
                            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                        </h1>
                        <div className="bg-white grid grid-cols-1 lg:grid-cols-6 gap-4 rounded-[10px]">
                            <div className="imgAnimation col-span-1 lg:col-span-2 hidden lg:block relative w-full h-full">
                                <iframe className=" absolute w-[500px] h-[340px] top-1/4" src="https://lottie.host/embed/15ae87e5-1faa-4d14-a639-95a4467cd057/7eTRZUDExD.lottie"></iframe>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="col-span-1 lg:col-span-4 w-[95%] md:w-[95%] mx-auto z-30 relative mt-[24px] p-0 lg:p-[45px]"
                            >
                                {/* Name Field */}
                                <div className="mb-4">
                                    <label
                                        className={`block text-sm font-bold leading-6 mainColor ${lang === 'en' ? 'text-start' : 'text-end'
                                            }`}
                                    >
                                        {lang === 'ar' ? 'الاسم' : 'Name'}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="mb-4">
                                    <label
                                        className={`block text-sm font-bold leading-6 mainColor ${lang === 'en' ? 'text-start' : 'text-end'
                                            }`}
                                    >
                                        {lang === 'ar' ? 'البريد الالكتروني' : 'Email'}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div className="mb-4">
                                    <label
                                        className={`block text-sm font-bold leading-6 mainColor ${lang === 'en' ? 'text-start' : 'text-end'
                                            }`}
                                    >
                                        {lang === 'ar' ? 'رقم الجوال' : 'Phone Number'}
                                    </label>
                                    <PhoneInput
                                        country={'kw'}
                                        value={form.mobile}
                                        onChange={handlePhoneChange}
                                        inputClass="mt-1 block w-full pl-[52px] pr-[0] py-[20px] border border-gray-300 rounded-md shadow-sm"
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                            autoFocus: true,
                                        }}
                                    />
                                </div>

                                {/* Request Type */}
                                <div className="mb-4">
                                    <label
                                        className={`block text-sm font-bold leading-6 mainColor ${lang === 'en' ? 'text-start' : 'text-end'
                                            }`}
                                    >
                                        {lang === 'ar' ? 'نوع الطلب' : 'Request Type'}
                                    </label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 px-4 border border-gray-300 rounded-md shadow-sm outline-none"
                                        required
                                    >
                                        <option value="" disabled>
                                            {lang === 'ar' ? 'اختر نوع الطلب' : 'Select Request Type'}
                                        </option>
                                        <option value="complaint">{lang === 'ar' ? 'شكوى' : 'Complaint'}</option>
                                        <option value="inquiry">{lang === 'ar' ? 'استفسار' : 'Inquiry'}</option>
                                        <option value="suggestion">{lang === 'ar' ? 'اقتراح' : 'suggestion'}</option>
                                        <option value="request">{lang === 'ar' ? 'طلب' : 'request'}</option>
                                        <option value="other">{lang === 'ar' ? 'اخرى' : 'other'}</option>
                                    </select>
                                </div>

                                {/* Message Field */}
                                <div className="mb-4">
                                    <label
                                        className={`block text-sm font-bold leading-6 mainColor ${lang === 'en' ? 'text-start' : 'text-end'
                                            }`}
                                    >
                                        {lang === 'ar' ? 'الرسالة' : 'Message'}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full text-right rounded-[4px] [box-shadow:1px_1px_10px_#ccc] h-[140px] mt-[10px] outline-none p-[14px]"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg"
                                    >
                                        {loading ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : lang === 'ar' ? 'ارسال' : 'Send'}
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>

                </div>
            </div>
            {/* Flower Image */}
            <FlowerImg />
        </div>
    );
};

export default ContactUs;