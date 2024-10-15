import { Carousel, ConfigProvider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
//import "./style.css";

import defImageEvent from "@/assets/images/event.png"; // Default image
import slider1 from "@/assets/images/1.png";
import slider2 from "@/assets/images/2.png";
import slider3 from "@/assets/images/3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons/faCircleChevronRight';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft';
import Timer from './Timer';

const DefaultImage = {
    src: defImageEvent,
    alt: 'default image',
    // title: 'This is the default image', // You can set the title for default image
    // link: '' // No link for default image
};

const images: string | any[] = [
    // { src: slider1, alt: 'slider 1', title: 'مركز سرج للدراسات والابحاث', link: '/link1' },
    // { src: slider2, alt: 'slider 2', title: 'Title 2', link: '/link2' },
    // { src: slider3, alt: 'slider 3', title: 'Title 3', link: '/link3' },
];

const HomeEvents: React.FC = () => {
    const imageList = images.length > 0 ? images : [DefaultImage];
    const showArrows = imageList.length > 1;


    const targetDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();

    // const targetDate = "2024-12-31T23:59:59Z"
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
                arrows={showArrows ? true : false}
                nextArrow={<FontAwesomeIcon icon={faCircleChevronRight} />}
                prevArrow={<FontAwesomeIcon icon={faCircleChevronLeft} />}
                autoplay={showArrows}
                autoplaySpeed={5000}
                fade
                dots={false}
                className='container mx-auto w-[80%] mt-24'
            >
                {imageList.map((image, index) => (
                    <div key={index} className='relative outline-none'>
                        <Image
                            className='w-[100%] lg:w-[1600px] h-auto lg:h-[400px]'
                            src={image.src}
                            alt={image.alt}
                        />
                        {image.title && (
                            <div className="absolute inset-0 flex justify-center items-end mb-4">
                                <Link href={image.link || '#'}>
                                    <span className="styleTitle font-bold mainColor bg-white bg-opacity-25 px-2 py-1 rounded">
                                        {image.title}
                                    </span>
                                </Link>
                            </div>
                        )}
                        {/* Add a span for the default image */}
                        {image.src === DefaultImage.src && (

                            <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-center text-white px-3 py-2 w-[70%]">
                                <h1 className='font-cairo font-bold text-base md:text-4xl mb-0 md:mb-7'>احداث قدامة</h1>
                                <p className='font-cairo font-bold text-base leading-[2.0] hidden md:block'
                                >مركز سُرُجْ - منارة للبحث العلمى والتعليم المتخصص فى استكشاف وفهم المذاهب الفكرية المعاصرة </p>
                                <p className='font-cairo font-bold text-base leading-[2.0] hidden md:block'>لا يوجد مواعيد او احداث قادمة حتى الان</p>
                                <p className='font-cairo font-bold text-base leading-[2.0] hidden md:block'>أبقى على تواصل ليصلك كل جديد</p>
                            
                                <Timer targetDate={targetDate}/>
                            </div>
                        )}
                    </div>
                ))}
            </Carousel>
        </ConfigProvider>
    );
};

export default HomeEvents;





