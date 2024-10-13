'use client'

import { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import React, { ReactElement } from 'react';
import 'swiper/swiper-bundle.css';
import './style.css';  // Assuming you have your styles here

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
    breakpoints: any;
}

const SwiperLib: React.FC<SwiperLibProps> = ({
    children, items, navigation, pagination, slidesPerView, breakpoints
}) => {
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate an API call or data loading
        const fetchData = async () => {
            setLoading(true); // Start loading

            // Simulate loading delay (replace with real API call if needed)
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

            setLoading(false); // Stop loading after data is ready
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    const cloneElements = items.map((item) => (
        <SwiperSlide key={item.id}>
            {React.cloneElement(children, { key: item.id, item })}
        </SwiperSlide>
    ));

    if (loading) {
        return <div className="text-center py-10">Loading Swiper...</div>; // Show loading state
    }

    return (
        <div className="parentDiv relative">
            <Swiper
                className="mx-auto container"
                style={{ width: "80%" }}
                modules={[Navigation, Pagination, Autoplay]}
                navigation={navigation ? navigation : false}
                pagination={pagination ? pagination : false}
                slidesPerView={slidesPerView ? slidesPerView : 2}
                spaceBetween={5}
                autoplay={{
                    delay: 500000,
                    disableOnInteraction: false,
                }}
                breakpoints={breakpoints ? breakpoints : breakpoints}
            >
                {cloneElements}
            </Swiper>
        </div>
    );
};

export default SwiperLib;




// 'use client'
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import React, { ReactElement } from 'react';
// import 'swiper/swiper-bundle.css';
// import './style.css'  // i get all css swiper/swiper-bundle.css here


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
//     slidesPerView: any;
//     breakpoints: any
// }
// const SwiperLib: React.FC<SwiperLibProps> = ({
//     children, items, navigation, pagination, slidesPerView, breakpoints }) => {
//     const cloneElements = items.map((item) => (
//         <SwiperSlide key={item.id}>
//             {React.cloneElement(children, { key: item.id, item })}
//         </SwiperSlide>

//     ));
//     return (
//         <div className='parentDiv relative'>
//             <Swiper
//                 className="mx-auto container"
//                 style={{width : "80%"}}
//                 modules={[Navigation, Pagination, Autoplay]}
//                 navigation={navigation ? navigation : false}
//                 pagination={pagination ? pagination : false}
//                 slidesPerView={slidesPerView ? slidesPerView : 2}
//                 spaceBetween={5}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                 }}
//                 breakpoints={breakpoints ? breakpoints : breakpoints}>
//                 {cloneElements}
//             </Swiper>

//         </div>
//     );
// };

// export default SwiperLib;





















