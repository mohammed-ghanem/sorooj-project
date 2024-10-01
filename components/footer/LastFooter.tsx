import React from 'react'
import FastLinksFooter from './FastLinksFooter'
import ContactUsFooter from './ContactUsFooter'

const LastFooter = ({ language }: any) => {
    const footerNavLang = language
    return (
        <div className='mt-8 relative z-10 pb-8'>
            <div className=" container mx-auto row grid grid-cols-1 lg:grid-cols-3">
                <div className='text-white mr-2 md:mr-9'>
                    <h4 className='text-2xl mt-1 lg:mt-0'>عن المركز</h4>
                    <p className='mr-4 mt-8 leading-[2.0]'>
                        مركز سرج - منارة للبحث العلمي والتعليم المتخصص في استكشاف وفهم المذاهب الفكرية المعاصرة، بما في ذلك الدينية والفلسفية والسياسية
                    </p>
                </div>
                <div className='text-white mr-2 md:mr-9'>
                    <FastLinksFooter language={ footerNavLang} />
                </div>
                <div className='text-white mr-2 md:mr-9'>
                    <ContactUsFooter />
                </div>
            </div>
        </div>
    )
}

export default LastFooter