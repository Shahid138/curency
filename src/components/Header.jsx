import { Dot } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl">Currencee</h1>
          <p className="text-center text-gray-600">
            The world's most trusted, fast and secure currency converter
          </p>
        </div>
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg text-sm ">
          <Dot />
          API USAGE
        </div>
      </div>
    </header>
  );
};

export default Header;
