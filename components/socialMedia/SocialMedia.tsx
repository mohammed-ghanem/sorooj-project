"use client"
import { useEffect, useState } from "react";
import { faTwitter, faFacebookF, faYoutube, faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import axios from "axios";

interface SocialLinks {
  twitter?: string;
  youtube?: string;
  facebook?: string;
  telegram?: string;
  instagram?: string;
}

const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/social-contacts`,
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
          });
        setSocialLinks(response.data.data);
      } catch (err) {
        setError("Failed to fetch social media links. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  const socialMediaIcons = [
    { key: "facebook", icon: faFacebookF },
    { key: "twitter", icon: faTwitter },
    { key: "youtube", icon: faYoutube },
    { key: "instagram", icon: faInstagram },
    { key: "telegram", icon: faTelegram },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mr-3 lg:mr-0">
      {socialMediaIcons.map((social) => {
        const link = socialLinks?.[social.key as keyof SocialLinks];
        return (
          link && (
            <Link
              key={social.key}
              href={link}
              className="ml-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="text-[#9F854E] text-xl border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px] hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300"
                icon={social.icon}
              />
            </Link>
          )
        );
      })}
    </div>
  );
};

export default SocialMedia;