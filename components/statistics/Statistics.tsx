import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Statistics = () => {
  return (
    <div className='bkColor mt-8 mb-8'>
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap justify-center">
          <div className="statisticsCard flex items-center ">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[25px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[24px]">30</p>
              <p className="mainColor font-bold opacity-50">الدورات المجانية</p>
            </div>
          </div>
          {/* ***************  for test remove this after life publish*/}
          <div className="statisticsCard flex items-center">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[25px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[24px]">30</p>
              <p className="mainColor font-bold opacity-50">الدورات المجانية</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[25px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[24px]">30</p>
              <p className="mainColor font-bold opacity-50">الدورات المجانية</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[25px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[24px]">30</p>
              <p className="mainColor font-bold opacity-50">الدورات المجانية</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[25px] ml-[20px]" /></div>
            <div>
              <p className="primaryColor font-bold text-[24px]">30</p>
              <p className="mainColor font-bold opacity-50">الدورات المجانية</p>
            </div>
          </div>
          {/* *************** */}
        </div>
      </div>
    </div>
  )
}

export default Statistics