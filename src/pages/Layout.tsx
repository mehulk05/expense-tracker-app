// src/layouts/DashboardLayout.jsx
import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import Header from '@/shared/component/Header';
import Sidebar from '@/shared/component/Sidebar';

const Layout = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const collapseSidebar = () => setIsSidebarCollapsed(true);
  const expandSidebar = () => setIsSidebarCollapsed(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const userName = currentUser?.displayName || 'User';
  const userEmail = currentUser?.email || 'user@example.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onCollapse={collapseSidebar}
        userName={userName}
        userEmail={userEmail}
      />

      <Header
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onExpand={expandSidebar}
        userName={userName}
      />

      <main
        className={`pt-20 transition-all duration-300 pr-5 pb-5 ${
          isSidebarCollapsed ? 'md:pl-[90px]' : 'md:pl-[300px]'
        }`}
      >
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
