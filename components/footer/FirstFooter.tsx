import Image from "next/image"
import footerLogo from '@/assets/images/logofooter.png'
import SocialMedia from "../socialMedia/SocialMedia"

const FirstFooter = () => {
  return (
      <div>
          <div className='container mx-auto row grid grid-cols-1 md:grid-cols-2 items-center'>
              <div className='col-span-1 md:col-span-1 block md:flex justify-around items-center'>
                  <div className=" w-48 h-40 relative">
                  <Image fill src={footerLogo} alt="logo" />
                  </div>
                  <div>
                      <p className="text-white text-lg">تواصل معنا على :</p>
                      <SocialMedia/>
                  </div>
              </div>
              <div className='col-span-1 md:col-span-1'>subscriber</div>
          </div>
    </div>
  )
}

export default FirstFooter