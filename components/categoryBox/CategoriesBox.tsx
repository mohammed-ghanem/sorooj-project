"use client";

import { faChevronUp, faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

type Category = {
  id: number;
  name: string;
  subcategories?: Category[];
};

const staticCategories: Category[] = [
  {
    id: 1,
    name: "العقيدة",
    subcategories: [
      {
        id: 2,
        name: "دروس فى العقيدة",
        subcategories: [
          { id: 3, name: "درس 1" },
          { id: 4, name: "درس 2" },
        ],
      },
      {
        id: 5,
        name: "محاضرات فى العقيدة",
        subcategories: [],
      },
    ],
  },
  {
    id: 6,
    name: "الفقة",
    subcategories: [
      {
        id: 7,
        name: "الفقة subcat",
        subcategories: [
          { id: 8, name: "الفقة sub sub" },
        ],
      },
      {
        id: 9,
        name: "الفقة2 subcat",
        subcategories: [],
      },
    ],
  },
];

const CategoryItem = ({
  category,
  isInitiallyExpanded = true,
  level = 0,
}: {
  category: Category;
  isInitiallyExpanded?: boolean;
  level?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  // Define color classes based on the level
  const colorClass = level === 0
    ? "bkMainColor text-white"   // Top-level categories
    : level === 1
      ? "mainColor"  // Subcategories
      : "primaryColor"; // Sub-subcategories

  return (
    <div className="my-2">
      <div
        className={`flex items-center justify-between cursor-pointer px-2 py-2 rounded-md ${colorClass}`}

      >
        <span className="font-semibold">{category.name}</span>
        {hasSubcategories && (
          <span onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
          </span>
        )}
      </div>
      {isExpanded && hasSubcategories && (
        <div className="mr-4">
          {category.subcategories!.map((subcat) => (
            <CategoryItem key={subcat.id} category={subcat} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoriesBox = () => {
  return (
    <div className="max-w-lg mx-auto p-2 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 mainColor">
        <FontAwesomeIcon className="ml-3 primaryColor" icon={faFilter} />
          تصنيف
      </h2>
      <div className="mb-4 bkPrimaryColor w-full px-2 py-2 rounded-md text-white font-bold"><Link href={"#"}>الكل</Link></div>

      <div>
        {staticCategories.map((category) => (
          <CategoryItem key={category.id} category={category} isInitiallyExpanded={true} level={0} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesBox;















// "use client";

// import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";

// type Category = {
//   id: number;
//   name: string;
//   subcategories?: Category[];
// };

// const staticCategories: Category[] = [
//   {
//     id: 1,
//     name: "العقيدة",
//     subcategories: [
//       {
//         id: 2,
//         name: "دروس فى العقيدة",
//         subcategories: [
//           { id: 3, name: "درس 1" },
//           { id: 4, name: "درس 2" },
//         ],
//       },
//       {
//         id: 5,
//         name: "محاضرات فى العقيدة",
//         subcategories: [],
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "الفقة",
//     subcategories: [
//       {
//         id: 7,
//         name: "الفقة subcat",
//         subcategories: [
//           { id: 8, name: "الفقة sub sub" },
//         ],
//       },
//       {
//         id: 7,
//         name: "الفقة2 subcat",
//         subcategories: [],
//       },
//     ],
//   },
// ];

// const CategoryItem = ({ category, isInitiallyExpanded }: { category: Category; isInitiallyExpanded?: boolean }) => {
//   const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded || false);

//   const hasSubcategories = category.subcategories && category.subcategories.length > 0;

//   return (
//     <div className="my-2 test">
//       <div
//         className="flex items-center justify-between cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <span className="font-semibold">{category.name}</span>
//         {hasSubcategories && (
//                   <span className="">
//                       {isExpanded
//                           ?
//                           <FontAwesomeIcon icon={faChevronUp} />
//                           :
//                           <FontAwesomeIcon icon={faChevronDown} />}
//                   </span>
//         )}
//       </div>
//       {isExpanded && hasSubcategories && (
//         <div className="mb-10">
//           {category.subcategories!.map((subcat) => (
//             <CategoryItem key={subcat.id} category={subcat} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const CategoriesBox = () => {
//   return (
//     <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Categories</h2>
//       <div className="parent">
//         {staticCategories.map((category, index) => (
//           <CategoryItem key={category.id} category={category} isInitiallyExpanded={index === 0} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesBox;





