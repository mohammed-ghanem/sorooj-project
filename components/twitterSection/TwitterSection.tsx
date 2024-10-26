import Answers from './Answers'
import TweetEmbed from './TweetEmbed'

const TwitterSection = () => {
    return (
        <div className='container mx-auto w-[80%] grid grid-cols-1 md:grid-cols-3 gap-10 items-center'>
            <div className='answ&Ques md:col-span-2'>
                <Answers />
            </div>
            <div className='twitterPosts'>
                <TweetEmbed />
            </div>
        </div>
    )
}

export default TwitterSection