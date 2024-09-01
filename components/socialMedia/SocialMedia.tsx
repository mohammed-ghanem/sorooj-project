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
          <FontAwesomeIcon className='text-white text-xl border-[1px] border-[solid] border-[#fff] rounded-[30px] p-[7px] w-[22px] 
' icon={social.icon} />
        </Link>
      ))}
    </div>
  )
}

export default SocialMedia;
