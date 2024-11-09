'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie library
import Image from 'next/image'
import whiteAuthBk from '@/assets/images/Vector.svg'
import fogetPass from '@/assets/images/forget.svg';
import TranslateHook from '../../translate/TranslateHook'
import LangUseParams from "@/components/translate/LangUseParams"
import FlowerImg from '@/components/flowerImg/FlowerImg';
const ResendOtp = () => {
    const [email, setEmail] = useState<string>(''); // State to hold the email input
    const [errors, setErrors] = useState<string | null>(null);
    const router = useRouter();
    // lang param (ar Or en)
    const lang = LangUseParams() // Access dynamic [lang] parameter
    const translate = TranslateHook();

    // Handle email input change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors(null); // Clear previous errors

        try {
            // Make a request to resend the OTP
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/send-otp`, {
                email, // Send the email as payload
            });
            // Extract the access token from the response
            const accessToken = response.data.access_token;
            // Save the access token in cookies
            Cookies.set('access_token', accessToken);
            // Show success message with SweetAlert2
            Swal.fire({
                title: `${translate ? translate.pages.EmailForOtp.otpSenttitle : "OTP Sent"}`,
                text: `${translate ? translate.pages.EmailForOtp.otpSenttext : "OTP has been sent to your email , success !!"}`,
                icon: 'success',
                confirmButtonText: `${translate ? translate.pages.EmailForOtp.ok : "ok"}`,
            }).then(() => {
                // Save the source (optional)
                Cookies.set('source', 'resend-otp'); // Save the source in cookies

                // Redirect to the verify code page with the email as a query parameter
                router.push(`/${lang}/auth/verify-code?email=${email}`);
            });
        } catch (error) {
            // Handle errors and show SweetAlert2 messages
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setErrors('Invalid email format');
                    Swal.fire({
                        title: `${translate ? translate.pages.EmailForOtp.InvalidEmail : "Invalid email"}`,
                        text: `${translate ? translate.pages.EmailForOtp.faildOtp : "Please enter a valid email address."}`,
                        icon: 'error',
                        confirmButtonText: `${translate ? translate.pages.EmailForOtp.ok : "ok"}`
                    });
                } else if (error.response?.status === 401) {
                    setErrors('Unauthorized. Please check your email.');
                    Swal.fire({
                        title: `${translate ? translate.pages.EmailForOtp.UnauthorizedTitle : "Unauthorized"}`,
                        text: `${translate ? translate.pages.EmailForOtp.UnauthorizedText : "Please check your email or contact support."}`,
                        icon: 'error',
                        confirmButtonText: `${translate ? translate.pages.EmailForOtp.ok : "ok"}`
                    });
                } else {
                    setErrors('An unexpected error occurred.');
                    Swal.fire({
                        text: `${translate ? translate.pages.EmailForOtp.error : "error"}`,
                        icon: 'error',
                        confirmButtonText: `${translate ? translate.pages.EmailForOtp.ok : "ok"}`
                    });
                }
            } else {
                console.error("Error", error);
            }
        }
    };

    return (
        <div className="relative grdianBK overflow-hidden" style={{ direction: "rtl" }}>
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                <div className="my-10" style={{ direction: "ltr" }}>
                    <div>
                        <h1 className="text-center font-bold text-2xl md:text-4xl mainColor">
                            {translate ? translate.pages.EmailForOtp.title : ""}
                        </h1>
                        <p className="text-center mt-3 mainColor text-lg md:text-2xl">
                            {translate ? translate.pages.EmailForOtp.titleDescription : ""}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}
                        className="p-4 w-[95%] md:w-[80%] mx-auto z-50 relative my-6">
                        <div className="mb-4">
                            <label
                                className={`block text-sm font-bold leading-6 mainColor mb-3 ${lang === "en" ? 'text-start' : 'text-end'}`}>
                                {translate ? translate.pages.EmailForOtp.email : "البريد الالكترونى"}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            />
                            {errors && <p className="text-red-500">{errors}</p>}
                        </div>
                        <div>
                            <button type="submit" className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg">
                                {translate ? translate.pages.EmailForOtp.send : "ارسال"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="relative hidden lg:block">
                    <Image src={whiteAuthBk} className="w-full" height={100} alt="authsvg" />
                    <Image src={fogetPass} fill className="max-w-[70%] max-h-[50%] m-auto" alt="loginauth" />
                </div>
            </div>
            <FlowerImg />
        </div>

    );
};

export default ResendOtp;


// 'use client'
// import { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useRouter } from 'next/navigation';

// const ResendOtp = () => {
//     const [email, setEmail] = useState<string>(''); // State to hold the email input
//     const [errors, setErrors] = useState<string | null>(null);
//     const router = useRouter();

//     // Handle email input change
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value);
//     };

//     // Handle form submission
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setErrors(null); // Clear previous errors

//         try {
//             // Make a request to resend the OTP
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/send-otp`, {
//                 email, // Send the email as payload
//             });
//             // Extract the access token from the response
//             const accessToken = response.data.access_token;
//             // Save the access token in localStorage
//             localStorage.setItem('access_token', accessToken);

//             // Show success message with SweetAlert2
//             Swal.fire({
//                 title: 'OTP Sent',
//                 text: 'A new verification code has been sent to your email.',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             }).then(() => {
//                 // Save the source (optional)
//                 localStorage.setItem('source', 'resend-otp');

//                 // Redirect to the verify code page with the email as a query parameter
//                 router.push(`/auth/verify-code?email=${email}`);
//             });
//         } catch (error) {
//             // Handle errors and show SweetAlert2 messages
//             if (axios.isAxiosError(error)) {
//                 if (error.response?.status === 422) {
//                     setErrors('Invalid email format');
//                     Swal.fire({
//                         title: 'Invalid Email',
//                         text: 'Please enter a valid email address.',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 } else if (error.response?.status === 401) {
//                     setErrors('Unauthorized. Please check your email.');
//                     Swal.fire({
//                         title: 'Unauthorized',
//                         text: 'Please check your email or contact support.',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 } else {
//                     setErrors('An unexpected error occurred.');
//                     Swal.fire({
//                         title: 'Error',
//                         text: 'Something went wrong. Please try again later.',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 }
//             } else {
//                 console.error("Error", error);
//             }
//         }
//     };

//     return (
//         <div className="w-1/2 mx-auto my-10" style={{ "direction": "ltr" }}>
//             <form className="bg-slate-400 p-4" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                         Email address
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={email}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                     />
//                     {errors && <p className="text-red-500">{errors}</p>}
//                 </div>
//                 <div>
//                     <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
//                         Resend OTP
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ResendOtp;
