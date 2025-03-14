import { Dot } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="mt-20">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
        {/* Left side - Logo and title */}
        <div className="flex items-center">
          <img src="/logo.png" className="size-8 mr-2" alt="Currencee logo" />
          <div>
            <h1 className="font-bold text-white text-4xl">Currencee</h1>
            <p className="text-white text-sm">
              The world's most trusted, fast and secure currency converter
            </p>
          </div>
        </div>

        {/* Right side - API status */}
        <div className="flex items-center text-white border border-gray-800 bg-[#111010] pr-5 rounded-lg text-[14px]">
          <Dot size={45} className="text-green-500 animate-pulse" />
          API USAGE
        </div>
      </div>
    </header>
  );
};

export default Header;