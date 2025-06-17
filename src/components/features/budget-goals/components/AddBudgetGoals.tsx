import { useEffect, useRef, useState } from 'react';
import { X, Target, Calendar, DollarSign } from 'lucide-react';
import { IBudgetGoal } from '../interface/budget-goals.interface';
import { ICategory } from '../../category/interface/category-list.interface';
import { getCategoriesByUserId } from '../../category/services/category.service';
import { useAuth } from '@/hooks/useAuth';
import { addBudgetGoals } from '../services/budget-goals.service';
import { IAddBudgetGoalsProps } from '../interface/add-budget-goals.interface';
import toast from 'react-hot-toast';

interface AddBudgetUIProps {
  onCreateBudget?: () => void;
  budgetToEdit: IBudgetGoal | null;
}

const AddBudgetUI = ({ onCreateBudget, budgetToEdit = null }: AddBudgetUIProps) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('custom');
  const [targetAmount, setTargetAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);

  const dateInputRef = useRef<null | HTMLInputElement>(null);

  const handleDateClick = () => {
    if (dateInputRef.current) {
      // Try showPicker if supported
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  // Initialize form with budget data if in edit mode
  useEffect(() => {
    if (budgetToEdit) {
      setTargetAmount(budgetToEdit.targetAmount || 0);
      setDeadline(budgetToEdit.deadline.toString() || '');
      setSelectedCategory(budgetToEdit.category || null);
      setActiveTab('custom');
    }
  }, [budgetToEdit]);

  const handleCreateBudget = async () => {
    if (targetAmount <= 0 || !deadline || !selectedCategory) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (!currentUser) return;
      const budgetData: IAddBudgetGoalsProps = {
        targetAmount,
        currentAmount: 0,
        deadline: new Date(deadline),
        categoryId: selectedCategory.id,
        status: 'active',
      };
      await addBudgetGoals(currentUser?.uid, budgetData);
      
      toast.success("Successfull added Budget Goal!")

      // Reset form
      setTargetAmount(0);
      setDeadline('');
      setSelectedCategory(null);

      if (onCreateBudget) {
        onCreateBudget();
      }
    } catch (error) {
      setError('Something went wrong while saving the budget goal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      if (!currentUser) return;
      const categories = await getCategoriesByUserId(currentUser.uid);
      setAllCategories(categories);
    };

    fetchAllCategories();
  }, []);

  return (
    <div className="">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="mx-auto px-6 py-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">
              {budgetToEdit ? 'Edit Budget Goal' : 'Add Budget Goal'}
            </h1>
          </div>
        </div>
      </header>

      <div className="p-5">
        {activeTab === 'custom' || budgetToEdit ? (
          /* Custom Budget Goal Form */
          <div className="space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Enter target amount"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    value={targetAmount}
                    onChange={e => setTargetAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline <span className="text-red-500">*</span>
                </label>
                <div className="relative hover:cursor-pointer" onClick={handleDateClick}>
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    ref={dateInputRef}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-inner max-h-80 overflow-y-auto">
                {allCategories.map(category => (
                  <div
                    key={category.id}
                    className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedCategory?.id === category.id
                        ? 'bg-white ring-2 ring-indigo-500 shadow-md'
                        : 'bg-white hover:shadow-sm border border-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-white text-xl mb-2`}
                    >
                      {category.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
              <p className="text-sm text-gray-500 mb-3 font-medium">Preview:</p>
              <div className="flex items-center space-x-4">
                {selectedCategory && (
                  <div
                    className={`w-16 h-16 rounded-full ${selectedCategory.color} flex items-center justify-center text-white text-2xl shadow-md`}
                  >
                    {selectedCategory.icon}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {selectedCategory?.name || 'Select Category'} Goal
                  </h3>
                  <p className="text-gray-600">
                    Target: ${targetAmount || '0'}{' '}
                    {deadline && `by ${new Date(deadline).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 border border-red-200 rounded-lg bg-red-50 text-red-600 text-sm flex items-start">
                <X className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center shadow-md ${
                !isSubmitting
                  ? 'hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  : ''
              } ${
                !targetAmount || !deadline || !selectedCategory || isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              onClick={handleCreateBudget}
              disabled={!targetAmount || !deadline || !selectedCategory || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="font-medium">
                    {budgetToEdit ? 'Updating...' : 'Creating...'}
                  </span>
                </>
              ) : (
                <>
                  <Target className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {budgetToEdit ? 'Update Budget Goal' : 'Create Budget Goal'}
                  </span>
                </>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddBudgetUI;
