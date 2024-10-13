import Link from 'next/link'

const BooksTitle = () => {
    return (
        <div className='container mx-auto flex justify-between items-center my-7'>
            <h1 className='text-2xl font-bold mb-4 primaryColor mr-4'>الكتب والابحاث</h1>
            <Link
                href={`/`}
                className="ml-8 border-[1px] font-bold border-[solid] border-[#424C61] 
                mainColor rounded-[5px] px-[10px]
                py-[6px] hover:bg-[#424C61] hover:text-[#fff]
                hover:ease-in duration-300" >عرض الكل</Link>
        </div>
    )
}
export default BooksTitle