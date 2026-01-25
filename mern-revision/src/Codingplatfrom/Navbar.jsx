import React, { useState } from 'react';
import { Menu, X, Code2, BookOpen, Trophy, Users, Bell, Settings, Search, ChevronDown } from 'lucide-react';

export default function CodingPlatformNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-base-100 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                GeeksOfCodes
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink icon={<Code2 className="w-4 h-4" />} text="Problems" />
              <NavLink icon={<BookOpen className="w-4 h-4" />} text="Learn" />
              <NavLink icon={<Trophy className="w-4 h-4" />} text="Compete" />
              <NavLink icon={<Users className="w-4 h-4" />} text="Community" />
            </div>
          </div>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search problems, topics..."
                className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center font-semibold">
                  JD
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl py-2 z-50 border border-slate-700">
                  <a href="#" className="block px-4 py-2 hover:bg-slate-700 transition-colors duration-150">Profile</a>
                  <a href="#" className="block px-4 py-2 hover:bg-slate-700 transition-colors duration-150">Dashboard</a>
                  <a href="#" className="block px-4 py-2 hover:bg-slate-700 transition-colors duration-150">Settings</a>
                  <hr className="my-2 border-slate-700" />
                  <a href="#" className="block px-4 py-2 hover:bg-slate-700 text-red-400 transition-colors duration-150">Sign Out</a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-3 space-y-3">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-900 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <MobileNavLink icon={<Code2 className="w-4 h-4" />} text="Problems" />
            <MobileNavLink icon={<BookOpen className="w-4 h-4" />} text="Learn" />
            <MobileNavLink icon={<Trophy className="w-4 h-4" />} text="Compete" />
            <MobileNavLink icon={<Users className="w-4 h-4" />} text="Community" />
            
            <hr className="border-slate-700" />
            
            <MobileNavLink icon={<Bell className="w-4 h-4" />} text="Notifications" badge />
            <MobileNavLink icon={<Settings className="w-4 h-4" />} text="Settings" />
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-150 text-red-400">
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ icon, text }) {
  return (
    <a
      href="#"
      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-200 group"
    >
      <span className="text-slate-400 group-hover:text-blue-400 transition-colors duration-200">
        {icon}
      </span>
      <span className="text-sm font-medium group-hover:text-blue-400 transition-colors duration-200">
        {text}
      </span>
    </a>
  );
}

function MobileNavLink({ icon, text, badge }) {
  return (
    <a
      href="#"
      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-150"
    >
      <div className="flex items-center space-x-3">
        <span className="text-slate-400">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
      {badge && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
    </a>
  );
}