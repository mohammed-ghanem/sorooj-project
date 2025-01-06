import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Member {
  id: number;
  name: string;
  position: string;
  image: string;
}

const Mangement = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showManagement, setShowManagement] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hide-section-members status
        const hideSectionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/hide-section-members`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (hideSectionResponse.data.data === "true") {
          setShowManagement(true);

          // Fetch management members
          const membersResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/management-members`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          setMembers(membersResponse.data.data);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!showManagement) {
    return null; // Don't render the section if showManagement is false
  }

  return (
    <section className="managements mb-10 mt-4">
      <h6 className="text-base mx-auto mb-10 md:text-2xl font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]">
        اعضاء مجلس الادارة
      </h6>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-10 w-[95%] lg:w-[80%] text-center items-center">
        {members.length > 0
          ? members.map((member) => (
              <div
                key={member.id}
                className="bkPrimaryColor overflow-hidden p-[2px] w-[80%] mx-auto md:w-[95%] rounded-tl-[18px] rounded-br-[18px] rounded-tr-none rounded-bl-none [box-shadow:1px_1px_7px_#ddd]"
              >
                <div className="bkBox overflow-hidden rounded-tl-[18px] rounded-br-[18px] rounded-tr-none rounded-bl-none">
                  <div className="flex justify-center">
                    <Image
                      className="w-[80%] h-[180px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none mt-[20px]"
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="pb-3">
                    <h4 className="mainColor mt-3 ">{member.name}</h4>
                    <p className="mainColor text-sm mt-3">{member.position}</p>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </section>
  );
};

export default Mangement;
