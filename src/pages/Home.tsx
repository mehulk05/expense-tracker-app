import { useEffect } from "react";

import { BarChart3, ChevronRight, PieChart, TrendingUp, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LoginForm from '@/components/features/auth/Login';
import { useAuth } from "@/hooks/useAuth";

const ElegantExpenseTracker = () => {
  const { currentUser, isLoading: loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, loading, navigate]);
    
  if (loading) return null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex flex-col">
      {/* Header/Navbar */}
      <header className="w-full py-5 px-8 bg-white dark:bg-gray-900 shadow-md backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              ExpenseTracker
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Sign in card */}
            <div className="w-full lg:w-2/5 order-2 lg:order-1">
          
              <LoginForm/>
            </div>
            
            {/* Right side - App info */}
            <div className="w-full lg:w-3/5 order-1 lg:order-2 space-y-8 text-center lg:text-left">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Financial clarity <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">within reach</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Experience a beautifully designed platform that transforms how you track expenses, manage budgets, and achieve your financial goals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-indigo-900">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Visual Reports</h3>
                  <p className="text-gray-500 dark:text-gray-400">See where your money goes with intuitive visualizations</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-indigo-900">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <PieChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Budget Planning</h3>
                  <p className="text-gray-500 dark:text-gray-400">Set and manage your budgets with precision</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-indigo-900">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Track Trends</h3>
                  <p className="text-gray-500 dark:text-gray-400">Analyze spending patterns over time</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-indigo-900">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Save Money</h3>
                  <p className="text-gray-500 dark:text-gray-400">Identify opportunities to save and grow wealth</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start">
                <div className="flex items-center bg-white dark:bg-gray-800 py-2 px-4 rounded-full shadow-sm">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Trusted by 10,000+ users</span>
                  <ChevronRight className="h-4 w-4 ml-1 text-indigo-500 dark:text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                ExpenseTracker
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElegantExpenseTracker;