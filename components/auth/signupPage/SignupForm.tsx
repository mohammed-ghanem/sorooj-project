'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import 'react-phone-input-2/lib/style.css'
import './style.css'
import PhoneInput from 'react-phone-input-2'
import { z, ZodError } from 'zod'
import Swal from 'sweetalert2'
import { axiosDefaultConfig, axiosWithCredentials } from '@/utils/axiosConfig'
import { useParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie' // Import the cookies library
import Image from 'next/image'
import whiteAuthBk from '@/assets/images/Vector.svg'
import loginauth from '@/assets/images/loginauth.svg'
import flower from '@/assets/images/flower.svg'
import SocialLogin from '@/components/socialLogin/SocialLogin'
import TranslateHook from '../../translate/TranslateHook';

axiosWithCredentials;
axiosDefaultConfig;

// Zod schema for validation
const errorMessage = "Password must be at least 8 characters contain uppercase & lowercase letter & at least 1 number /[0-9]/ with at least 1 special character /[@$!%*?&]/ "

const SignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z
        .string()
        .min(8, errorMessage)
        .regex(/[A-Z]/, errorMessage)
        .regex(/[a-z]/, errorMessage)
        .regex(/[0-9]/, errorMessage)
        .regex(/[@$!%*?&]/, errorMessage),
    password_confirmation: z.string(),
    mobile: z.string().min(5, "Phone number is required"),
}).refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords don't match",
});

interface FormData {
    name: string
    email: string
    password: string
    password_confirmation: string
    mobile: string
}

const SignupForm = () => {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        mobile: ''
    })

    const { lang }: { lang?: string } = useParams();
    const translate = TranslateHook();
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
    const router = useRouter() // Use Next.js router for navigation

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePhoneChange = (value: string) => {
        setForm({ ...form, mobile: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Show loading indicator
        Swal.fire({
            title: `${translate ? translate.pages.changePassword.loadingTitle : "Please wait..."}`,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Zod validation
        try {
            SignupSchema.parse(form); // Will throw an error if validation fails
            setErrors({}); // Clear errors if validation passes

            try {
                // Step 1: Make a request to get the CSRF token from the backend
                await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
                    withCredentials: true, // Ensure credentials (cookies) are sent
                });

                const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
                // Step 2: Make the signup request after CSRF token is set
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/register`, form, {
                    headers: {
                        'X-XSRF-TOKEN': csrfToken,
                    },
                    withCredentials: true, // Make sure to include cookies in the request
                });


                // Close loading indicator upon success
                Swal.close();

                // Step 3: Store the access_token in a secure, HttpOnly cookie
                const accessToken = response.data.data.access_token;
                const isVerified = response.data.data.user.is_verified;

                // Set the cookie using Cookies library (js-cookie)
                Cookies.set('access_token', accessToken, {
                    expires: 7, // Token expires in 7 days, adjust as needed
                    secure: false, // Use 'true' for HTTPS, false for localhost
                    sameSite: 'Strict',
                });
                Cookies.set('is_verified', isVerified, {
                    expires: 7, // Token expires in 7 days, adjust as needed
                    secure: false, // Use 'true' for HTTPS, false for localhost
                    sameSite: 'Strict',
                });
                // SweetAlert2 for success message
                // After signup success
                Swal.fire({
                    title: `${translate ? translate.pages.signup.titleSuccess : "Registration Successful!"}`,
                    text: `${translate ? translate.pages.signup.titleDescription : ""}`,
                    icon: 'success',
                    confirmButtonText: `${translate ? translate.pages.signup.ok : ""}`,
                }).then(() => {
                    // Store the source in a cookie (or you can store it elsewhere)
                    Cookies.set('source', 'signup');
                    // Redirect to the verify code page
                    router.push(`/${lang}/auth/verify-code?email=${form.email}`);
                });

            } catch (axiosError) {
                // Close loading indicator on error
                Swal.close();
                if (axios.isAxiosError(axiosError)) {
                    if (axiosError.response?.status === 422) {
                        // Show SweetAlert2 alert for email already registered
                        Swal.fire({
                            title: `${translate ? translate.pages.signup.titleFailed : "Registration Failed!"}`,
                            text: `${translate ? translate.pages.signup.titleFailedDescription : "This email is already registered"}`,
                            icon: 'error',
                            confirmButtonText: `${translate ? translate.pages.signup.ok : ""}`,
                        });
                    } else {
                        // Handle other errors
                        console.error("Error", axiosError);
                    }
                }
            }

        } catch (error) {
            // Close loading indicator if validation fails
            Swal.close();
            if (error instanceof ZodError) {
                const fieldErrors: Partial<Record<keyof FormData, string>> = {};

                error.errors.forEach((issue) => {
                    const path = issue.path[0] as keyof FormData;
                    fieldErrors[path] = issue.message;
                });

                setErrors(fieldErrors); // Display errors
            } else {
                console.error("Error", error);
            }
        }
    }

    return (
        <div className='relative grdianBK' style={{ direction: "rtl" }}>
            <div className=' container mx-auto grid grid-cols-1  lg:grid-cols-2 gap-4 items-center'>
                <div className='my-10' style={{ direction: "ltr" }}>
                    <h1 className="text-center font-bold text-2xl md:text-4xl mainColor">
                        {translate ? translate.pages.signup.title : ""}
                    </h1>
                    <form onSubmit={handleSubmit}
                        className="p-4 w-[95%] md:w-[80%] mx-auto z-50 relative">
                        {/* Form Fields */}
                        <div className="mb-4">
                            <label className={`block text-sm font-bold leading-6 mainColor
                                                ${lang === "en" ? 'text-start' : 'text-end'}`
                            }
                            >
                                {translate ? translate.pages.signup.fristName : ""}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className={`block text-sm font-bold leading-6 mainColor
                                                ${lang === "en" ? 'text-start' : 'text-end'}`
                            }>
                                {translate ? translate.pages.signup.email : ""}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className={`block text-sm font-bold leading-6 mainColor
                                                ${lang === "en" ? 'text-start' : 'text-end'}`
                            }>
                                {translate ? translate.pages.signup.phoneNumber : ""}
                            </label>
                            <PhoneInput
                                country={'kw'}
                                value={form.mobile}
                                onChange={handlePhoneChange}
                                inputClass="mt-1 block w-full pl-[52px] pr-[0] py-[20px] border border-gray-300 rounded-md shadow-sm"
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                            />
                            {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                        </div>
                        <div className="mb-4">
                            <label className={`block text-sm font-bold leading-6 mainColor
                                                ${lang === "en" ? 'text-start' : 'text-end'}`
                            }>
                                {translate ? translate.pages.signup.password : ""}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            />
                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label className={`block text-sm font-bold leading-6 mainColor
                                                ${lang === "en" ? 'text-start' : 'text-end'}`
                            }>
                                {translate ? translate.pages.signup.confirmPassword : ""}
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            />
                            {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}
                        </div>
                        <div>
                            <button type="submit" className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg">
                                {translate ? translate.pages.signup.send : ""}
                            </button>
                        </div>
                    </form>
                    <SocialLogin />
                </div>
                <div className='relative hidden lg:block'>
                    <div>
                        <Image src={whiteAuthBk} className='w-full' height={100} alt='authsvg' />
                    </div>
                    <Image src={loginauth} fill className='max-w-[70%] max-h-[50%] m-auto' alt='loginauth' />
                </div>
            </div>
            <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[18px] -right-[76px]'>
                <Image src={flower} fill alt='flowersvg' />
            </div>
        </div>
    )
}

export default SignupForm