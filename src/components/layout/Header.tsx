import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-2 sm:px-4 lg:px-8">
        <div className="flex items-center">
          <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            {/* {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )} */}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};