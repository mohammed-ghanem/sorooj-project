"use client"
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle button visibility when scrolling
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 z-20 right-4 px-[12px] py-[10px] rounded-full bkMainColor text-white transition duration-300"
      >
              <FontAwesomeIcon className='text-xl ' icon={faChevronUp} />
      </button>
    )
  );
};

export default ScrollToTop;
