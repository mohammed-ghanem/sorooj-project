import { faTwitter, faFacebookF, faYoutube, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const SocialMedia = () => {
  return (
    <div>
      <Link href="" className=' ml-2' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className=' primaryColor text-xl' icon={faFacebookF} />
      </Link>
      <Link href="" className=' ml-2' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className='primaryColor text-xl' icon={faTwitter} />
      </Link>
      <Link href="" className=' ml-2' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className='primaryColor text-xl' icon={faYoutube} />
      </Link>
      <Link href="" className=' ml-2' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className='primaryColor text-xl' icon={faInstagram} />
      </Link>
      <Link href="" className=' ml-2' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className='primaryColor text-xl' icon={faTelegram} />
      </Link>
    </div>
  )
}

export default SocialMedia