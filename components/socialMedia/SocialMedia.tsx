import { faTwitter, faFacebookF, faYoutube, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const socialMediaLinks = [
  { href: "https://www.facebook.com", icon: faFacebookF },
  { href: "https://www.twitter.com", icon: faTwitter },
  { href: "https://www.youtube.com", icon: faYoutube },
  { href: "https://www.instagram.com", icon: faInstagram },
  { href: "https://www.telegram.com", icon: faTelegram }
];

const SocialMedia = () => {
  return (
    <div className='mr-3 lg:mr-0'>
      {socialMediaLinks.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          className='ml-3 '
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className='text-[#9F854E] text-xl
          border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px]
           hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300'
            icon={social.icon} />
        </Link>
      ))}
    </div>
  )
}

export default SocialMedia;
