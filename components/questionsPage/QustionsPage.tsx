import Banners from "../banners/Banners"
import defImage from "@/public/assets/images/default.webp"; // Default image
import { QuestionCircleOutlined } from '@ant-design/icons';

const QustionsPage = () => {
    return (
        <div>
            <div>
                <Banners src={defImage} textPath="سؤال وجواب" />
            </div>
            <div className="mt-14 container mx-auto w-[95%] md:w-[80%] grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="col-span-2">
                    <h1 className="primaryColor font-bold ">سؤال وجواب</h1>
                    <p className="mainColor">اليك اسئلة واجوبة وكل ما تحتاج السؤال عنة</p>
                    <div className="bkBox p-[14px] rounded-[8px]">
                        <div className="flex items-center">
                            <QuestionCircleOutlined className="primaryColor" />
                            <h2 className="mainColor font-bold">هل لديك اسئلة اخرى ! </h2>
                        </div>
                        <p className="mainColor">
                            اذا كانت لديك استفسارات اضافية فلا تتردد فى طرحها وسنقوم بالرد عليك فى اقرب وقت ممكن
                        </p>
                        <div>
                            <button>استفسر الان</button>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-500 col-span-3">all ques</div>
            </div>
        </div>
    )
}

export default QustionsPage