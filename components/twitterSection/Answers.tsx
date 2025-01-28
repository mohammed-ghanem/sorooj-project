'use client';

import { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { fetchQuestionsHome, FatwaItem } from '@/utils/fetchQuestionsHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import parse from "html-react-parser";
import Link from 'next/link';
import LangUseParams from '../translate/LangUseParams';
import './style.css';
import Image from 'next/image';
import noQues from "@/public/assets/images/noques.svg"
 
const Answers = () => {
    const [questions, setQuestions] = useState<FatwaItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const lang = LangUseParams();

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await fetchQuestionsHome();
                setQuestions(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch questions');
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
            </div>
        );
    }
    if (error) return <div>Error: {error}</div>;

    if (questions.length === 0) {
        return <div className="text-center font-cairo mainColor text-lg">
            <Image className='w-full' src={noQues} width={100} height={100} alt='no question' />
            <p className='font-bold mt-5'>لا توجد اسئلة الان !!</p>
        </div>;
    } 

    // Generate Collapse items dynamically from fetched questions
    const items = questions.map((question) => ({
        key: question.id.toString(),
        label: (
            <h5 className="font-bold font-cairo mainColor">
                {question.question.length > 90
                    ? question.question.slice(0, 90) + " ... "
                    : question.question}
            </h5>
        ),
        children: (
            <div className="font-cairo">
                <p className="primaryColor mb-3 font-bold text-base border-b-2 border-customGold w-fit">الجواب :</p>
                <p>
                    {question.answer.answer_content ? (
                        <>
                            {question.answer.answer_content.length > 1000
                                ? parse(question.answer.answer_content.slice(0, 1000) + " ... ")
                                : parse(question.answer.answer_content)
                               }
                            <Link
                                className="primaryColor border-b-2 border-customGold font-bold hover:text-[#424C61]"
                                href={`/${lang}/questions/${question.slug}`}
                            >
                                اقراء المزيد
                            </Link>
                        </>
                    ) : (
                        'لا يوجد إجابة متوفرة.'
                    )}
                </p>
            </div>
        ),
    }));

    const defaultActiveKey = questions.length > 0 ? [questions[0].id.toString()] : [];

    return (
        <Collapse
            items={items}
            defaultActiveKey={defaultActiveKey}
            accordion // Enable accordion behavior
            expandIconPosition="end" 
            expandIcon={({ isActive }) =>
                isActive ? (
                    <MinusCircleOutlined style={{ fontSize: '24px', color: '#9F854E' }} />
                ) : (
                    <PlusCircleOutlined style={{ fontSize: '24px', color: '#9F854E' }} />
                )
            }
        />
    );
};

export default Answers;






// 'use client';

// import { useEffect, useState } from 'react';
// import { Collapse } from 'antd';
// import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
// import { fetchQuestionsHome, FatwaItem } from '@/utils/fetchQuestionsHome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import parse from "html-react-parser";
// import Link from 'next/link';
// import LangUseParams from '../translate/LangUseParams';
// import './style.css'

// const Answers = () => {
//     const [questions, setQuestions] = useState<FatwaItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const lang = LangUseParams();

//     useEffect(() => {
//         const loadQuestions = async () => {
//             try {
//                 const data = await fetchQuestionsHome();
//                 setQuestions(data);
//             } catch (err: any) {
//                 setError(err.message || 'Failed to fetch questions');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadQuestions();
//     }, []);

//     if (loading) {
//         return (
//             <div className="text-center">
//                 <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
//             </div>
//         );
//     }
//     if (error) return <div>Error: {error}</div>;

    

//     // Generate Collapse items dynamically from fetched questions
//     const items = questions.map((question) => ({
//         key: question.id.toString(),
//         label: (
//             <h5 className="font-bold font-cairo text-white">
//                 {question.question.length > 90
//                     ? question.question.slice(0, 90) + " ... "
//                     : question.question}
//             </h5>
//         ),
//         children: (
//             <div className="font-cairo">
//                 <p className="primaryColor mb-3 font-bold text-base border-b-2 border-customGold w-fit">الجواب :</p>
//                 <p>
//                     {question.answer.answer_content ? (
//                         <>
//                             {parse(question.answer.answer_content.slice(0, 1000))}
//                             <Link
//                                 className="primaryColor border-b-2 border-customGold font-bold"
//                                 href={`/${lang}/questions/${question.slug}`}
//                             >
//                                 اقراء المزيد
//                             </Link>
//                         </>
//                     ) : (
//                         'لا يوجد إجابة متوفرة.'
//                     )}
//                 </p>
//             </div>
//         ),
//     }));

//     const defaultActiveKey = questions.length > 0 ? [questions[0].id.toString()] : [];

//     return (
//         <Collapse
//             items={items}
//             defaultActiveKey={defaultActiveKey}
//             accordion // Enable accordion behavior
//             expandIconPosition="end"
//             expandIcon={({ isActive }) =>
//                 isActive ? (
//                     <MinusCircleOutlined style={{ fontSize: '24px', color: '#fff' }} />
//                 ) : (
//                     <PlusCircleOutlined style={{ fontSize: '24px', color: '#fff' }} />
//                 )
//             }
//         />
//     );
// };

// export default Answers;





// 'use client';

// import { Collapse } from 'antd';
// import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

// const items = [
//     {
//         key: '1',
//         label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
//         children: (
//             <div className=' font-cairo'>
//                 <p className='mainColor font-bold text-base'>الجواب :</p>
//                 <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
//             </div>
//         ),
//     },
//     {
//         key: '2',
//         label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
//         children: (
//             <div className=' font-cairo'>
//                 <p className='mainColor font-bold text-base'>الجواب :</p>
//                 <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
//             </div>
//         ),
//     },
//     {
//         key: '3',
//         label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
//         children: (
//             <div className=' font-cairo'>
//                 <p className='mainColor font-bold text-base'>الجواب :</p>
//                 <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
//             </div>
//         ),
//     },
//     {
//         key: '4',
//         label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
//         children: (
//             <div className=' font-cairo'>
//                 <p className='mainColor font-bold text-base'>الجواب :</p>
//                 <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
//             </div>
//         ),
//     },
//     {
//         key: '5',
//         label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
//         children: (
//             <div className=' font-cairo'>
//                 <p className='mainColor font-bold text-base'>الجواب :</p>
//                 <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
//             </div>
//         ),
//     },

// ];

// const Answers = () => {
//     const defaultActiveKey = ['1']; // Define the default active key

//     return (
//         <Collapse
//             items={items}
//             defaultActiveKey={defaultActiveKey}
//             expandIconPosition="end"
//             expandIcon={({ isActive }) =>
//                 isActive
//                     ? <MinusCircleOutlined style={{ fontSize: '24px', color: "#9F854E" }} />
//                     : <PlusCircleOutlined style={{ fontSize: '24px', color: "#9F854E" }} />
//             }
//         />
//     );
// };

// export default Answers;