import React from 'react'
import FastLinksFooter from './FastLinksFooter'
import ContactUsFooter from './ContactUsFooter'


const LastFooter = () => {
    return (
        <div className='mt-8 relative z-10 pb-8'>
            <div className=" container mx-auto row grid grid-cols-1 lg:grid-cols-3">
                <div className='text-white mr-2 md:mr-9'>
                    <h4 className='text-2xl mt-1 lg:mt-0 primaryColor'>عن المركز</h4>
                    <p className='mr-4 mt-8 leading-[2.0] mainColor font-semibold'>
                    مركز سُرج للدراسات والأبحاث , هو مركز علمي دعوي بحثي يعني بتأصيل العقيدة الإسلامية وتعزيز الفطرة الإيمانية وتحصين المجتمع المسلم من الحرب علي الفطرة والإيمان والإسلام , وضرورة تقرير قواعد الشرح الصحيحة المستمدة من القران الكريم والسنه النبوية , وفق منهج السلف الصالح                    </p>
                </div>
                <div className='text-white mr-2 md:mr-9'>
                    <FastLinksFooter />
                </div>
                <div className='text-white mr-2 md:mr-9'>
                    <ContactUsFooter />
                </div>
            </div>
        </div>
    )
}

export default LastFooter