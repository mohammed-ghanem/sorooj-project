'use client';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';

const SubscribeForm = () => {
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState(false);
    const lang = LangUseParams(); // Access dynamic [lang] parameter
    const translate = TranslateHook();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: lang === 'ar' ? 'خطأ' : 'error!',
                text: lang === 'ar' ? 'يرجى إدخال بريدك الإلكتروني!' : 'Please Enter Your Email ',
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
        } catch (axiosError) {
            // Close loading indicator on error
            Swal.close();
            if (axios.isAxiosError(axiosError)) {
                if (axiosError.response?.status === 422) {
                    // Show SweetAlert2 alert for email already registered
                    Swal.fire({
                        title: `${translate ? translate.pages.signup.titleFailed : "Registration Failed!"}`,
                        text: `${translate ? translate.pages.homePage.footer.alreadySubscribed : ""}`,
                        icon: 'error',
                        confirmButtonText: `${translate ? translate.pages.signup.ok : ""}`,
                    });
                } else {
                    // Handle other errors
                    console.error("Error", axiosError);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h4 className={`mainColor font-bold mr-3 lg:mr-0`}>
                {translate ? translate.pages.homePage.footer.subscribers : "اضف بريدك الالكترونى ليصلك كل جديد"}

            </h4>
            <form onSubmit={handleSubmit} className={`mt-5 relative
            
            `}
                style={{ direction: lang === "en" ? "ltr" : "rtl" }}
            >
                <div className="mb-4">
                    <input
                        placeholder={`${translate
                            ?
                            translate.pages.homePage.footer.placeHolder
                            : "البريد الالكتورنى"}
                            `}
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
                    className={`absolute bkPrimaryColor
                         text-white
                         focus:outline-none top-[0]
                         px-[40px] py-[12px] md:py-[10px] rounded-[30px]
                         ${lang === "en" ? " right-[0]" : " left-[0]"}
                         
                         `}
                    disabled={loading}
                >
                    {loading
                        ?
                        `${translate
                            ?
                            translate.pages.homePage.footer.loading
                            : "جار الارسال ..."}
                            `                                    :
                        `${translate
                            ?
                            translate.pages.homePage.footer.submit
                            : "ارسال"}
                            `                    }
                </button>
            </form>
        </div>
    );
};

export default SubscribeForm;