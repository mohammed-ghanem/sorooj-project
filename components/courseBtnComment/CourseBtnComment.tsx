import { useState } from 'react';
import { Modal } from 'antd';

const CourseBtnComment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (!name || !comment || rating === 0) {
            alert('Please fill in all fields and select a rating');
            return;
        }
        // Handle form submission (e.g., send data to server)
        console.log('Submitted values:', { name, comment, rating });
        setName('');
        setComment('');
        setRating(0);
        setIsModalOpen(false);
    };

    const handleRatingClick = (value: number) => {
        setRating(value);
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
                                className={`cursor-pointer text-5xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400 hover:ease-in duration-300'}`}
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

export default CourseBtnComment;