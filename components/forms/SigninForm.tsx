'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { axiosDefaultConfig, axiroWithCredentials } from '@/utils/axiosConfig'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

axiroWithCredentials;
axiosDefaultConfig;

interface LoginFormData {
    email: string
    password: string
}

const SignInForm = () => {
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
               window.location.href = "/"
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
                            router.push(`/auth/resend-otp`);
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

    return (
        <div className='w-1/2 mx-auto my-10' style={{ direction: "ltr" }}>
            <form className="bg-slate-400 p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors && <p className="text-red-500">{errors}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors && <p className="text-red-500">{errors}</p>}
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Login
                    </button>
                </div>
            </form>
            <Link href={`/auth/forget-password`}>Forget password</Link>
            <Link href={`/auth/signup`}>Create new account</Link>
        </div>
    );
}

export default SignInForm;


// 'use client'
// import { useState, ChangeEvent, FormEvent } from 'react'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { axiosDefaultConfig, axiroWithCredentials } from '@/app/utils/axiosConfig'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'


// axiroWithCredentials;
// axiosDefaultConfig;

// interface LoginFormData {
//     email: string
//     password: string
// }


// const SignInForm = () => {
//     const [form, setForm] = useState<LoginFormData>({
//         email: '',
//         password: ''
//     })

//     const [errors, setErrors] = useState<string | null>(null)

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }
//     const router = useRouter() // Use Next.js router for navigation
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
    
//         try {
//             // Step 1: Get the CSRF token from the backend
//             await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
//                 withCredentials: true,
//             });
    
//             const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
//                 ?.split('=')[1];
    
//             // Step 2: Make the login request
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/login`, form, {
//                 headers: {
//                     'X-XSRF-TOKEN': csrfToken,
//                 },
//                 withCredentials: true,
//             });
//     console.log(response)
//             // Extract necessary fields from the response
//             const accessToken = response.data.data.access_token;
//             const isVerified = response.data.data.user.is_verified;
    
//             // Step 3: Check if the user is verified
//             if (!isVerified) {
//                 Swal.fire({
//                     title: 'Account Not Verified',
//                     text: 'Please verify your account before logging in.',
//                     icon: 'warning',
//                     confirmButtonText: 'OK'
//                 });
//                 return;
//             }
    
//             // Store the access token securely in localStorage
//             localStorage.setItem('access_token', accessToken);
    
//             // Show success message and redirect
//             Swal.fire({
//                 title: 'Login Successful!',
//                 text: 'You will be redirected to the home page.',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             }).then(() => {
//                 window.location.href = "/"
//             });
    
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 if (error.response?.status === 422) {
//                     setErrors('Invalid email or password');
//                     Swal.fire({
//                         title: 'Login Failed',
//                         text: 'Invalid email or password. Please try again.',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 } else if (error.response?.status === 401) {
//                     // Resend verification code
//                     try {                
//                         // Show success message with SweetAlert2
//                         Swal.fire({
//                             title: 'Account Not Verified',
//                             text: 'A new verification code has been sent to your email. Please verify your account.',
//                             icon: 'warning',
//                             confirmButtonText: 'OK'
//                         }).then(() => {
//                             //Redirect to the verify code page with email query parameter
//                             //localStorage.setItem('source', 'signin');
//                             //Redirect to the verify code page
                            
//                             router.push(`/auth/resend-otp`);
//                         });
//                     } catch (resendError) {
//                         console.error("Error resending verification code", resendError);
//                         Swal.fire({
//                             title: 'Error',
//                             text: 'Failed to resend verification code. Please try again later.',
//                             icon: 'error',
//                             confirmButtonText: 'OK'
//                         });
//                     }
//                 }
//                 else if (error.code === 'ERR_NETWORK') {
//                     Swal.fire({
//                         title: 'Network Error',
//                         text: 'Please check your network connection and try again.',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 } else {
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
//         <div className='w-1/2 mx-auto my-10' style={{ "direction": "ltr" }}>
//             <form className="bg-slate-400 p-4" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                     />
//                     {errors && <p className="text-red-500">{errors}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                     />
//                     {errors && <p className="text-red-500">{errors}</p>}
//                 </div>
//                 <div>
//                     <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
//                         Login
//                     </button>
//                 </div>
//             </form>
//             <Link href={'/auth/forget-password'}>forget password</Link>
//             <Link href={'/auth/signup'}>create new account</Link>
//         </div>
//     )
// }

// export default SignInForm

