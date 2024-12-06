"use client"

import Banners from "../banners/Banners"
import defImage from "@/public/assets/images/default.webp"; // Default image
import { faCircleQuestion, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import NewFatwaBtn from "./NewFatwaBtn";
import LangUseParams from "@/components/translate/LangUseParams";
const QustionsPage = () => {
    const lang = LangUseParams();
    return (
        <div>
            <div>
                <Banners src={defImage} textPath="سؤال وجواب" />
            </div>
            <div className="my-14 container mx-auto w-[95%] md:w-[80%] grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="col-span-2">
                    <h1 className="primaryColor font-bold ">سؤال وجواب</h1>
                    <p className="mainColor mt-3 font-bold">اليك اسئلة واجوبة وكل ما تحتاج السؤال عنة</p>
                    <div className="bkBox p-[14px] rounded-[8px] mt-5">
                        <div className="flex items-center">
                        <FontAwesomeIcon className="primaryColor ml-2 text-2xl" icon={faCircleQuestion} />
                            <h2 className="mainColor font-bold">هل لديك اسئلة اخرى ! </h2>
                        </div>
                        <p className="mainColor p-4">
                            اذا كانت لديك استفسارات اضافية فلا تتردد فى طرحها وسنقوم بالرد عليك فى اقرب وقت ممكن
                        </p>
                        <div className="text-end">
                            <NewFatwaBtn/>
                            {/* <button className="text-white bkMainColor font-bold px-[26px] py-[10px] rounded-lg">
                                طلب فتوى جديد
                            </button> */}
                        </div>
                    </div>
                </div>
                <div className="bkBox col-span-3 rounded-[10px] [box-shadow:1px_1px_7px_#ddd]">

                    <div className="questionsBox grid grid-cols-12 px-5 pt-4">
                        <p className="col-span-10 mainColor font-bold text-sm">
                            ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟
                        </p>
                        <div className="col-span-2 text-left">
                            <Link className=" primaryColor border-b-2 border-customGold" href={`/${lang}/questions/1`}>
                                الاجابة
                                <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                            </Link>
                        </div>
                        <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
                    </div>

                    <div className="questionsBox grid grid-cols-12 px-5 pt-4">
                        <p className="col-span-10 mainColor font-bold text-sm">
                            ما هي القواعد الشرعية المتعلقة برعاية الوالدين في حال عدم قدرتهم على الاعتناء بأنفسهم وماذا نفعل تجاههم لارضائهم؟
                        </p>
                        <div className="col-span-2 text-left">
                            <Link className=" primaryColor border-b-2 border-customGold" href={`#`}>
                                الاجابة
                                <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                            </Link>
                        </div>
                        <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
                    </div>

                    <div className="questionsBox grid grid-cols-12 px-5 pt-4">
                        <p className="col-span-10 mainColor font-bold text-sm">
                            ما هي المسؤوليات الدينية تجاه الوالدين الذين يحتاجون إلى المساعدة؟
                        </p>
                        <div className="col-span-2 text-left">
                            <Link className=" primaryColor border-b-2 border-customGold" href={`#`}>
                                الاجابة
                                <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                            </Link>
                        </div>
                        <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
                    </div>

                    <div className="questionsBox grid grid-cols-12 px-5 pt-4">
                        <p className="col-span-10 mainColor font-bold text-sm">
                            كيف يجب أن يتعامل الأبناء مع والديهم عندما يصبحون غير قادرين على العناية بأنفسهم؟
                        </p>
                        <div className="col-span-2 text-left">
                            <Link className=" primaryColor border-b-2 border-customGold" href={`#`}>
                                الاجابة
                                <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                            </Link>
                        </div>
                        <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
                    </div>

                    <div className="questionsBox grid grid-cols-12 px-5 pt-4">
                        <p className="col-span-10 mainColor font-bold text-sm">
                            ما هي الأحكام الشرعية التي تنظم خدمة الوالدين في حالات العجز؟
                        </p>
                        <div className="col-span-2 text-left">
                            <Link className=" primaryColor border-b-2 border-customGold" href={`#`}>
                                الاجابة
                                <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                            </Link>
                        </div>
                        <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
                    </div>

                    <div className="questionsBox grid grid-cols-12 px-5 pt-4">
                        <p className="col-span-10 mainColor font-bold text-sm">
                            كيف يمكن للأبناء تقديم الدعم لوالديهم عندما لا يستطيعون الاعتناء بأنفسهم؟
                        </p>
                        <div className="col-span-2 text-left">
                            <Link className=" primaryColor border-b-2 border-customGold" href={`#`}>
                                الاجابة
                                <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                            </Link>
                        </div>
                        <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
                    </div>

                    <div className="questionsBox grid grid-cols-12 px-5 pt-4">
                        <p className="col-span-10 mainColor font-bold text-sm">
                            ما هي الحقوق والواجبات المتعلقة برعاية الوالدين في حال عدم قدرتهم على الخدمة الذاتية؟
                        </p>
                        <div className="col-span-2 text-left">
                            <Link className=" primaryColor border-b-2 border-customGold" href={`#`}>
                                الاجابة
                                <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                            </Link>
                        </div>
                        <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QustionsPage