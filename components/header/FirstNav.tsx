
import { getTimeDate } from "@/globalApiFun/DateApi"
import SocialMedia from "../socialMedia/SocialMedia"




const FirstNav = async () => {
    const data = await getTimeDate()
    const dataDay = data.data.hijri.day
    const dataWeekday = data.data.hijri.weekday.ar
    const dataMonth = data.data.hijri.month.ar
    const dataYear = data.data.hijri.year
    // const dateMday = data.data.gregorian.day
    // const dateMmonth = data.data.gregorian.month.en
    // const dateMyear = data.data.gregorian.year



    // console.log(data.data.hijri)
    return (

        <div className="bkBox py-3">
            <div className="container mx-auto justify-center
                row grid md:grid-cols-2 gap-2 sm:grid-cols-1">


                <div className=" text-center">
                    <span> {dataWeekday} </span>
                    <span> {dataDay} </span>
                    <span> {dataMonth} </span>
                    <span>{dataYear} هـ </span>
                    {/* <span> الموافق </span>
                    <span>{dateMday} </span>
                    <span>{dateMmonth} </span> */}
                    {/* <span>{dateMyear} </span> */}

                </div>



                <div className="text-center">
                    <SocialMedia />
                </div>
            </div>
        </div>

    )
}

export default FirstNav