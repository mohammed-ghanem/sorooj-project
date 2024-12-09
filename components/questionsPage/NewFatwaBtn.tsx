import { useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const NewFatwaBtn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        // Check for token in cookies
        const token = Cookies.get('access_token');
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'غير مسجل',
                text: 'يرجى تسجيل الدخول أولاً لتتمكن من ارسال',
                confirmButtonText: 'تم',
                confirmButtonColor: '#424C61',
            });
            return;
        }
        // Validate input
        if (!name || !message) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى ملء جميع الحقول  ',
            });
            return;
        }
        // API Call
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/add-fatwa`, // API endpoint
                { name, message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token in header
                    },
                }
            );
            // Success alert
            Swal.fire({
                icon: 'success',
                title: 'تم الإرسال',
                text: 'تم اضافة استفسارك بنجاح واصبح قيد المراجعة برجاء انتظار الرد قريبا',
                confirmButtonText: 'تم',
                confirmButtonColor: '#424C61',
            });
            // Clear form and close modal
            setName('');
            setMessage('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting request:', error);
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'حدث خطأ أثناء إرسال تعليقك. يرجى المحاولة مرة أخرى لاحقاً.',
            });
        }
    };
    return (
        <>
            <button
                onClick={showModal}
                className='bkMainColor text-white px-[20px] py-[10px] rounded-[6px] mt-5'>
                طلب فتوى جديد
            </button>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <h6 className='text-center font-bold font-cairo mainColor text-xl mb-4'>طلب فتوى</h6>
                <div style={{ marginBottom: '16px' }}>
                    <label className='block mb-2 mainColor font-cairo font-bold'>الاسم</label>
                    <input
                        type="text"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none'
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label className='block mb-2 mainColor font-cairo font-bold'>اضف تعليقك</label>
                    <textarea
                        placeholder=" "
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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

export default NewFatwaBtn;




// import { useState } from 'react';
// import { Modal } from 'antd';

// const NewFatwaBtn = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [rating, setRating] = useState(0);
//     const [name, setName] = useState('');
//     const [comment, setComment] = useState('');

//     const showModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleOk = () => {
//         if (!name || !comment || rating === 0) {
//             alert('Please fill in all fields and select a rating');
//             return;
//         }
//         // Handle form submission (e.g., send data to server)
//         console.log('Submitted values:', { name, comment, rating });
//         setName('');
//         setComment('');
//         setRating(0);
//         setIsModalOpen(false);
//     };

//     const handleRatingClick = (value: number) => {
//         setRating(value);
//     };

//     return (
//         <>
//             <button
//                 onClick={showModal}
//                 className='bkMainColor text-white px-[20px] py-[10px] rounded-[6px] mt-5'>
//                  طلب فتوى جديد
//             </button>
//             <Modal
//                 open={isModalOpen}
//                 onCancel={() => setIsModalOpen(false)}
//                 footer={null}

//             >
//                 <h6 className='text-center font-bold font-cairo mainColor text-xl mb-4'>طلب فتوى</h6>
//                 <div style={{ marginBottom: '16px' }}>
//                     <label className='block mb-2 mainColor font-cairo font-bold'>الاسم</label>
//                     <input
//                         type="text"
//                         placeholder=" "
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none'
//                     />
//                 </div>

//                 <div style={{ marginBottom: '16px' }}>
//                     <label className='block mb-2 mainColor font-cairo font-bold'>اضف تعليقك</label>
//                     <textarea
//                         placeholder=" "
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         rows={4}
//                         className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none'
//                     />
//                 </div>
//                 <button
//                     key="submit"
//                     onClick={handleOk}
//                     className='bkPrimaryColor text-white px-[20px] py-[10px] rounded-[6px] mt-5 block mx-auto font-cairo'
//                 >
//                     إرسال
//                 </button>
//             </Modal>
//         </>
//     );
// };

// export default NewFatwaBtn;

