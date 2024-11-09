"use client";

import { faChevronUp, faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";

type Category = {
  id: number;
  name: string;
  subcategories?: Category[];
};

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
    ? "bkMainColor text-white pr-2"
    : level === 1
      ? "mainColor"
      : "primaryColor";

  return (
    <div className="my-2">
      <div
        className={`flex items-center justify-between cursor-pointer pl-2 py-2 rounded-md ${colorClass}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold">{category.name}</span>
        {hasSubcategories && (
          <span>
            {isExpanded ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </span>
        )}
      </div>
      {isExpanded && hasSubcategories && (
        <div className="mr-3">
          {category.subcategories!.map((subcat) => (
            <CategoryItem key={subcat.id} category={subcat} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoriesBox = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="max-w-lg mx-auto p-2 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 mainColor">
        <FontAwesomeIcon className="ml-3 primaryColor" icon={faFilter} />
        تصنيف
      </h2>
      <div className="mb-4 bkPrimaryColor w-full px-2 py-2 rounded-md text-white font-bold">
        <Link href={"#"}>الكل</Link>
      </div>
      <div>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} isInitiallyExpanded={true} level={0} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesBox;






// select with api dont delete this

// "use client";

// import { faChevronUp, faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// type Category = {
//   id: number;
//   name: string;
//   subcategories?: Category[];
// };

// const CategoryItem = ({
//   category,
//   onSelectCategory,
//   isInitiallyExpanded = true,
//   level = 0,
// }: {
//   category: Category;
//   onSelectCategory: (categoryId: number) => void;
//   isInitiallyExpanded?: boolean;
//   level?: number;
// }) => {
//   const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
//   const hasSubcategories = category.subcategories && category.subcategories.length > 0;

//   const colorClass = level === 0
//     ? "bkMainColor text-white pr-2"
//     : level === 1
//       ? "mainColor"
//       : "primaryColor";

//   return (
//     <div className="my-2">
//       <div
//         className={`flex items-center justify-between cursor-pointer pl-2 py-2 rounded-md ${colorClass}`}
//         onClick={() => {
//           setIsExpanded(!isExpanded);
//           onSelectCategory(category.id); // Select category when clicked
//         }}
//       >
//         <span className="font-semibold">{category.name}</span>
//         {hasSubcategories && (
//           <span>
//             {isExpanded ? (
//               <FontAwesomeIcon icon={faChevronUp} />
//             ) : (
//               <FontAwesomeIcon icon={faChevronDown} />
//             )}
//           </span>
//         )}
//       </div>
//       {isExpanded && hasSubcategories && (
//         <div className="mr-3">
//           {category.subcategories!.map((subcat) => (
//             <CategoryItem
//               key={subcat.id}
//               category={subcat}
//               onSelectCategory={onSelectCategory}
//               level={level + 1}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const CategoriesBox = ({ onCategorySelect }: { onCategorySelect: (categoryId: number) => void }) => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/categories`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const data = await response.json();
//         setCategories(data.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) return <p>Loading categories...</p>;

//   return (
//     <div className="max-w-lg mx-auto p-2 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 mainColor">
//         <FontAwesomeIcon className="ml-3 primaryColor" icon={faFilter} />
//         تصنيف
//       </h2>
//       <div className="mb-4 bkPrimaryColor w-full px-2 py-2 rounded-md text-white font-bold">
//         <Link href={"#"}>الكل</Link>
//       </div>
//       <div>
//         {categories.map((category) => (
//           <CategoryItem
//             key={category.id}
//             category={category}
//             onSelectCategory={onCategorySelect}
//             isInitiallyExpanded={true}
//             level={0}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesBox;

























