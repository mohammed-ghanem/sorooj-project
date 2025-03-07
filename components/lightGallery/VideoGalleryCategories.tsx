"use client";

import { faChevronUp, faChevronDown, faFilter, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import LangUseParams from "../translate/LangUseParams";


type Category = {
  id: number;
  name: string;
  subcategories?: Category[];
  videos_count:number
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
const VideoGalleryCategories = ({
  onCategorySelect,
}: {
  onCategorySelect: (categoryId: number | null) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const lang = LangUseParams() // Access dynamic [lang] parameter

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/videos/categories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data); // Ensure backend returns all categories, including subcategories
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return
  <p className="text-center">
    <FontAwesomeIcon className="mainColor" icon={faSpinner} spin />
  </p>;

  const renderCategoryTree = (category: Category, level = 0) => {
    // Define color classes based on the level
    const colorClass = level === 0
      ? "bkMainColor text-white pr-2 py-2 rounded-[5px]"
      : level === 1
        ? "primaryColor font-bold pr-2"
        : "mainColor font-bold pr-2";
    return (
      <div key={category.id}>
        {/* Parent or Subcategory */}

        <a href={`/${lang}/video-library/${category.id}`}
          className={`my-2 block cursor-pointer ${level === 0 ? "font-bold" : "pl-1"} ${colorClass}`}
          // onClick={() => onCategorySelect(category.id)} // Pass correct ID
        >
          {category.name}
          <span className="mx-2 primaryColor">
            ( <span className="text-white">{category.videos_count}</span> )
          </span>
        </a>
        {/* Render Subcategories if available */}
        {category.subcategories && category.subcategories.length > 0 && (

          <div className="pl-1 pr-5">
            {category.subcategories!.map((subcategory) =>
              renderCategoryTree(subcategory, level + 1)
            )}
          </div>
        )}

      </div>
    );
  };
  return (
    <div className="max-w-lg mx-auto p-2 bg-white shadow-md rounded-lg">
      <h2 className="text-base font-bold mb-4 mainColor">
        <FontAwesomeIcon className="ml-3 primaryColor" icon={faFilter} />
        تصنيف الاقسام
      </h2>
      <a href={`/${lang}/video-library`}
        className="mb-4 block bkPrimaryColor w-full px-2 py-2 rounded-md text-white font-bold cursor-pointer"
        // onClick={() => onCategorySelect(null)} // Show all courses when "الكل" is clicked
      >
        الكل
      </a>
      <div>
        {categories.map((category) => renderCategoryTree(category))}
      </div>
    </div>
  )
}
export default VideoGalleryCategories
















// "use client";

// import { faChevronUp, faChevronDown, faFilter, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState, useEffect } from "react";

// type Category = { 
//   id: number;
//   name: string;
//   subcategories?: Category[];
// };

// const VideoGalleryCategories = ({
//   onCategorySelect,
// }: {
//   onCategorySelect: (categoryId: number | null) => void;
// }) => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/videos/categories`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const data = await response.json();
//         setCategories(data.data); // Ensure backend returns all categories, including subcategories
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) {
//     return (
//       <p className="text-center">
//         <FontAwesomeIcon className="mainColor" icon={faSpinner} spin />
//       </p>
//     );
//   }

//   const handleCategorySelect = (categoryId: number | null) => {
//     setSelectedCategory(categoryId); // Update the state to track the selected category
//     onCategorySelect(categoryId); // Call the parent function to handle selection
//   };

//   const renderCategoryTree = (category: Category, level = 0) => {
//     const colorClass = level === 0
//       ? "bkMainColor text-white pr-2 py-2 rounded-[5px]"
//       : level === 1
//         ? "primaryColor font-bold pr-2"
//         : "mainColor font-bold pr-2";

//     return (
//       <div key={category.id}>
//         <div
//           className={`my-2 cursor-pointer ${level === 0 ? "font-bold" : "pl-1"} ${colorClass}`}
//           onClick={() => handleCategorySelect(category.id)}
//         >
//           {category.name}
//         </div>
//         {category.subcategories && category.subcategories.length > 0 && (
//           <div className="pl-1 pr-5">
//             {category.subcategories.map((subcategory) =>
//               renderCategoryTree(subcategory, level + 1)
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-lg mx-auto p-2 bg-white shadow-md rounded-lg">
//       <h2 className="text-base font-bold mb-4 mainColor">
//         <FontAwesomeIcon className="ml-3 primaryColor" icon={faFilter} />
//         تصنيف الاقسام
//       </h2>
//       <div
//         className="mb-4 bkPrimaryColor w-full px-2 py-2 rounded-md text-white font-bold cursor-pointer"
//         onClick={() => handleCategorySelect(null)} // Show all courses when "الكل" is clicked
//       >
//         الكل
//       </div>
//       <div>
//         {categories.map((category) => {
//           // If a category is selected, only render that category's tree
//           if (selectedCategory === null || category.id === selectedCategory) {
//             return renderCategoryTree(category);
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default VideoGalleryCategories;