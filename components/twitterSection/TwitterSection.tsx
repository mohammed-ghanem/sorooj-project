import Answers from './Answers'
import TweetEmbed from './TweetEmbed'

const TwitterSection = () => {
    return (
        <div className='container mx-auto md:w-[80%] grid grid-cols-1 lg:grid-cols-3 gap-10 items-center'>
            <div className='answ&Ques md:col-span-2 w-[95%] mx-auto'>
                <Answers />
            </div>
            <div className='twitterPosts w-[95%] mx-auto'>
                <TweetEmbed />
            </div>
        </div>
    )
}

export default TwitterSection