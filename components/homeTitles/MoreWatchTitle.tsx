import Link from 'next/link'

const MoreWatchTitle = () => {
    return (
        <div className='container mx-auto flex justify-between items-center mt-16'>
            <h1 className='text-xl md:text-2xl font-bold mb-4 primaryColor mr-4'>الاكثر مشاهدة</h1>
            <Link
                href={`/`}
                className="ml-8 border-[1px] font-bold border-[solid] border-[#424C61] 
                mainColor rounded-[5px] px-[10px]
                py-[6px] hover:bg-[#424C61] hover:text-[#fff]
                hover:ease-in duration-300 mb-4" >عرض الكل</Link>
        </div>
    )
}
export default MoreWatchTitle