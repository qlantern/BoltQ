import React, { useState } from 'react';
import { Search, Menu, User, MessageCircle, Heart, Globe } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-coral-500">TeachBnB</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center max-w-md w-full mx-8">
            <div className="relative w-full">
              <div className="flex items-center border border-gray-300 rounded-full hover:shadow-md transition-shadow duration-200">
                <input
                  type="text"
                  placeholder="Search teachers, subjects, or locations..."
                  className="flex-1 px-6 py-3 rounded-l-full focus:outline-none"
                />
                <button className="bg-coral-500 text-white p-3 rounded-r-full hover:bg-coral-600 transition-colors duration-200">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-coral-500 transition-colors duration-200">
              <Globe className="h-4 w-4 mr-1" />
              EN
            </button>

            <button className="text-gray-700 hover:text-coral-500 transition-colors duration-200">
              <MessageCircle className="h-5 w-5" />
            </button>

            <button className="text-gray-700 hover:text-coral-500 transition-colors duration-200">
              <Heart className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow duration-200"
              >
                <Menu className="h-4 w-4" />
                <div className="bg-gray-400 rounded-full p-1">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button 
                    onClick={() => onNavigate('signup')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Sign up
                  </button>
                  <button 
                    onClick={() => onNavigate('signin')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Log in
                  </button>
                  <hr className="my-1" />
                  <button 
                    onClick={() => onNavigate('become-teacher')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Become a teacher
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Help Center
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-coral-500 transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-full">
              <input
                type="text"
                placeholder="Search teachers..."
                className="flex-1 px-4 py-2 rounded-l-full focus:outline-none"
              />
              <button className="bg-coral-500 text-white p-2 rounded-r-full hover:bg-coral-600 transition-colors duration-200">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={() => onNavigate('search')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500"
            >
              Find Teachers
            </button>
            <button 
              onClick={() => onNavigate('become-teacher')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500"
            >
              Become a Teacher
            </button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500">
              Help
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500"
            >
              Sign up
            </button>
            <button 
              onClick={() => onNavigate('signin')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;