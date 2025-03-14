import { Dot } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className=" bg-white pt-20 dark:bg-[#111010]">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
        <div className="flex items-center">
          <img src="/logo.png" className="size-8 mr-2" alt="Currencee logo" />
          <div>
            <h1 className="font-bold text-black dark:text-white text-4xl">Currencee</h1>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The world's most trusted, fast and secure currency converter
            </p>
          </div>
        </div>

        <div className="flex items-center text-gray-800 dark:text-white border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-[#111010] pr-5 rounded-lg text-[14px]">
          <Dot size={45} className="text-green-500 animate-pulse" />
          API USAGE
        </div>
      </div>
    </header>
  );
};

export default Header;