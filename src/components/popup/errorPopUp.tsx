"use client";

import { useEffect, useState } from "react";
import { usePopUpStore } from "@/store/popUpStore";

const ErrorPopUp = () => {
  const { error, setError } = usePopUpStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setError(null), 400);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error, setError]);

  return (
    <div
      className={`w-full bg-red-500 fixed transition-opacity duration-400  text-white font-semibold p-2 text-center z-50 shadow-lg ${
        visible && error ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {error}
    </div>
  );
};

export default ErrorPopUp;
