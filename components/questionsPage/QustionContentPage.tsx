"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banners from "../banners/Banners"
import defImage from "@/public/assets/images/default.webp"; // Default image
import NewFatwaBtn from "./NewFatwaBtn";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const QustionContentPage = () => {
    return (
        <div>
            <div>
                <Banners src={defImage} textPath="سؤال وجواب" />
            </div>
            <div className="answersContent container w-[95%] md:w-[80%] mx-auto my-16 grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-8">
                    <div className="askSection">
                        <h1 className="font-bold text-sm text-white bkPrimaryColor p-[14px] rounded-[8px] w-fit">السؤال</h1>
                        <p className="p-4 mainColor">ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</p>
                    </div>
                    <div className="answerSection">
                        <h2 className="font-bold text-sm text-white bkPrimaryColor p-[14px] rounded-[8px] w-fit">الاجابة</h2>
                        <p className="p-4 mainColor leading-[2.1]">الحمد لله والصلاة والسلام على رسول الله وعلى آله وصحبه، أما بعد:

                            فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.

                            قال السفاريني -رحمه الله- في غذاء الألباب عند كلامه على حقوق الوالدين: ومن حقوقهما خدمتهما إذا احتاجا، أو أحدهما إلى خدمة. انتهى.

                            وقال الخادمي الحنفي -رحمه الله- في بريقة محمودية متحدثاً عن حقوق الوالدين: إذا احتاجا إلى الخدمة خدمهما. انتهى.

                            وجاء في الموسوعة الفقهية: أما خدمة الولد لوالده، أو استخدام الأب لولده: فجائز بلا خلاف، بل إن ذلك من البر المأمور به شرعاً، ويكون واجباً على الولد خدمة، أو إخدام والده عند الحاجة. انتهى.

                            وعليه؛ فإن كانت أمكم محتاجة للخدمة فالواجب عليكم جميعا خدمتها؛ وعلى أختكم أن تقوم بحصتها من خدمة أمها، وتلي أمورها الخاصة التي تحتاج إلى اطلاع على العورات، ونحو ذلك، لكون عورة المرأة مع المرأة أخف من عورتها مع الرجال المحارم، ولكون الأمّ أوصت بذلك؛ لكن إذا منعها زوجها من خدمة أمها؛ فهي معذورة، وعليها أن تقوم بما تقدر عليه من البر، والإحسان، وتستأجر من تقوم بخدمة أمّها، أو تساهم في أجرتها إن أمكنها ذلك، وراجع الفتوى: 190983.

                            ولا ينبغي للزوج أن يمنع زوجته من خدمة أمّها؛ لكن إذا تعارض ذلك مع حقّه فله منعها؛ لأنّ حق الزوج آكد من حقّ الوالدين، قال ابن تيمية -رحمه الله: الْمَرْأَةُ إذَا تَزَوَّجَتْ كَانَ زَوْجُهَا أَمْلَكَ بِهَا مِنْ أَبَوَيْهَا، وَطَاعَةُ زَوْجِهَا عَلَيْهَا أَوْجَبُ. انتهى من مجموع الفتاوى.

                            وإذا دعت الحاجة إلى قيام الأبناء بخدمة أمّهم في الأمور التي فيها اطلاع على العورة ونحو ذلك؛ فلا حرج عليهم في هذه الحال، قال الرحيباني -رحمه الله- في مطالب أولي النهى: ولطبيب، ومن يلي خدمة مريض، أو أقطع يدين، ولو أنثى، في وضوء، واستنجاء نظر، ومس ما دعت إليه حاجة حتى الفرج؛ لأن ذلك موضع حاجة. انتهى.

                            والله أعلم.</p>
                        <audio controls className="w-[80%] md:w-full">
                            <source src="horse.mp3" type="audio/mpeg" />
                        </audio>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <div className="bkBox p-[14px] rounded-[8px] mt-5">
                        <div className="flex items-center">
                            <FontAwesomeIcon className="primaryColor ml-2 text-2xl" icon={faCircleQuestion} />
                            <h2 className="mainColor font-bold">هل لديك اسئلة اخرى ! </h2>
                        </div>
                        <p className="mainColor p-4">
                            اذا كانت لديك استفسارات اضافية فلا تتردد فى طرحها وسنقوم بالرد عليك فى اقرب وقت ممكن
                        </p>
                        <div className="text-end">
                            <NewFatwaBtn />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QustionContentPage