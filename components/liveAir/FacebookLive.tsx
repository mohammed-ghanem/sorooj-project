"use client"
import { useEffect, useState } from 'react';
import Script from 'next/script';
import AllChannelsBox from './AllChannelsBox';
import LangUseParams from '../translate/LangUseParams';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


declare global {
  interface Window {
    FB: {
      init: (config: { xfbml: boolean; version: string }) => void;
      XFBML: { parse: () => void };
    };
  }
}
interface LiveFacebook {
  scalar: string;
}


const FacebookLive = () => {
  const [facebookLiveDetails, setFacebookLiveDetails] = useState<LiveFacebook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lang = LangUseParams();


  useEffect(() => {

    if (typeof window !== 'undefined' && window.FB) {
      window.FB.XFBML.parse();
    }

    const fetchYoutubeLive = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/live/facebook-live`,
          {
            params: { lang },
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,

            },
          }
        );
        setFacebookLiveDetails(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchYoutubeLive();


  }, [lang]);


  if (loading) {
    return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section>
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

          {(!facebookLiveDetails || !facebookLiveDetails.scalar)
            ?
            <div className="text-center mainColor font-bold mx-auto col-span-3 md:col-span-2 w-[95%] lg:w-[80%]">
              لا يوجد بث مباشر على قناة الفيسبوك الان اعد المحاولة قريبا
            </div>
            :
            <div className="responsive-video mx-auto col-span-3 md:col-span-2 w-[95%] lg:w-[80%]">
              {facebookLiveDetails && (
                <div
                  className="fb-video"
                  data-href={facebookLiveDetails.scalar}
                  data-width="800"
                  data-show-text="false"
                />
              )}
            </div>
          }

        </div>
      </section>

    </section>
  );
};

export default FacebookLive

