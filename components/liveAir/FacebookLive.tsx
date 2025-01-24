"use client"
import { useEffect } from 'react';
import Script from 'next/script';
import AllChannelsBox from './AllChannelsBox';


declare global {
  interface Window {
    FB: {
      init: (config: { xfbml: boolean; version: string }) => void;
      XFBML: { parse: () => void };
    };
  }
}

const FacebookLive = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <>
      {/* Add the Facebook SDK script */}
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.FB) {
            window.FB.init({
              xfbml: true,
              version: 'v15.0', // Specify the Facebook API version
            });
          }
        }}
      />

      {/* Facebook Video Embed */}
      <section className="container my-8 mx-auto w-[95%] lg:w-[80%] "
        style={{ direction: "rtl" }}>
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="mx-auto col-span-3 md:col-span-1 w-[95%] lg:w-[80%]">
            <AllChannelsBox />
          </div>
          <div className="responsive-video mx-auto col-span-3 md:col-span-2 w-[95%] lg:w-[80%]">
            <div
              className="fb-video"
              data-href="https://www.facebook.com/100064654032648/videos/921900300133923"
              data-width="800"
              data-show-text="false"
            />
          </div>
        </div>
      </section>

    </>
  );
};

export default FacebookLive

