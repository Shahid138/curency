import { ExternalLink, Moon, Sun } from "lucide-react";
import React from "react";

const Footer = ({ toggleTheme, isDarkMode }) => {
  return (
    <footer className="py-6 pt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-100">Built by</span>
              <a 
                href="https://linktr.ee/QTshahid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Shahid
                <ExternalLink size={16} />
              </a>
            </div>
            
            <a 
              href="https://yoursystemdesign.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center -mt-3 -ml-5 gap-1 text-gray-800 dark:text-gray-100 hover:text-blue-800 transition-colors"
            >
              System Design
              <ExternalLink size={15} />
            </a>
          </div>  
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun size={18} className="text-yellow-300" />
            ) : (
              <Moon size={18} className="text-blue-300" />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;