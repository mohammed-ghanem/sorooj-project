'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
//import { useRouter } from 'next/navigation'  // For redirection with Next.js



axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
});


interface LoginFormData {
    email: string
    password: string
}

const SignInForm = () => {
    const [form, setForm] = useState<LoginFormData>({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState<string | null>(null)
    //const router = useRouter(); // Next.js navigation hook for redirection

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            // Step 1: Make a request to get the CSRF token from the backend
            await axios.get('https://backend-sorooj.wecandev.online/sanctum/csrf-cookie', {
                withCredentials: true, // Ensure credentials (cookies) are sent
            });

            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];


            // Step 2: Make the signup request after CSRF token is set
            const response = await axios.post("https://backend-sorooj.wecandev.online/client-api/v1/auth/login", form, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                },
                withCredentials: true, // Make sure to include cookies in the request
            });
            // Correct token destructuring
            const accessToken = response.data.data.access_token; // Assuming the backend returns the token here

            // Store the token securely in localStorage
            localStorage.setItem('access_token', accessToken);

            Swal.fire({
                title: 'Login Successful!',
                text: 'You will be redirected to the home page.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "/"
                // router.push('/'); // Redirect to home page after alert confirmation
            });

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setErrors('Invalid email or password');
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error("Error", error);
            }
        }
    }

    return (
        <div className='w-1/2 mx-auto my-10' style={{ "direction": "ltr" }}>
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
        </div>
    )
}

export default SignInForm

// 'use client'

// import { useState, ChangeEvent, FormEvent } from 'react'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// //import { useRouter } from 'next/navigation'  // For redirection with Next.js

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
//     //const router = useRouter(); // Next.js navigation hook for redirection

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:5005/login", form)
//             const { accessToken } = response.data; // Assuming the backend returns the token in this field

//             // Store the token securely, e.g., in localStorage or sessionStorage
//             localStorage.setItem('accessToken', accessToken);

//             Swal.fire({
//                 title: 'Login Successful!',
//                 text: 'You will be redirected to the home page.',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             }).then(() => {
//                 window.location.href = "/"
//                 // router.push('/'); // Redirect to home page after alert confirmation
//             });

//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response?.status === 401) {
//                 setErrors('Invalid email or password');
//                 Swal.fire({
//                     title: 'Login Failed',
//                     text: 'Invalid email or password. Please try again.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             } else {
//                 console.error("Error", error);
//             }
//         }
//     }

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
//         </div>
//     )
// }

// export default SignInForm
