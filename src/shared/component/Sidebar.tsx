// Sidebar.jsx
import {
  BarChart2,
  ChevronLeft,
  CircleDollarSign,
  CreditCard,
  FileText,
  Layers,
  LogOut,
  Settings,
  Target,
  User,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../constants/route.constants';

import { useAuth } from '@/hooks/useAuth';

const Sidebar: React.FC<{
  isOpen: boolean;
  isCollapsed: boolean;
  onCollapse: () => void;
  toggleSidebar: () => void;
  userName?: string;
  userEmail?: string;
}> = ({
  isOpen,
  isCollapsed,
  onCollapse,
  toggleSidebar,
  userName = 'User Name',
  userEmail = 'user@example.com',
}) => {
  const { signOut } = useAuth();

  const menuItems = [
    { icon: <BarChart2 size={22} />, label: 'Dashboard', path: ROUTES.DASHBOARD.BASE },
    { icon: <FileText size={22} />, label: 'Log Expense', path: ROUTES.DASHBOARD.LOG_EXPENSE },
    { icon: <Layers size={22} />, label: 'Categories', path: ROUTES.DASHBOARD.CATEGORIES },
    {
      icon: <CreditCard size={22} />,
      label: 'Payment Methods',
      path: ROUTES.DASHBOARD.PAYMENT_METHODS,
    },
    { icon: <Target size={22} />, label: 'Budget Goals', path: ROUTES.DASHBOARD.BUDGET_GOALS },
  ];
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white text-gray-700 shadow-md z-20 flex flex-col transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${isCollapsed ? 'w-[70px]' : 'w-[280px]'}`}
    >
      <div
        className={`px-6 py-8 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center border-b border-gray-100`}
      >
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <CircleDollarSign size={28} className={`text-indigo-600 ${isCollapsed ? '' : 'mr-2'}`} />
          {!isCollapsed && <h1 className="text-2xl font-bold text-indigo-600">SpendWise</h1>}
        </div>
        {!isCollapsed && (
          <button
            onClick={onCollapse}
            className="p-1 rounded-full hover:bg-indigo-50 hidden sm:block"
            title="Collapse Sidebar"
          >
            <ChevronLeft size={20} className="text-indigo-600" />
          </button>
        )}

        {isOpen && (
          <button
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 md:hidden"
        >
          <X size={20} className="text-indigo-600 dark:text-indigo-400" />
          </button>
        )}
      </div>

      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} mt-6`}>
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center' : ''} ${
                    isCollapsed ? 'px-2' : 'px-4'
                  } py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
                title={isCollapsed ? item.label : ''}
              >
                <span className={`${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`mt-auto ${isCollapsed ? 'px-2' : 'px-4'} mb-6`}>
        {/* <button
          onClick={() => {}}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} ${
            isCollapsed ? 'px-2' : 'px-4'
          } py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors`}
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings size={22} className={`text-gray-500 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Settings</span>}
        </button> */}
        <NavLink
          to={ROUTES.DASHBOARD.SETTINGS}
          className={({ isActive }) =>
            `w-full flex items-center ${isCollapsed ? 'justify-center' : ''} ${
              isCollapsed ? 'px-2' : 'px-4'
            } py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600 font-medium'
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
            }`
          }
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings size={22} className={`text-gray-500 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </div>

      <div className="border-t border-gray-100 py-4">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={20} className="text-indigo-600" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={20} className="text-indigo-600" />
              </div>
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-700">{userName}</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="ml-auto p-2 rounded-full hover:bg-indigo-50 transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} className="text-gray-500 hover:text-indigo-600" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
