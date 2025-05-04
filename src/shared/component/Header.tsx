// Header.jsx
import { useState } from 'react';

import { Bell, Menu, X, Moon, Sun, ChevronRight } from 'lucide-react';

const Header: React.FC<{
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isCollapsed: boolean;
  userName?: string;
  onExpand: () => void;
}> = ({ toggleSidebar, isSidebarOpen, isCollapsed, onExpand, userName = 'User Name' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would add dark mode functionality here
    // document.documentElement.classList.toggle('dark');
  };

  return (
    <header
      className={`fixed top-0 right-0 w-full ${
        isCollapsed ? 'md:w-[calc(100%-70px)]' : 'md:w-[calc(100%-280px)]'
      } py-4 px-6 bg-white dark:bg-gray-900 shadow-sm backdrop-blur-sm bg-opacity-90 z-10 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 md:hidden"
          >
            {isSidebarOpen ? (
              <X size={20} className="text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Menu size={20} className="text-indigo-600 dark:text-indigo-400" />
            )}
          </button>

          {isCollapsed && (
            <button
              onClick={onExpand}
              className="mr-4 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hidden md:block"
              title="Expand Sidebar"
            >
              <ChevronRight size={20} className="text-indigo-600 dark:text-indigo-400" />
            </button>
          )}

          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-indigo-400" />
            ) : (
              <Moon size={20} className="text-indigo-600" />
            )}
          </button>

          <button className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 relative">
            <Bell size={20} className="text-indigo-600 dark:text-indigo-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-2 ml-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
