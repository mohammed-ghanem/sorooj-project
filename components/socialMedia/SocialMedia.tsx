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
    <div>
      {socialMediaLinks.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          className='ml-2'
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className='primaryColor text-xl' icon={social.icon} />
        </Link>
      ))}
    </div>
  )
}

export default SocialMedia;
