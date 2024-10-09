import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faBook, faBookOpen, faCircleQuestion, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Statistic } from "antd"


const Statistics = () => {
  return (
    <div className='bkColor mt-8 mb-8'>
      <div className="container mx-auto py-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

          <div className="statisticsCard flex items-center justify-center">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[35px]">28</p>
              <Statistic value={544}/>
              <p className="mainColor font-bold opacity-50">الدورات المجانية</p>
            </div>
          </div>
          {/* ***************  for test remove this after life publish*/}
          <div className="statisticsCard flex items-center justify-center">
            <div><FontAwesomeIcon icon={faBook}  className="primaryColor text-[40px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[35px]">41</p>
              <p className="mainColor font-bold opacity-50">الكتب والابحاث</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-center">
            <div><FontAwesomeIcon icon={faYoutube}  className="primaryColor text-[40px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[35px]">184</p>
              <p className="mainColor font-bold opacity-50">المكتبة المرئية</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-center">
            <div><FontAwesomeIcon icon={faCircleQuestion} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[35px]">98</p>
              <p className="mainColor font-bold opacity-50">سؤال وجواب</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-center">
            <div><FontAwesomeIcon icon={faUserGroup}  className="primaryColor text-[40px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[35px]">478</p>
              <p className="mainColor font-bold opacity-50">المشتركين</p>
            </div>
          </div>
          {/* *************** */}
        </div>
      </div>
    </div>
  )
}

export default Statistics