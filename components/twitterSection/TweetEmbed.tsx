'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';

// Define the expected API response structure
interface SocialContactsResponse {
    'twitter-section-id': string | null; // Allow `null` in case the API sends a null value
}

const TweetEmbed = () => {
    const [tweetId, setTweetId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Default tweet ID if none is provided by the API
    const defaultTweetId = '1579756237272813568';

    useEffect(() => {
        const fetchSocialContacts = async () => {
            try {
                const response = await axios.get<SocialContactsResponse>(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/social-contacts`
                );
                const data = response.data;

                // Use the provided ID or fall back to the default
                setTweetId(data['twitter-section-id'] || defaultTweetId);
            } catch (err) {
                setError('Failed to load tweet. Please try again.');
                console.error(err);
            }
        };

        fetchSocialContacts();
    }, []);

    return (
        <div className="h-[600px] overflow-y-auto">
            {error ? (
                <p>{error}</p>
            ) : tweetId ? (
                <TwitterTweetEmbed tweetId={tweetId} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TweetEmbed;




// 'use client'
// import { TwitterTweetEmbed } from 'react-twitter-embed';

// const TweetEmbed = () => {
//     return (
//         <div className='h-[600px] overflow-y-auto'>
//             <TwitterTweetEmbed tweetId={'1579756237272813568'} />
//         </div>
//     );
// };

// export default TweetEmbed;
