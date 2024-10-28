'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { axiosDefaultConfig, axiroWithCredentials } from '@/utils/axiosConfig'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import Image from 'next/image'
import whiteAuthBk from '@/assets/images/Vector.svg'
import loginauth from '@/assets/images/loginauth.svg'
import flower from '@/assets/images/flower.svg'
import SocialLogin from '../socialLogin/SocialLogin'
//import TranslateHook from '@/components/translate/TranslateHook'



axiroWithCredentials;
axiosDefaultConfig;


interface LoginFormData {
    email: string
    password: string
}

const SignInForm = () => {

    const { lang }: { lang?: string } = useParams(); // Access dynamic [lang] parameter
    const [mounted, setMounted] = useState<boolean>(false);

    const [form, setForm] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const router = useRouter(); // Use Next.js router for navigation

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Step 1: Get the CSRF token from the backend
            await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
                withCredentials: true,
            });

            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            // Step 2: Make the login request
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/login`, form, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                },
                withCredentials: true,
            });

            // Extract necessary fields from the response
            const accessToken = response.data.data.access_token;
            const isVerified = response.data.data.user.is_verified;

            // Step 3: Check if the user is verified
            if (!isVerified) {
                Swal.fire({
                    title: 'Account Not Verified',
                    text: 'Please verify your account before logging in.',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                return;
            }

            // Store the access token securely in cookies instead of localStorage
            Cookies.set('access_token', accessToken, { expires: 7 }); // Expires in 7 days (optional)

            // Show success message and redirect
            Swal.fire({
                title: 'Login Successful!',
                text: 'You will be redirected to the home page.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `/${lang}/`
                // router.push("/"); // Redirect to the homepage after login
            });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setErrors('Invalid email or password');
                    Swal.fire({
                        title: 'Login Failed',
                        text: 'Invalid email or password. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else if (error.response?.status === 401) {
                    // Resend verification code
                    try {
                        // Show success message with SweetAlert2
                        Swal.fire({
                            title: 'Account Not Verified',
                            text: 'A new verification code has been sent to your email. Please verify your account.',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            //Redirect to the verify code page
                            router.push(`/${lang}/auth/resend-otp`);
                        });
                    } catch (resendError) {
                        console.error("Error resending verification code", resendError);
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to resend verification code. Please try again later.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                } else if (error.code === 'ERR_NETWORK') {
                    Swal.fire({
                        title: 'Network Error',
                        text: 'Please check your network connection and try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Something went wrong. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                console.error("Error", error);
            }
        }
    };
    useEffect(() => {
        setMounted(true); // Ensure the component is mounted before accessing params
    }, []);

    if (!mounted) return null; // Avoid rendering before the component is mounted


    // 
    // const dictionary = TranslateHook()
    
    // console.log(dictionary)
    
    return (
        <div className='relative grdianBK'>
            <div className=' container mx-auto grid grid-cols-1  lg:grid-cols-2 gap-4 items-center'>
                <div className='my-10' style={{ direction: "ltr" }}>
                    <h1 className='text-center font-bold text-4xl mainColor'>تسجيل الدخول</h1>
                    <form className="p-4 w-[95%] md:w-[80%] mx-auto z-50 relative" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-end text-sm font-bold leading-6 mainColor "
                            >البريد الالكترونى</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            />
                            {errors && <p className="text-red-500">{errors}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-end text-sm font-bold leading-6 mainColor">
                                كلمة المرور </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            />
                            {errors && <p className="text-red-500">{errors}</p>}
                        </div>
                        <Link href={`/${lang}/auth/forget-password`} className='border-b border-regal-blue'>
                            هل نسيت كلمة المرور ؟
                        </Link>
                        <div>
                            <button type="submit" className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg">
                                تسجيل الدخول
                            </button>
                        </div>
                        <div className='mt-2 text-center'>
                            <span >ليس لديك حساب ؟   </span>

                            <Link href={`/${lang}/auth/signup`} className='border-b border-regal-blue'>انشاء حساب</Link>
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

            <div className=' absolute w-[424px] h-[300px] -top-[18px] -right-[76px]'>
                <Image src={flower} fill alt='flowersvg' />
            </div>

        </div>
    );
}

export default SignInForm;



