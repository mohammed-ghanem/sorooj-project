'use client'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react'

const BtnToggle = ({navLinks}:any) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinkMap = navLinks
  return (
      <div>
          <div className="container mx-auto flex justify-between items-center">
                <div className="hidden lg:flex m-auto">
                    {navLinkMap.map(({href , name, index} : any) => (
                        <Link key={index} href={href} className="text-white ml-2 text-[18px] leading-5 ">
                            {name}
                        </Link>
                    ))}
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-white" />
                    </button>
                </div>
            </div>
            <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                {navLinkMap.map(({href , name, index}: any) => (
                    <Link key={index} href={href} className="block text-white py-2 ">
                        {name}
                    </Link>
                ))}
            </div>
    </div>
  )
}

export default BtnToggle