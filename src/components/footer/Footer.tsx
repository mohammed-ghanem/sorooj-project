import Image from 'next/image'
import FirstFooter from './FirstFooter'
import LastFooter from './LastFooter'
import footerVectorImage from '@/assets/images/footervector.png'


const Footer = ({ language }: any) => {
  const footerNavLang = language
  return (
    <div className="bkMainColor relative ">
      <Image src={footerVectorImage} className=' object-cover absolute ' alt='footerVector' />
      <FirstFooter  />
      <hr className=' opacity-30' />
      <LastFooter language={ footerNavLang}/>
      {/* copyRight */}
      <hr className=' opacity-30' />
      <div className='text-center primaryColor text-sm font-bold font-sans' >
        <p>
          All rights reserved for <span className='text-white'>Sorooj</span>  &copy; {new Date().getFullYear()}
        </p>
        <p className='text-white'>WeCan For Development</p>
      </div>
    </div>
  )
}

export default Footer