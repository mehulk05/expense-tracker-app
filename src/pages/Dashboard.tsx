// Dashboard.jsx

import { CircleDollarSign, CreditCard, TrendingUp } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const userName = currentUser?.displayName || 'User';

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome, {userName}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-sm p-6 flex">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-4">
            <CircleDollarSign size={24} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Spending</p>
            <div className="flex items-end">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$2,500.00</h3>
              <span className="ml-2 text-xs text-green-500">+5.2% from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-sm p-6 flex">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
            <TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Budget</p>
            <div className="flex items-end">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$3,000.00</h3>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">83% used</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-sm p-6 flex">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-4">
            <CreditCard size={24} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Top Category</p>
            <div className="flex items-end">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Groceries</h3>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">$650</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Monthly Spending
        </h2>
        <div className="h-64 w-full flex items-end space-x-6 px-4">
          <div className="h-full flex flex-col justify-between">
            <span className="text-xs text-gray-500">$2600</span>
            <span className="text-xs text-gray-500">$1950</span>
            <span className="text-xs text-gray-500">$1300</span>
            <span className="text-xs text-gray-500">$650</span>
            <span className="text-xs text-gray-500">$0</span>
          </div>
          <div className="h-3/4 w-16 bg-indigo-600 rounded-t-lg relative group">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded invisible group-hover:visible">
              $1,950
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              Jan
            </div>
          </div>
          <div className="h-1/2 w-16 bg-indigo-600 rounded-t-lg relative group">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded invisible group-hover:visible">
              $1,300
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              Feb
            </div>
          </div>
          <div className="h-1/3 w-16 bg-indigo-600 rounded-t-lg relative group">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded invisible group-hover:visible">
              $850
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              Mar
            </div>
          </div>
          <div className="h-2/3 w-16 bg-indigo-600 rounded-t-lg relative group">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded invisible group-hover:visible">
              $1,750
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              Apr
            </div>
          </div>
          <div className="h-4/5 w-16 bg-indigo-600 rounded-t-lg relative group">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded invisible group-hover:visible">
              $2,100
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              May
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Expenses
          </h3>
          <div className="space-y-4">
            {[
              { category: 'Groceries', amount: 120.5, date: '2 days ago' },
              { category: 'Dining', amount: 45.75, date: '3 days ago' },
              { category: 'Transportation', amount: 35.0, date: '1 week ago' },
            ].map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {expense.category.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {expense.category}
                    </p>
                    <p className="text-xs text-gray-500">{expense.date}</p>
                  </div>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 rounded-lg transition-colors">
            View All Expenses
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Budget Status
          </h3>
          <div className="space-y-6">
            {[
              { category: 'Groceries', spent: 650, total: 800, percentage: 81 },
              { category: 'Entertainment', spent: 150, total: 300, percentage: 50 },
              { category: 'Utilities', spent: 230, total: 250, percentage: 92 },
            ].map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {budget.category}
                  </span>
                  <span className="text-gray-500">
                    ${budget.spent} / ${budget.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      budget.percentage > 90
                        ? 'bg-red-500'
                        : budget.percentage > 75
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${budget.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 rounded-lg transition-colors">
            Manage Budgets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
