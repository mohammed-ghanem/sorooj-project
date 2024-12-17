'use client';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LangUseParams from '../translate/LangUseParams';

const SubscribeForm = () => {
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState(false);
    const lang = LangUseParams(); // Access dynamic [lang] parameter

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى إدخال بريدك الإلكتروني!',
            });
            return;
        }

        setLoading(true);

        try {
            await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
                withCredentials: true, // Ensure credentials (cookies) are sent
            });

            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
            // Step 2: Make the signup request after CSRF token is set
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/add-subscriber`,
                { email }, // Payload should be sent as an object
                {
                    headers: {
                        'X-XSRF-TOKEN': csrfToken,
                    },
                    withCredentials: true, // Ensure cookies are sent
                }
            );

            // Close loading indicator upon success
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: lang === 'ar' ? 'تم الاشتراك بنجاح' : 'successfully!',
                text: lang === 'ar' ? 'سوف يصلك كل ما هو جديد شكرا لك' : 'thank you.',
            });

            // Reset form on success
            setEmail('');
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h4 className="mainColor font-bold mr-3 lg:mr-0">اضف بريدك الالكترونى ليصلك كل جديد :</h4>
            <form onSubmit={handleSubmit} className="mt-5 relative" style={{ direction: 'rtl' }}>
                <div className="mb-4">
                    <input
                        placeholder="ادخل بريدك الالكترونى"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 px-3 py-3 block w-full rounded-3xl border-gray-300 shadow-sm sm:text-sm focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="absolute bkPrimaryColor text-white focus:outline-none top-[0] left-[0] px-[40px] py-[12px] md:py-[10px] rounded-[30px]"
                    disabled={loading}
                >
                    {loading ? 'جار الإرسال...' : 'ارسال'}
                </button>
            </form>
        </div>
    );
};

export default SubscribeForm;