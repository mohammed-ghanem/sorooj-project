'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import React, { ReactElement } from 'react';
import 'node_modules/swiper/swiper-bundle.min.css';
import 'node_modules/swiper/modules/pagination.min.css';
import 'node_modules/swiper/modules/navigation.min.css';


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



const SwiperLib: React.FC<SwiperLibProps> = ({ children, items , navigation , pagination ,slidesPerView , breakpoints }) => {
    const cloneElements = items.map((item) => (
        <SwiperSlide key={item.id}>
            {React.cloneElement(children, { key: item.id, item })}
        </SwiperSlide>
    ));

    return (
        <Swiper
            className="container mx-auto h-36"
            modules={[Navigation, Pagination, Autoplay]}
            navigation={navigation ? navigation : false}
            pagination={pagination ? pagination : false}
            slidesPerView ={slidesPerView ? slidesPerView : 2}
            spaceBetween={50}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints = {breakpoints ? breakpoints : breakpoints}
           
            //********************************* */ 
            

            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {cloneElements}
        </Swiper>
    );
};

export default SwiperLib;











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
