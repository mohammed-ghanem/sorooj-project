'use client';

import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import LangUseParams from '../translate/LangUseParams';
import { fetchBooksHome } from '@/utils/fetchBooksHome';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css';
import './style.css'
import BooksCard from '../booksCard/BooksCard';
import { useRouter } from 'next/navigation';


const NewBookHome = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const lang = LangUseParams();
  const router = useRouter();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooksHome(); // Reuse the exported function
        setBooks(booksData);
       
      } catch (err: any) {
        setError(err.message);
        
      }
    };

    loadBooks();
  }, []);

  const handleNavigation = (path: string) => {
   
    router.push(path);
  };

 
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="parentDiv relative" style={{ "direction": "rtl" }}>
     
      <Swiper
        className="mx-auto container"
        style={{ width: "80%" }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10} // Set space between slides
        slidesPerView={3} // Adjust the number of slides visible at once
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {   // Mobile
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {   // Small screens
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {   // Medium screens (tablets)
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1024: {  // Larger screens (desktops)
            slidesPerView: 3,
            spaceBetween: 14,
          },
          1440: {  // Larger screens (desktops)
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div onClick={() => handleNavigation(`/${lang}/books/${book.slug}`)}>
              <BooksCard
                imgSrc={book.image}
                watchNumber={book.view_count}
                datePublish={book.publish_date}
                bookTitle={book.book_name}
                doctorName={book.author_name}
                descriptionBook={book.brief_description}
                pathLinkToContent={`/${lang}/books/${book.slug}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default NewBookHome