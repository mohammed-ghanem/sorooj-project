'use client'
import { useState, useEffect } from 'react';
import { Carousel, ConfigProvider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import "./style.css";
import defImage from "@/public/assets/images/default.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons/faCircleChevronRight';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft';

const DefaultImage = {
  image: defImage,
  alt: 'default image',
};

const Slider: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/slider`
        );

        const data = response.data.data || [];

        if (data.length > 0) {
          setImages(data);
        } else {
          setHasError(true);
          setImages([DefaultImage]);
        }

      } catch (error) {
        console.error("Error fetching slider images:", error);
        setHasError(true);
        setImages([DefaultImage]);
      }
    };

    fetchSliderImages();
  }, []);

  // أثناء التحميل لا تعرض أي fallback
  if (images.length === 0 && !hasError) {
    return (
      <div className="w-full h-[350px] lg:h-[350px]" />
    );
  }

  const showArrows = images.length > 1;

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 36,
          },
        },
      }}
    >
      <Carousel
        arrows={showArrows}
        nextArrow={<FontAwesomeIcon icon={faCircleChevronRight} />}
        prevArrow={<FontAwesomeIcon icon={faCircleChevronLeft} />}
        autoplay={showArrows}
        autoplaySpeed={5000}
        fade
        dots={false}
        className="container mx-auto"
      >
        {images.map((image, index) => (
          <div key={index} className="relative outline-none">
            <Image
              className="w-[100%] lg:w-[1600px] h-auto lg:h-[350px]"
              src={image.image}
              alt={image.alt}
              width={1600}
              height={350}
              priority={index === 0} // تحميل أسرع لأول صورة
            />

            {image.title && (
              <div className="absolute inset-0 flex justify-center items-end mb-4">
                <Link href={image.link || ''}>
                  <span className="styleTitle font-bold mainColor bg-white bg-opacity-25 px-2 py-1 rounded">
                    {image.title}
                  </span>
                </Link>
              </div>
            )}

            {hasError && image.image === DefaultImage.image && (
              <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-center text-white px-3 py-2 w-[70%]">
                <h1 className="font-cairo font-bold text-base md:text-4xl mb-0 md:mb-7">
                  مركز سُرُجْ لدراسة المذاهب الفكرية المعاصرة
                </h1>
                <p className="font-cairo font-bold text-base leading-[2.0] hidden md:block">
                  مركز سُرُجْ - منارة للبحث العلمى والتعليم المتخصص فى استكشاف وفهم المذاهب الفكرية المعاصرة , بما فى ذلك الدينية والفلسفية والسياسية من اجل تمكين المتعلمين فى اتخاذ قرارات مستنيرة فى ظل التنوع الفكرى المتزايد
                </p>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </ConfigProvider>
  );
};

export default Slider;







// 'use client'
// import { useState, useEffect } from 'react';
// import { Carousel, ConfigProvider } from 'antd';
// import Image from 'next/image';
// import Link from 'next/link';
// import axios from 'axios';
// import "./style.css";
// import defImage from "@/public/assets/images/default.webp"; // Default image
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons/faCircleChevronRight';
// import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft';

// const DefaultImage = {
//   image: defImage,
//   alt: 'default image',
// };

// const Slider: React.FC = () => {
//   const [images, setImages] = useState<any[]>([]); // State to hold images

//   useEffect(() => {
//     const fetchSliderImages = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/slider`
//         );
//         setImages(response.data.data || []); // Assuming `response.data.images` is the array of images
        
//       } catch (error) {
//         console.error("Error fetching slider images:", error);
//         setImages([DefaultImage]); // Fallback to default image
       
//       }
//     };

//     fetchSliderImages();
//   }, []);

//   const imageList = images.length > 0 ? images : [DefaultImage];
//   const showArrows = imageList.length > 1;

 

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Carousel: {
//             arrowSize: 36,
//           },
//         },
//       }}
//     >
//       <Carousel
//         arrows={showArrows ? true : false}
//         nextArrow={<FontAwesomeIcon icon={faCircleChevronRight} />}
//         prevArrow={<FontAwesomeIcon icon={faCircleChevronLeft} />}
//         autoplay={showArrows}
//         autoplaySpeed={5000}
//         fade
//         dots={false}
//         className="container mx-auto"
//       >
//         {imageList.map((image, index) => (
//           <div key={index} className="relative outline-none">
//             <Image
//               className="w-[100%] lg:w-[1600px] h-auto lg:h-[350px]"
//               src={image.image}
//               alt={image.alt}
//               style={{ height: 'auto' }}
//               width={1600}
//               height={350}
              
              
//             />
//             {image.title && (
//               <div className="absolute inset-0 flex justify-center items-end mb-4">
//                 <Link href={image.link || ''}>
//                   <span className="styleTitle font-bold mainColor bg-white bg-opacity-25 px-2 py-1 rounded">
//                     {image.title}
//                   </span>
//                 </Link>
//               </div>
//             )}
//             {image.image === DefaultImage.image && (
//               <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-center text-white px-3 py-2 w-[70%]">
//                 <h1 className="font-cairo font-bold text-base md:text-4xl mb-0 md:mb-7">
//                   مركز سُرُجْ لدراسة المذاهب الفكرية المعاصرة
//                 </h1>
//                 <p className="font-cairo font-bold text-base leading-[2.0] hidden md:block">
//                   مركز سُرُجْ - منارة للبحث العلمى والتعليم المتخصص فى استكشاف وفهم المذاهب الفكرية المعاصرة , بما فى ذلك الدينية والفلسفية والسياسية من اجل تمكين المتعلمين فى اتخاذ قرارات مستنيرة فى ظل التنوع الفكرى المتزايد
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </Carousel>
//     </ConfigProvider>
//   );
// };

// export default Slider;