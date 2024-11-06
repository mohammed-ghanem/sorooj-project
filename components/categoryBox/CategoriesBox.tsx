"use client";

import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    name: "Home Appliances",
    subcategories: [
      {
        id: 7,
        name: "Kitchen Appliances",
        subcategories: [
          { id: 8, name: "Microwave Ovens" },
          { id: 9, name: "Refrigerators" },
        ],
      },
    ],
  },
];

const CategoryItem = ({ category, isInitiallyExpanded }: { category: Category; isInitiallyExpanded?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded || false);

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  return (
    <div className="my-2 test">
      <div
        className="flex items-center justify-between cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold">{category.name}</span>
        {hasSubcategories && (
                  <span className="">
                      {isExpanded
                          ?
                          <FontAwesomeIcon icon={faChevronUp} />
                          :
                          <FontAwesomeIcon icon={faChevronDown} />}
                  </span>
        )}
      </div>
      {isExpanded && hasSubcategories && (
        <div className="mb-10">
          {category.subcategories!.map((subcat) => (
            <CategoryItem key={subcat.id} category={subcat} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoriesBox = () => {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="parent">
        {staticCategories.map((category, index) => (
          <CategoryItem key={category.id} category={category} isInitiallyExpanded={index === 0} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesBox;












// "use client";

// type Category = {
//   id: number;
//   name: string;
//   subcategories?: Category[];
// };

// // Static categories data
// const staticCategories: Category[] = [
//   {
//     id: 1,
//     name: "Electronics category",
//     subcategories: [
//       {
//         id: 2,
//         name: "Mobile Phones subcategories",
//         subcategories: [
//           { id: 3, name: "Smartphones sub subcategories" },
//           { id: 4, name: "Feature Phones sub subcategories" },
//         ],
//       },
//       {
//         id: 5,
//         name: "Laptops subcategories",
//         subcategories: [],
//       },
//     ],
//     },
  
//   {
//     id: 6,
//     name: "Home Appliances",
//     subcategories: [
//       {
//         id: 7,
//         name: "Kitchen Appliances",
//         subcategories: [
//           { id: 8, name: "Microwave Ovens" },
//           { id: 9, name: "Refrigerators" },
//         ],
//       },
//     ],
//   },
// ];



// const CategoriesBox = () => {

 

//   return (
//       <div>
          
//     </div>
//   );
// };

// export default CategoriesBox;
