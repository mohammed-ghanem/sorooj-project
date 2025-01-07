"use client"
import Image from 'next/image'
import FirstFooter from './FirstFooter'
import LastFooter from './LastFooter'
import footerVectorImage from '@/public/assets/images/footervector.png'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import LangUseParams from '../translate/LangUseParams'


const Footer = () => {
  const lang = LangUseParams(); // Access dynamic [lang] parameter

  return (
    <div className=" bkColor relative pt-[40px] pb-[10px]"
      style={{ direction: lang === "en" ? "ltr" : "rtl" }}>
    
      <Image src={footerVectorImage} className=' object-cover absolute ' alt='footerVector' />
      <FirstFooter />
      <hr className='h-[2px] bkPrimaryColor my-5 opacity-65' />
      <LastFooter />
      {/* copyRight */}
      <hr className='h-[2px] bkPrimaryColor my-5 opacity-65' />
      <div className='text-center mainColor font-bold text-sm' >
        <p>
          All rights reserved for <span className='primaryColor'>Sorooj</span>  &copy; 2024 - {new Date().getFullYear()}
        </p>
        <p className='mainColor text-xm'>WeCan For Development</p>
      </div>

      <ScrollToTop />
    </div>
  )
}

export default Footer