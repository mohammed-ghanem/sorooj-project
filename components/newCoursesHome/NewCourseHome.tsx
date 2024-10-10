"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'node_modules/swiper/swiper-bundle.min.css';
import 'node_modules/swiper/modules/pagination.min.css'
import 'node_modules/swiper/modules/navigation.min.css'
import { Navigation , Pagination , Autoplay } from 'swiper/modules';


const NewCourseHome = () => {
    return (
        <Swiper className=' container mx-auto bg-red-600'
            modules={[Navigation , Pagination , Autoplay]}
            navigation
            autoplay={{
                delay: 3000, // Delay between transitions in milliseconds
                disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            }}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide className=' bg-black text-white'>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide className=' bg-black text-white'>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide className=' bg-black text-white'>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide className=' bg-black text-white'>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide className=' bg-black text-white'>Slide 9</SwiperSlide>

        </Swiper>
    )
}

export default NewCourseHome