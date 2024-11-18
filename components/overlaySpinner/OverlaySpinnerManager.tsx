// components/OverlaySpinnerManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import OverlaySpinner from "./OverlaySpinner";


const OverlaySpinnerManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => setIsLoading(false);

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
