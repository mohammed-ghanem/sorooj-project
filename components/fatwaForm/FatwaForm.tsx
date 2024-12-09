"use client"
import Image from "next/image"
import fatwaIcon from '@/public/assets/images/fatwaIcon.svg'
import fatwaFlower from '@/public/assets/images/fatwa.svg'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';



const FatwaForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleOk = async (e: any) => {
    e.preventDefault();
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
    <section className='my-14 relative container mx-auto sm:w-[95%] md:w-[80%] flex flex-wrap-reverse lg:grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-2 items-center bkMainColor rounded-[10px] overflow-hidden'>
      <div className=" py-10 relative z-40 col-span-2 w-[95%] md:w-[80%] mx-auto">
        <div className="mb-5 text-white font-bold">
          <h5>هل تريد طلب فتوى !  </h5>
          <p className="my-4">نحن فى انتظارك , يسعدنا مساعدتك </p>
        </div>
        <form onSubmit={handleOk}>
          <div className="grid grid-cols-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="الاسم"
              className="block w-full rounded-md border-0 py-2 pr-2
             shadow-sm ring-1 ring-inset 
            ring-white placeholder:mainColor focus:ring-2 focus:outline-none
            sm:text-sm sm:leading-6 bkColor mainColor font-bold"

            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="ادخل رسالتك"
            className="block w-full rounded-md border-0 py-1.5 h-[180px] my-4 pr-2 
             shadow-sm ring-1 ring-inset
             ring-white placeholder:mainColor focus:ring-2 focus:outline-none
             sm:text-sm sm:leading-6 bkColor mainColor font-bold">

          </textarea>
          <button
            type="submit"
            className='bkBox primaryColor font-bold px-[20px] py-[10px] rounded-[6px] mt-5 block mx-auto font-cairo'
          >
            إرسال
          </button>

        </form>
      </div>
      <div className='relative h-full bkColor rounded-tl-none rounded-br-[235px] rounded-tr-none md:rounded-tr-[235px] rounded-bl-[200px] md:rounded-bl-none w-full mr-auto'>
        <Image className="m-auto text-transparent relative md:absolute h-full w-full max-w-[75%] md:max-w-[90%] left-0"
          src={fatwaIcon}
          alt="fatwaIcon" />
      </div>
      <div className="absolute right-0 bottom-0">
        <Image src={fatwaFlower} alt="flower" />
      </div>
    </section>
  )
}

export default FatwaForm