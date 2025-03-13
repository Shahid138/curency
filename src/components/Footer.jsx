import { ExternalLink } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 mt-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Built by</span>
            <a 
              href="https://yourportfolio.com" 
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
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            System Design
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;