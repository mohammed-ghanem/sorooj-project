import { useState } from 'react';
import { Modal } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from "js-cookie" // Import the js-cookie library

const BookBtnComment = ({ bookDetails }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stars, setStars] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const book_id = bookDetails.id; // Assuming 'id' is the unique identifier for each course in the courseDetails object
    const token = Cookies.get('access_token');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!name || !comment || stars === 0) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى ملء جميع الحقول واختيار تقييم',
            });
            return;
        }

        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'غير مسجل',
                text: 'يرجى تسجيل الدخول أولاً لتتمكن من التعليق',
            });
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/add-comment/${book_id}`,
                { name, comment, stars },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            Swal.fire({
                icon: 'success',
                title: 'تم الإرسال',
                text: 'تم إضافة تعليقك بنجاح!',
            });

            // Reset form fields
            setName('');
            setComment('');
            setStars(0);
            setIsModalOpen(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'حدث خطأ أثناء إرسال تعليقك. يرجى المحاولة مرة أخرى لاحقاً.',
            });
            console.error(error);
        }
    };

    const handleRatingClick = (value: number) => {
        setStars(value);
    };

    return (
        <>
            <button
                onClick={showModal}
                className='bkMainColor text-white px-[20px] py-[10px] rounded-[6px] mt-5'>
                اضف تعليقك
            </button>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <h6 className='text-center font-bold font-cairo mainColor text-xl mb-4'>اضف تعليقك</h6>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div className='startParent'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => handleRatingClick(star)}
                                className={`cursor-pointer text-5xl ${star <= stars ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400 hover:ease-in duration-300'}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label className='block mb-2 mainColor font-cairo font-bold'>الاسم</label>
                    <input
                        type="text"
                        placeholder=" "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none'
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label className='block mb-2 mainColor font-cairo font-bold'>اضف تعليقك</label>
                    <textarea
                        placeholder=" "
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none'
                    />
                </div>
                <button
                    key="submit"
                    onClick={handleOk}
                    className='bkPrimaryColor text-white px-[20px] py-[10px] rounded-[6px] mt-5 block mx-auto font-cairo'
                >
                    إرسال
                </button>
            </Modal>
        </>
    );
};
export default BookBtnComment