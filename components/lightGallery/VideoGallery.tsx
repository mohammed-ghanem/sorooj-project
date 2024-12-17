"use client"
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import share from 'lightgallery/plugins/share'
import fullscreen from 'lightgallery/plugins/fullscreen'
import autoplay from 'lightgallery/plugins/autoplay';
import defImage from "@/public/assets/images/default.webp"; // Default image
import "./style.css"
import Image from 'next/image'; 
import Banners from '../banners/Banners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faClock, faPenNib, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import VideoGalleryCategories from './VideoGalleryCategories';

const videoGallery = () => {
  return (
    <div>
      <div>
        <Banners src={defImage} textPath="المكتبة المرئية" />
      </div>
      <div className='container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div><VideoGalleryCategories /></div>
        <LightGallery
          elementClassNames={`col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4`}
          mode="lg-fade"
          speed={500}
          videojsOptions={{ muted: true }}
          plugins={[lgThumbnail, lgZoom, lgVideo, fullscreen, share, autoplay]}
        >
          <a
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#424c61] cursor-pointer"
            data-src="https://youtu.be/x1znzgByTr4?list=PLXZ1G3eUfYeGyHl--XSEOF7trpAqarmFS"
            data-poster="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
            data-sub-html="description one"
          >
            <div className='relative overflow-hidden'>
              <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                <FontAwesomeIcon icon={faCirclePlay} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
              </div>
              <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                <span className=''>
                  2024-11-27
                </span>
              </div>

              {/* <img
                alt=''
                className="max-w-full w-full"
                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
              /> */}

              <Image className="max-w-full w-full"
                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
                width={100} height={100} alt=''
              />

            </div>
            <div className='flex items-center px-2 pt-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
              <h2 className='mainColor font-bold text-[12px]'>
                فى ابطال اصول الملحدين
              </h2>
            </div>
            <div className='flex items-center px-2 py-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
              <p className='mainColor font-bold text-[10px]'>
                وصف مختصر عن ابطال اصول الملحدين
              </p>
            </div>
          </a>
          <a
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#424c61] cursor-pointer"
            data-src="https://www.youtube.com/watch?v=tQZk79ip1FY"
            data-poster="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
            data-sub-html="description one"
          >
            <div className='relative overflow-hidden'>
              <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                <FontAwesomeIcon icon={faCirclePlay} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
              </div>
              <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                <span className=''>
                  2024-11-27
                </span>
              </div>

              {/* <img
                alt=''
                className="max-w-full w-full"
                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
              /> */}

              <Image className="max-w-full w-full"
                src="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
                width={100} height={100} alt=''
              />

            </div>
            <div className='flex items-center px-2 pt-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
              <h2 className='mainColor font-bold text-[12px]'>
                فى ابطال اصول الملحدين
              </h2>
            </div>
            <div className='flex items-center px-2 py-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
              <p className='mainColor font-bold text-[10px]'>
                وصف مختصر عن ابطال اصول الملحدين
              </p>
            </div>
          </a>
          <a
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#424c61] cursor-pointer"
            data-src="https://www.youtube.com/watch?v=c2xjqwvanak&t"
            data-poster="https://img.youtube.com/vi/c2xjqwvanak/maxresdefault.jpg"
            data-sub-html="description one"
          >
            <div className='relative overflow-hidden'>
              <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                <FontAwesomeIcon icon={faCirclePlay} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
              </div>
              <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                <span className=''>
                  2024-11-27
                </span>
              </div>

              {/* <img
                alt=''
                className="max-w-full w-full"
                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
              /> */}

              <Image className="max-w-full w-full"
                src="https://img.youtube.com/vi/c2xjqwvanak/maxresdefault.jpg"
                width={100} height={100} alt=''
              />

            </div>
            <div className='flex items-center px-2 pt-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
              <h2 className='mainColor font-bold text-[12px]'>
                فى ابطال اصول الملحدين
              </h2>
            </div>
            <div className='flex items-center px-2 py-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
              <p className='mainColor font-bold text-[10px]'>
                وصف مختصر عن ابطال اصول الملحدين
              </p>
            </div>
          </a>
          <a
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#424c61] cursor-pointer"
            data-src="https://www.youtube.com/watch?v=tQZk79ip1FY"
            data-poster="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
            data-sub-html="description one"
          >
            <div className='relative overflow-hidden'>
              <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                <FontAwesomeIcon icon={faCirclePlay} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
              </div>
              <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                <span className=''>
                  2024-11-27
                </span>
              </div>

              {/* <img
                alt=''
                className="max-w-full w-full"
                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
              /> */}

              <Image className="max-w-full w-full"
                src="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
                width={100} height={100} alt=''
              />

            </div>
            <div className='flex items-center px-2 pt-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
              <h2 className='mainColor font-bold text-[12px]'>
                فى ابطال اصول الملحدين
              </h2>
            </div>
            <div className='flex items-center px-2 py-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
              <p className='mainColor font-bold text-[10px]'>
                وصف مختصر عن ابطال اصول الملحدين
              </p>
            </div>
          </a>
          <a
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#424c61] cursor-pointer"
            data-src="https://www.youtube.com/watch?v=tQZk79ip1FY"
            data-poster="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
            data-sub-html="description one"
          >
            <div className='relative overflow-hidden'>
              <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                <FontAwesomeIcon icon={faCirclePlay} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
              </div>
              <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                <span className=''>
                  2024-11-27
                </span>
              </div>

              {/* <img
                alt=''
                className="max-w-full w-full"
                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
              /> */}

              <Image className="max-w-full w-full"
                src="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
                width={100} height={100} alt=''
              />

            </div>
            <div className='flex items-center px-2 pt-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
              <h2 className='mainColor font-bold text-[12px]'>
                فى ابطال اصول الملحدين
              </h2>
            </div>
            <div className='flex items-center px-2 py-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
              <p className='mainColor font-bold text-[10px]'>
                وصف مختصر عن ابطال اصول الملحدين
              </p>
            </div>
          </a>
          <a
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#424c61] cursor-pointer"
            data-src="https://www.youtube.com/watch?v=tQZk79ip1FY"
            data-poster="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
            data-sub-html="description one"
          >
            <div className='relative overflow-hidden'>
              <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                <FontAwesomeIcon icon={faCirclePlay} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
              </div>
              <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                <span className=''>
                  2024-11-27
                </span>
              </div>

              {/* <img
                alt=''
                className="max-w-full w-full"
                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
              /> */}

              <Image className="max-w-full w-full"
                src="https://img.youtube.com/vi/tQZk79ip1FY/maxresdefault.jpg"
                width={100} height={100} alt=''
              />

            </div>
            <div className='flex items-center px-2 pt-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
              <h2 className='mainColor font-bold text-[12px]'>
                فى ابطال اصول الملحدين
              </h2>
            </div>
            <div className='flex items-center px-2 py-2'>
              <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
              <p className='mainColor font-bold text-[10px]'>
                وصف مختصر عن ابطال اصول الملحدين
              </p>
            </div>
          </a>

        </LightGallery>
      </div>

    </div>
  )
}

export default videoGallery










///////////////////// its work with photo



/* eslint-disable @next/next/no-img-element */

// #lg-inner-1 .lg-item {
//  display: block!important;
// }

// import LightGallery from 'lightgallery/react';

// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import "./style.css"
// import Image from 'next/image';

// const videoGallery = () => {
//   return (
//     <div>
//       <LightGallery
//         mode="lg-fade"
//         speed={500}
//         plugins={[lgThumbnail, lgZoom]}
//       >
//         <a
//           data-lg-size="1406-1390"
//           className="gallery-item"
//           data-src="//www.youtube.com/watch?v=EIUJfXk3_3w"
//         data-poster="https://img.youtube.com/vi/EIUJfXk3_3w/maxresdefault.jpg"
//           data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
//         >

//           <img
//             alt=''
//             className=" max-w-full"
//             src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
//           />
//         </a>
//         <a
//           data-lg-size="1406-1390"
//           className="gallery-item"
//           data-src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80"
//           data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
//         >

//           <img
//             alt=''
//             className="max-w-full"
//             src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
//           />
//         </a>
//       </LightGallery>
//     </div>
//   )
// }

// export default videoGallery