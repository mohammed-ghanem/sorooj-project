'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie library

const ResendOtp = () => {
    const [email, setEmail] = useState<string>(''); // State to hold the email input
    const [errors, setErrors] = useState<string | null>(null);
    const router = useRouter();

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
                title: 'OTP Sent',
                text: 'A new verification code has been sent to your email.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Save the source (optional)
                Cookies.set('source', 'resend-otp'); // Save the source in cookies

                // Redirect to the verify code page with the email as a query parameter
                router.push(`/auth/verify-code?email=${email}`);
            });
        } catch (error) {
            // Handle errors and show SweetAlert2 messages
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setErrors('Invalid email format');
                    Swal.fire({
                        title: 'Invalid Email',
                        text: 'Please enter a valid email address.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else if (error.response?.status === 401) {
                    setErrors('Unauthorized. Please check your email.');
                    Swal.fire({
                        title: 'Unauthorized',
                        text: 'Please check your email or contact support.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    setErrors('An unexpected error occurred.');
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
        <div className="w-1/2 mx-auto my-10" style={{ "direction": "ltr" }}>
            <form className="bg-slate-400 p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors && <p className="text-red-500">{errors}</p>}
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Resend OTP
                    </button>
                </div>
            </form>
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
