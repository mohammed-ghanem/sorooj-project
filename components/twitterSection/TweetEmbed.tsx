'use client'
import { TwitterTweetEmbed } from 'react-twitter-embed';

const TweetEmbed = () => {
    return (
        <div className='h-[600px] overflow-y-auto'>
            <TwitterTweetEmbed tweetId={'1579756237272813568'} />
        </div>
    );
};

export default TweetEmbed;
