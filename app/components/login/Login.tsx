import React from 'react'
import LangBtn from '../buttons/LangBtn'
import Link from 'next/link'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const login = () => {
    return (
        <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
            <LangBtn />
            <Link href={"/signin"} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
                <FontAwesomeIcon icon={faUser} className='ml-1' />
                تسجيل الدخول
            </Link>
        </div>
    )
}

export default login