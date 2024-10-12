'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import React, { ReactElement } from 'react';
import 'swiper/swiper-bundle.css';
import './style.css'  // i get all css swiper/swiper-bundle.css here


// Define the type for each course item
interface allItem {
    id: number; // Use a specific type for id
    name: string;
    [key: string]: any;
}
// Define props for the component
interface SwiperLibProps {
    children: ReactElement;
    items: allItem[];
    navigation: boolean;
    pagination: boolean;
    slidesPerView: any;
    breakpoints: any
}
const SwiperLib: React.FC<SwiperLibProps> = ({
    children, items, navigation, pagination, slidesPerView, breakpoints }) => {
    const cloneElements = items.map((item) => (
        <SwiperSlide key={item.id}>
            {React.cloneElement(children, { key: item.id, item })}
        </SwiperSlide>

    ));
    return (
        <div className='parentDiv relative'>
            <Swiper
                className="mx-auto container"
                style={{width : "85%"}}
                modules={[Navigation, Pagination, Autoplay]}
                navigation={navigation ? navigation : false}
                pagination={pagination ? pagination : false}
                slidesPerView={slidesPerView ? slidesPerView : 2}
                spaceBetween={5}
                autoplay={{
                    delay: 500000,
                    disableOnInteraction: false,
                }}
                breakpoints={breakpoints ? breakpoints : breakpoints}>
                {cloneElements}
            </Swiper>

        </div>
    );
};

export default SwiperLib;






















// 'use client';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import React, { ReactElement, useRef } from 'react';
// import 'swiper/swiper-bundle.css';
// import './style.css'; // Get all CSS from swiper/swiper-bundle.css

// // Import the SwiperRef type from swiper/react
// import type { Swiper as SwiperInstance, SwiperRef } from 'swiper/react'; 

// // Define the type for each course item
// interface allItem {
//     id: number; // Use a specific type for id
//     name: string;
//     [key: string]: any;
// }

// // Define props for the component
// interface SwiperLibProps {
//     children: ReactElement;
//     items: allItem[];
//     navigation: boolean;
//     pagination: boolean;
//     slidesPerView: number; // Changed to number for clarity
//     breakpoints: any;
// }

// const SwiperLib: React.FC<SwiperLibProps> = ({
//     children,
//     items,
//     navigation,
//     pagination,
//     slidesPerView,
//     breakpoints,
// }) => {
//     // Use the SwiperRef type for the ref
//     const swiperRef = useRef<SwiperRef | null>(null); 
//     // Custom navigation handlers
//     const handleNext = () => {
//         swiperRef.current?.swiper.slideNext(); // Access the slideNext directly from Swiper instance
//     };
//     const handlePrev = () => {
//         swiperRef.current?.swiper.slidePrev(); // Access the slidePrev directly from Swiper instance
//     };



//     const cloneElements = items.map((item) => (
//         <div key={item.id}>
//             <SwiperSlide >
//             {React.cloneElement(children, { key: item.id, item })}
//         </SwiperSlide>
//          {navigation && (
//             <div className="swiper-button-container">
//                 <button className="swiper-button-prev" onClick={handlePrev}>
//                     Prev
//                 </button>
//                 <button className="swiper-button-next" onClick={handleNext}>
//                     Next
//                 </button>
//             </div>
//         )}
//         </div>
//     ));


//     return (
//         <div className='parentDiv'>
//             <Swiper
//                 ref={swiperRef} // Attach the ref to the Swiper
//                 className="mx-auto h-36 container w-[80%]"
//                 modules={[Navigation, Autoplay]}
//                 slidesPerView={slidesPerView || 2}
//                 spaceBetween={5}
//                 autoplay={{
//                     delay: 30000,
//                     disableOnInteraction: false,
//                 }}
//                 breakpoints={breakpoints || breakpoints}
//             >
//                 {cloneElements}
//             </Swiper>

//             {/* {pagination && (
//                 <div className="swiper-pagination-container">
//                     <div className="pagination">
//                         {items.map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => swiperRef.current?.swiper.slideTo(index)} // Access the slideTo directly from Swiper instance
//                             >
//                                 {index + 1}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )} */}
//         </div>
//     );
// };

// export default SwiperLib;
// export type { SwiperRef }; // Export SwiperRef type








// "use client"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'node_modules/swiper/swiper-bundle.min.css';
// import 'node_modules/swiper/modules/pagination.min.css'
// import 'node_modules/swiper/modules/navigation.min.css'
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';


// const SwiperLib = ({ children, coursesItem }: any) => {
//     const cloneCourses = coursesItem.map(el)=> {
//     <SwiperSlide>{React.cloneElement(children, { coursesItem: el, key: el.id })}</SwiperSlide>
// }
// return (
//     <Swiper className=' container mx-auto h-36 bg-red-600'
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         autoplay={{
//             delay: 3000, // Delay between transitions in milliseconds
//             disableOnInteraction: false, // Autoplay will not be disabled after user interactions
//         }}
//         pagination={{ clickable: true }}
//         spaceBetween={50}
//         slidesPerView={4}
//         onSlideChange={() => console.log('slide change')}
//         onSwiper={(swiper) => console.log(swiper)}

//     >


//     </Swiper>
// )
// }

// export default SwiperLib



// "use client"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'node_modules/swiper/swiper-bundle.min.css';
// import 'node_modules/swiper/modules/pagination.min.css'
// import 'node_modules/swiper/modules/navigation.min.css'
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import  { ReactElement } from 'react';
// import React from 'react';

// // Define the type for each course item
// interface CourseItem {
//     id: any;
//     name: string;
//     [key: string]: any; // You can refine this based on the structure of your course items
// }

// // Define props for the component
// interface SwiperLibProps {
//     children: ReactElement;
//     items: CourseItem[];
// }

// const SwiperLib: React.FC<SwiperLibProps> = ({ children, items }) => {
//     // Cloning the children and injecting courseItem into each SwiperSlide
//     const cloneCourses = items.map((item) => (
//         <SwiperSlide key={item.id}>
//           {React.cloneElement(children, { key: item.id, item })}
//         </SwiperSlide>
//       ));

//     return (
//         <Swiper
//             className="container mx-auto h-36 bg-red-600"
//             modules={[Navigation, Pagination, Autoplay]}
//             navigation
//             autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//             }}
//             pagination={{ clickable: true }}
//             spaceBetween={50}
//             slidesPerView={4}
//             onSlideChange={() => console.log('slide change')}
//             onSwiper={(swiper) => console.log(swiper)}
//         >
//             {cloneCourses}
//         </Swiper>
//     );
// };

// export default SwiperLib;
