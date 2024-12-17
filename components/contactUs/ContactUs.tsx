'use client';

import LangUseParams from "../translate/LangUseParams";
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';
import './style.css';
import PhoneInput from 'react-phone-input-2';
import FlowerImg from '@/components/flowerImg/FlowerImg';
import { useState } from 'react';
import Swal from 'sweetalert2'; // Optional: For better feedback messages

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
            <div className="container mx-auto items-center">
                <div className="my-10" style={{ direction: "ltr" }}>
                    <h1 className="text-center font-bold p-5 text-2xl md:text-4xl mainColor">
                        {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="w-[95%] md:w-[80%] mx-auto z-30 relative bg-[#fff] mt-[24px] p-[45px] [box-shadow:1px_1px_10px_#ddd] rounded-[10px]"
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
            {/* Flower Image */}
            <FlowerImg />
        </div>
    );
};

export default ContactUs;





// 'use client'
// import LangUseParams from "../translate/LangUseParams"
// import axios from 'axios'
// import 'react-phone-input-2/lib/style.css'
// import './style.css'
// import PhoneInput from 'react-phone-input-2'
// import Image from 'next/image'
// import whiteAuthBk from '@/public/assets/images/Vector.svg'
// import FlowerImg from '@/components/flowerImg/FlowerImg'
// import loginauth from '@/public/assets/images/loginauth.svg'

// const ContactUs = () => {

//     // lang param (ar Or en)
//     const lang = LangUseParams() // Access dynamic [lang] parameter
//     return (

//         <div className='relative grdianBK' style={{ direction: "rtl" }}>
//             <div className=' container mx-auto items-center'>
//                 <div className='my-10' style={{ direction: "ltr" }}>
//                     <h1 className="text-center font-bold p-5 text-2xl md:text-4xl mainColor">
//                         تواصل معنا
//                     </h1>
//                     <form
//                         className="w-[95%] md:w-[80%] mx-auto z-30 relative bg-[#fff] mt-[24px] p-[45px] [box-shadow:1px_1px_10px_#ddd] rounded-[10px]">
//                         {/* Form Fields */}
//                         <div className="mb-4">
//                             <label className={`block text-sm font-bold leading-6 mainColor
//                                         ${lang === "en" ? 'text-start' : 'text-end'}`
//                             }
//                             >
//                                 الاسم
//                             </label>
//                             <input
//                                 type="text"
//                                 name="first_name"
//                                 // value={form.first_name}
//                                 // onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
//                             />
//                             {/* {errors.first_name && <p className="text-red-500">{errors.first_name}</p>} */}
//                         </div>
//                         <div className="mb-4">
//                             <label className={`block text-sm font-bold leading-6 mainColor
//                                         ${lang === "en" ? 'text-start' : 'text-end'}`
//                             }>
//                                 {/* {translate ? translate.pages.signup.email : ""} */}
//                                 البريد الالكترونى
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 // value={form.email}
//                                 // onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
//                             />
//                             {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
//                         </div>
//                         <div className="mb-4">
//                             <label className={`block text-sm font-bold leading-6 mainColor
//                                         ${lang === "en" ? 'text-start' : 'text-end'}`
//                             }>
//                                 {/* {translate ? translate.pages.signup.phoneNumber : ""} */}
//                                 رقم الجوال
//                             </label>
//                             <PhoneInput
//                                 country={'kw'}
//                                 // value={form.mobile}
//                                 // onChange={handlePhoneChange}
//                                 inputClass="mt-1 block w-full pl-[52px] pr-[0] py-[20px] border border-gray-300 rounded-md shadow-sm"
//                                 inputProps={{
//                                     name: 'phone',
//                                     required: true,
//                                     autoFocus: true
//                                 }}
//                             />
//                             {/* {errors.mobile && <p className="text-red-500">{errors.mobile}</p>} */}
//                         </div>
//                         <div className="mb-4">
//                             <label className={`block text-sm font-bold leading-6 mainColor
//                                                 ${lang === "en" ? 'text-start' : 'text-end'}`
//                             }
//                             >
//                                 {/* {translate ? translate.pages.signup.gender : "النوع"} */}
//                                 نوع الطلب
//                             </label>
//                             <select
//                                 name="gender"
//                                 // value={form.gender}
//                                 // onChange={handleChange}
//                                 className="mt-1 block w-full p-2 px-4 border border-gray-300 rounded-md shadow-sm outline-none"
//                                 required>
//                                 <option value="" disabled>نوع الطلب</option>
//                                 <option value="male">شكوى</option>
//                                 <option value="female">استفسار</option>
//                             </select>
//                             {/* {errors.gender && <p className="text-red-500">{errors.gender}</p>} */}

//                         </div>
//                         <div>
//                             <label className={`block text-sm font-bold leading-6 mainColor
//                                         ${lang === "en" ? 'text-start' : 'text-end'}`
//                             }>
//                                 {/* {translate ? translate.pages.signup.phoneNumber : ""} */}
//                                 الرسالة
//                             </label>
//                             <textarea className="w-full rounded-[4px] [box-shadow:1px_1px_10px_#ccc] h-[140px] mt-[10px] outline-[none] p-[14px]">
//                             </textarea>
//                         </div>
//                         <div>
//                             <button type="submit" className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg">
//                                 {/* {translate ? translate.pages.signup.send : ""} */}
//                                 ارسال
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             {/* flower img */}
//             <FlowerImg />
//             {/* flower img */}
//         </div>
//     )
// }

// export default ContactUs