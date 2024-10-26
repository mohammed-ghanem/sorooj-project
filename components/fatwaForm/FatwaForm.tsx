import Image from "next/image"
import fatwaIcon from '@/assets/images/fatwaIcon.svg'
import fatwaFlower from '@/assets/images/fatwa.svg'




const FatwaForm = () => {
  return (
    <div className='my-14 relative container mx-auto w-[80%] grid grid-cols-2 gap-2 items-center bkPrimaryColor rounded-[10px] overflow-hidden h-96'>
      <div className=" relative z-50">
        <h5>هل تريد طلب فتوى</h5>
        <p>نحن فى انتظارك , يسعدنا مساعدتك , قم بتسجيل الدخول اولا</p>
        <form>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="name"
              placeholder="الاسم"
              className="block w-full rounded-md border-0 py-1.5 
            text-white shadow-sm ring-1 ring-inset 
            ring-white placeholder:text-white focus:ring-2 focus:ring-inset 
            sm:text-sm sm:leading-6 bkNone"

            />
            <input
              type="email"
              name="name"
              placeholder="البريد الالكترونى"
              className="block w-full rounded-md border-0 py-1.5 
            text-white shadow-sm ring-1 ring-inset 
            ring-white placeholder:text-white focus:ring-2 focus:ring-inset 
            sm:text-sm sm:leading-6 bkNone"

            />
          </div>
          <textarea
            name="textarea"
            placeholder="رسالتك"
            className="block w-full rounded-md border-0 py-1.5 
            text-gray-900 shadow-sm ring-1 ring-inset
             ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
             focus:ring-indigo-600 sm:text-sm sm:leading-6">

          </textarea>
          <input type="submit" value="ارسال" />


        </form>
      </div>
      <div className='relative h-full bkColor rounded-tl-none rounded-br-[200px] rounded-tr-[200px] rounded-bl-none w-4/5 mr-auto'>
        <Image fill className="m-auto" src={fatwaIcon} alt="fatwaIcon" />
      </div>
      <div className="absolute right-0 bottom-0">
        <Image src={fatwaFlower} alt="flower" />
      </div>
    </div>
  )
}

export default FatwaForm