'use client'
import { useState } from 'react';

const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <p className="text-white">اضف بريدك الالكترونى ليصلك كل جديد : </p>
            <form onSubmit={handleSubmit} className="mt-5 relative">
                <div className="mb-4">
                    <input
                        placeholder='ادخل بريدك الالكترونى'
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 px-3 py-3 block w-full rounded-3xl border-gray-300 shadow-sm sm:text-sm focus:outline-none" />
                </div>
                <button
                    type="submit"
                    className=" absolute bkPrimaryColor text-white rounded-md focus:outline-none top-[0] left-[0] px-[20px] py-[10px] rounded-tl-[30px] rounded-br-none rounded-tr-none rounded-bl-[30px]"
                >
                    ارسال
                </button>
                {submitted && (
                    <p className="mt-3 text-green-500 text-center">
                        Thank you for subscribing!
                    </p>
                )}
                {error && (
                    <p className="mt-3 text-red-500 text-center">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default SubscribeForm;
