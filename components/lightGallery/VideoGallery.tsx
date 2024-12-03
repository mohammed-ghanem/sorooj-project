'use client'

import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgShare from 'lightgallery/plugins/share';
import lgHash from 'lightgallery/plugins/hash';
import lgVideo from 'lightgallery/plugins/video';
import thumble from 'lightgallery/plugins/thumbnail';
import autoplay from 'lightgallery/plugins/autoplay';
import { FC } from 'react';
import Image from 'next/image';



const VideoGallery: FC<{ name: string }> = ({ name }) => {

  return (
    <LightGallery
      plugins={[lgZoom, lgShare, lgHash, lgVideo ,thumble , autoplay]}
      speed={500}
    >
      <a
        data-lg-size="1280-720"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        data-src="https://www.youtube.com/embed/A3NTcJR7MCU"
        data-poster="https://img.youtube.com/vi/A3NTcJR7MCU/maxresdefault.jpg"
        data-sub-html="<h4>Visual Soundscapes - Mountains | Planet Earth II | BBC America</h4><p>On the heels of Planet Earth II’s record-breaking Emmy nominations, BBC America presents stunning visual soundscapes from the series' amazing habitats.</p>"
      >
        <Image
          className="img-responsive"
          src="https://img.youtube.com/vi/A3NTcJR7MCU/maxresdefault.jpg"
          width={600}
          height={300} alt={''}
        />
      </a>
      <a
        data-lg-size="1280-720"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        data-src="https://www.youtube.com/embed/DU9Kr4v-xTU"
        data-poster="https://img.youtube.com/vi/DU9Kr4v-xTU/maxresdefault.jpg"
        data-sub-html="<h4>Visual Soundscapes - Mountains | Planet Earth II | BBC America</h4><p>On the heels of Planet Earth II’s record-breaking Emmy nominations, BBC America presents stunning visual soundscapes from the series' amazing habitats.</p>"
      >
        <Image
          className="img-responsive"
          src="https://img.youtube.com/vi/DU9Kr4v-xTU/maxresdefault.jpg"
          width={600}
          height={300} alt={''}
        />
      </a>
    </LightGallery>
  )
}

export default VideoGallery