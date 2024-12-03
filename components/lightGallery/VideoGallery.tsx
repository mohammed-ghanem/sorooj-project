/* eslint-disable @next/next/no-img-element */
import LightGallery from 'lightgallery/react';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import share from 'lightgallery/plugins/share'
import fullscreen from 'lightgallery/plugins/fullscreen'
import autoplay from 'lightgallery/plugins/autoplay';




import "./style.css"
import Image from 'next/image';

const videoGallery = () => {
  return (
    <div>
      <div className='container mx-auto w-[80%] grid grid-cols-4 gap-4'>
        <div>categories</div>
        <LightGallery
          elementClassNames={`col-span-3  bg-red-400 grid grid-cols-2 gap-4`}
          mode="lg-fade"
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgVideo, fullscreen, share, autoplay]}
        >
          <a
            data-lg-size="1406-1390"
            className="gallery-item"
            data-src="https://youtu.be/x1znzgByTr4?list=PLXZ1G3eUfYeGyHl--XSEOF7trpAqarmFS"
            data-poster="https://img.youtube.com/vi/EIUJfXk3_3w/maxresdefault.jpg"
            data-sub-html="description one"
          >

            <img
              alt=''
              className=" max-w-full"
              src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            data-lg-size="1406-1390"
            className="gallery-item"
            data-src="https://youtu.be/0X2_nhcntUs?list=PLXZ1G3eUfYeGyHl--XSEOF7trpAqarmFS"
            data-poster="https://img.youtube.com/vi/EIUJfXk3_3w/maxresdefault.jpg"
            data-sub-html="description Two"
          >

            <img
              alt=''
              className="max-w-full"
              src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            />
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