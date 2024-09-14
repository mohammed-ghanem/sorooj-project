'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { z, ZodError } from 'zod'
import Swal from 'sweetalert2'
import { axiosDefaultConfig, axiroWithCredentials } from '@/app/utils/axiosConfig'

axiroWithCredentials;
axiosDefaultConfig;

// Zod schema for validation
const SignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
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

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePhoneChange = (value: string) => {
        setForm({ ...form, mobile: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
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

                console.log("Success", response.data);

                // SweetAlert2 for success message
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'You will be redirected to the home page.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "/"
                });

            } catch (axiosError) {
                if (axios.isAxiosError(axiosError)) {
                    if (axiosError.response?.status === 400) {
                        // Show SweetAlert2 alert for email already registered
                        Swal.fire({
                            title: 'Registration Failed',
                            text: 'This email is already registered. Please use another email.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        // Handle other errors
                        console.error("Error", axiosError);
                    }
                }
            }

        } catch (error) {
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
        <div className='w-1/2 mx-auto my-10' style={{"direction" : "ltr"}}>
            <form className="bg-slate-400 p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
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
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                    <PhoneInput
                        country={'kw'}
                        value={form.mobile}
                        onChange={handlePhoneChange}
                        inputClass="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true
                        }}
                    />
                    {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm


