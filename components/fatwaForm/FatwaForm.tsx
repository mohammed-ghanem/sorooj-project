import Image from "next/image"
import fatwaIcon from '@/assets/images/fatwaIcon.svg'
import fatwaFlower from '@/assets/images/fatwa.svg'




const FatwaForm = () => {
  return (
    <div className='my-14 relative container mx-auto w-[80%] grid grid-cols-3 gap-2 items-center bkPrimaryColor rounded-[10px] overflow-hidden'>
      <div className=" py-10 relative z-50 col-span-2 w-[80%] mx-auto">
        <div className="mb-5 text-white font-bold">
          <h5>هل تريد طلب فتوى !  </h5>
          <p className="my-4">نحن فى انتظارك , يسعدنا مساعدتك , قم بتسجيل الدخول اولا</p>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="name"
              placeholder="الاسم"
              className="block w-full rounded-md border-0 py-1.5 pr-2
            text-white shadow-sm ring-1 ring-inset 
            ring-white placeholder:text-white focus:ring-2 focus:outline-none
            sm:text-sm sm:leading-6 bkNone"

            />
            <input
              type="email"
              name="name"
              placeholder="البريد الالكترونى"
              className="block w-full rounded-md border-0 py-1.5 pr-2
            text-white shadow-sm ring-1 ring-inset 
            ring-white placeholder:text-white focus:ring-2 focus:outline-none
            sm:text-sm sm:leading-6 bkNone"

            />
          </div>
          <textarea
            name="textarea"
            placeholder="ادخل رسالتك"
            className="block w-full rounded-md border-0 py-1.5 h-[180px] my-4 pr-2 
            text-white shadow-sm ring-1 ring-inset
             ring-white placeholder:text-white focus:ring-2 focus:outline-none
             sm:text-sm sm:leading-6 bkNone">

          </textarea>
          <input className="mainColor bkColor font-bold px-[26px] py-[10px] rounded-lg cursor-pointer block mx-auto"
            type="submit" value="ارسال" />


        </form>
      </div>
      <div className='relative h-full bkColor rounded-tl-none rounded-br-[200px] rounded-tr-[200px] rounded-bl-none w-full mr-auto'>
        <Image fill className="m-auto" src={fatwaIcon} alt="fatwaIcon" />
      </div>
      <div className="absolute right-0 bottom-0">
        <Image src={fatwaFlower} alt="flower" />
      </div>
    </div>
  )
}

export default FatwaForm