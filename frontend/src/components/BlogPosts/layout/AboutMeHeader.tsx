import React, { useState } from 'react';

// Header Component
const AboutMeHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="py-6 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-sky-700 to-sky-600 flex justify-between items-center text-white py-4 px-8 rounded-xl shadow-lg">
          {/* Logo */}
          <div className="font-bold text-2xl tracking-wider flex items-center">
            <span className="hidden sm:inline">Nikola Nikolovski</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-m font-semibold">
            <a href="#" className="hover:text-sky-100 transition-colors duration-300 border-b-2 border-transparent hover:border-white pb-1">About</a>
            <a href="#" className="hover:text-sky-100 transition-colors duration-300 border-b-2 border-transparent hover:border-white pb-1">Portfolio</a>
            <a href="/blogs" className="hover:text-sky-100 transition-colors duration-300 border-b-2 border-transparent hover:border-white pb-1">Blogs</a>
            <a href="#" className="bg-white text-sky-700 hover:bg-sky-100 transition-colors duration-300 py-2 px-4 rounded-lg font-bold">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white mt-2 rounded-xl shadow-lg overflow-hidden">
            <nav className="flex flex-col text-sky-700 font-semibold">
              <a href="#" className="py-3 px-6 hover:bg-sky-50 border-b border-sky-100">About</a>
              <a href="#" className="py-3 px-6 hover:bg-sky-50 border-b border-sky-100">Portfolio</a>
              <a href="/blogs" className="py-3 px-6 hover:bg-sky-50 border-b border-sky-100">Blogs</a>
              <a href="#" className="py-3 px-6 hover:bg-sky-50 text-center font-bold">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AboutMeHeader;
