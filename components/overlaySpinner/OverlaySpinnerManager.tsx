"use client";

import { useState, useEffect } from "react";
import OverlaySpinner from "./OverlaySpinner";

const OverlaySpinnerManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      // Add a delay to allow the spinner animation to finish
      setTimeout(() => setIsLoading(false), 1000); // Adjust timeout as needed
    };

    // Check if the page is already loaded
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);

      // Cleanup event listener on unmount
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  return <OverlaySpinner isLoading={isLoading} />;
};

export default OverlaySpinnerManager;




// "use client";

// import { useState, useEffect } from "react";
// import OverlaySpinner from "./OverlaySpinner";
 

// const OverlaySpinnerManager: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const handlePageLoad = () => setIsLoading(false);

//     // Check if the page is already loaded
//     if (document.readyState === "complete") {
//       handlePageLoad();
//     } else {
//       window.addEventListener("load", handlePageLoad);

//       // Cleanup event listener on unmount
//       return () => window.removeEventListener("load", handlePageLoad);
//     }
//   }, []);

//   return <OverlaySpinner isLoading={isLoading} />;
// };

// export default OverlaySpinnerManager;
