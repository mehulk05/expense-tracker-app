// Dashboard.jsx
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { currentUser, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // No need to navigate, ProtectedRoute will handle redirection
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <header className="w-full py-5 px-8 bg-white dark:bg-gray-900 shadow-md backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              ExpenseTracker
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome, {currentUser?.email || 'User'}!
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This is a placeholder for your dashboard content. You can expand this with actual
            expense tracking functionality, charts, and budgeting tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Recent Expenses</h3>
            <p className="text-gray-500 dark:text-gray-400">No recent expenses to display.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Budget Status</h3>
            <p className="text-gray-500 dark:text-gray-400">No budgets configured yet.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Spending Analysis</h3>
            <p className="text-gray-500 dark:text-gray-400">Add expenses to see your analysis.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
