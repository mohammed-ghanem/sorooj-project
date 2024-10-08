
import { Carousel, ConfigProvider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import "./style.css";

import defImage from "@/assets/images/default.png"; // Default image
import slider1 from "@/assets/images/1.png";
import slider2 from "@/assets/images/2.png";
import slider3 from "@/assets/images/3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons/faCircleChevronRight';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft';


const DefaultImage = {
  src: defImage,
  alt: 'default image',
};

const images: string | any[] = [
  { src: slider1, alt: 'slider 1', title: 'مركز سرج للدراسات والابحاث', link: '/link1' },
  // { src: slider2, alt: 'slider 2', title: 'Title 2', link: '/link2' },
  // { src: slider3, alt: 'slider 3', title: 'Title 3', link: '/link3' },
];

const Slider: React.FC = () => {
  const imageList = images.length > 0 ? images : [{ src: DefaultImage.src, alt: DefaultImage.alt, title: null, link: '' }];
  const showArrows = imageList.length > 1;

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
        className='container mx-auto'
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
                <Link href={image.link}>
                  <span className="styleTitle font-bold mainColor  bg-white bg-opacity-25 px-2 py-1 rounded">
                    {image.title}
                  </span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </ConfigProvider>
  );
};

export default Slider;
