import { useEffect, useState } from 'react';
import { 
  Plus, Target, TrendingUp, Calendar, DollarSign,
  Search, Edit, Loader, Trash,} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IBudgetGoal } from '@/components/features/budget-goals/interface/budget-goals.interface';
import { dummyGoals } from '@/components/features/budget-goals/constants/budget-goals-list.constants';
import DeleteConfirmation from '@/shared/component/DeleteConfirmation';

const BudgetGoalContainer = () => {
  const navigate = useNavigate();
  
  const [budgetGoals, setBudgetGoals] = useState<IBudgetGoal[]>(dummyGoals);
  const [filteredGoals, setFilteredGoals] = useState<IBudgetGoal[]>(dummyGoals);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<IBudgetGoal | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter goals based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredGoals(budgetGoals);
    } else {
      const filtered = budgetGoals.filter(goal => 
        goal.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGoals(filtered);
    }
  }, [searchQuery, budgetGoals]);

  const handleDeleteGoal = (goal: IBudgetGoal) => {
    setShowDeleteConfirmation(true);
    setSelectedGoal(goal);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSelectedGoal(null);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    // Simulate delete operation
    setTimeout(() => {
      if (selectedGoal) {
        setBudgetGoals(prev => prev.filter(goal => goal.id !== selectedGoal.id));
      }
      setShowDeleteConfirmation(false);
      setSelectedGoal(null);
      setIsDeleting(false);
    }, 1000);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Skeleton loader for budget goals
  const BudgetGoalSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-100 rounded"></div>
          <div className="h-3 w-16 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gray-50 min-h-screen font-sans">
        {/* Header with subtle gradient */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="mx-auto px-6 py-8">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold">Budget Goals</h1>
              <p className="text-indigo-100">Track your financial goals and savings progress</p>
            </div>
          </div>
        </header>
        
        {/* Search and Add */}
        <div className="mx-auto px-6 py-6 flex justify-between items-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button 
            onClick={() => navigate("/dashboard/add-budget-goal")}
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-medium">New Goal</span>
          </button>
        </div>
        
        {/* Main content */}
        <main className="mx-auto px-6 py-6">
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-700">
              {error}
            </div>
          )}
          
          {/* Loading state */}
          {isLoading ? (
            <div>
              <div className="flex items-center justify-center mb-6">
                <Loader className="animate-spin h-6 w-6 text-indigo-500 mr-2" />
                <span className="text-gray-600">Loading budget goals...</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, index) => (
                  <BudgetGoalSkeleton key={index} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Budget Goals grid */}
              {filteredGoals.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredGoals.map((goal) => (
                    <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                              style={{ backgroundColor: `${goal.category.color}20`, color: goal.category.color }}
                            >
                              {goal.category.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{goal.category.name} Goal</h3>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(goal.status)}`}>
                                {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/dashboard/add-budget-goal/${goal.id}`)} 
                              className="p-1.5 cursor-pointer rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteGoal(goal)} 
                              className="p-1.5 cursor-pointer rounded-full text-gray-400 hover:text-red-600 hover:bg-gray-100"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">
                              {getProgressPercentage(goal.currentAmount, goal.targetAmount).toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${getProgressPercentage(goal.currentAmount, goal.targetAmount)}%`,
                                backgroundColor: goal.category.color
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <DollarSign className="w-4 h-4" />
                              <span>{formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-1 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Due: {formatDate(goal.deadline)}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-600">
                              <TrendingUp className="w-4 h-4" />
                              <span>Budget: {formatCurrency(goal.category.budget)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-10 h-10 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No budget goals found</h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    {searchQuery.trim() !== '' 
                      ? "We couldn't find any goals matching your search. Try adjusting your search terms or create a new goal."
                      : "You don't have any budget goals yet. Create your first goal to start tracking your financial progress."}
                  </p>
                  <button 
                    onClick={() => {navigate("/dashboard/add-budget-goal"); setSearchQuery(''); setSelectedGoal(null);}}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    <span>Create new goal</span>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
       {showDeleteConfirmation && (
        <DeleteConfirmation
              isOpen={showDeleteConfirmation}
              title='Delete Budget Goal'
              message='Are you sure you want to delete this budget goal?'
              isDeleting={isDeleting}
              onClose={closeDeleteConfirmation}
              onConfirm={confirmDelete}
        />)}
    </>
  );
};

export default BudgetGoalContainer;