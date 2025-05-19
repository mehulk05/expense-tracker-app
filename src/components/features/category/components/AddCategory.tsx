import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Check, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

import {
  colorOptions,
  categoryIcons,
  predefinedCategories,
} from '../constants/add-category.constant';
import { addCategory } from '../services/category.service';
import { ICategory } from '../interface/category-list.interface';

interface AddCategoryModalUIProps {
  onModalClose: () => void;
  onCreateCategory: () => void;
  categoryToEdit?: ICategory | null;

}

const AddCategoryModalUI = ({
  onModalClose,
  onCreateCategory,
    categoryToEdit = null,

}: AddCategoryModalUIProps) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('custom'); // 'custom' or 'predefined'
  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('💰');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPredefined, setSelectedPredefined] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');


    // Initialize form with category data if in edit mode
  useEffect(() => {
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name || '');
      setSelectedIcon(categoryToEdit.icon || '💰');
      setSelectedColor(categoryToEdit.color || colorOptions[0]);
      setActiveTab('custom'); // Always use custom tab for editing
    }
  }, [categoryToEdit]);

  // Handle adding a predefined category
  const handleCreateCategory = async () => {
    if (!categoryToEdit && !selectedPredefined && categoryName.trim() === '') {
      setError('Please select a category');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      let categoryData;

      if (!categoryToEdit && selectedPredefined) {
        categoryData = selectedPredefined;
      } else {
        categoryData = {
          name: categoryName,
          icon: selectedIcon,
          color: selectedColor,
        };
      }

      if (currentUser?.uid) {
        await addCategory(currentUser.uid, categoryData);
      } else {
        throw new Error('User not authenticated');
      }

      // Show success message
      setShowSuccess(true);
      setSelectedColor(colorOptions[0]);
      setSelectedPredefined(null);
      onCreateCategory();
    } catch (error: any) {
      console.error('Error saving category:', error);
      setError(error.message || 'Something went wrong while saving the category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header - Made smaller for better mobile fit */}
      <div className="relative bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-800 py-5 px-4">
        <button onClick={onModalClose} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-white text-center tracking-wide">
                    {categoryToEdit ? 'Edit Category' : 'Add Category'}

        </h1>
      </div>

      {!categoryToEdit && (
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          className={`flex-1 py-4 font-medium text-sm transition-all duration-300 ${
            activeTab === 'custom'
              ? 'text-indigo-700 border-b-2 border-indigo-700 bg-white'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('custom')}
        >
          Create Custom
        </button>
        <button
          className={`flex-1 py-4 font-medium text-sm transition-all duration-300 ${
            activeTab === 'predefined'
              ? 'text-indigo-700 border-b-2 border-indigo-700 bg-white'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('predefined')}
        >
          From Predefined
        </button>
      </div>
      )}
      

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-16 left-0 right-0 mx-auto w-4/5 bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 z-20 animate-pulse">
          <Check className="h-5 w-5 mr-2 text-emerald-600" />
            {categoryToEdit ? 'Category successfully updated!' : 'Category successfully added!'}
        </div>
      )}

      {/* Content Area - Made more compact */}
      <div className="p-5">
        {activeTab === 'custom' || categoryToEdit ? (
          /* Custom Category Form */
          <div className="space-y-4  max-h-100 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                placeholder="Enter category name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose Icon</label>
              <div className="grid grid-cols-8 gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                {categoryIcons.map((icon, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center h-9 w-9 text-xl rounded-full cursor-pointer hover:bg-white transition-all duration-150 ${
                      selectedIcon === icon ? 'bg-white ring-2 ring-indigo-500 shadow' : ''
                    }`}
                    onClick={() => setSelectedIcon(icon)}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose Color</label>
              <div className="grid grid-cols-6 gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                {colorOptions.map((color, index) => (
                  <div
                    key={index}
                    className={`h-9 w-9 rounded-full cursor-pointer border ${color.split(' ')[0]} ${
                      selectedColor === color ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="pt-3">
              {error && activeTab === 'custom' && (
                <div className="mb-4 p-3 border border-red-200 rounded-lg bg-red-50 text-red-600 text-sm flex items-start">
                  <X className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                <p className="text-sm text-gray-500 mb-2 font-medium">Preview:</p>
                <div className="flex items-center space-x-4">
                  <span
                    className={`flex items-center justify-center rounded-full text-2xl h-12 w-12 border ${selectedColor} shadow-md`}
                  >
                    {selectedIcon}
                  </span>
                  <span className="font-medium text-gray-800 text-lg">
                    {categoryName || 'Category Name'}
                  </span>
                </div>
              </div>

              <button
                className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center shadow-md ${
                  !isSubmitting
                    ? 'hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    : ''
                } ${!categoryName.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleCreateCategory}
                disabled={!categoryName.trim() || isSubmitting}
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
                    <span className="font-medium">Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    <span className="font-medium">Create Category</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Predefined Categories - Improved visibility */
          <div className="space-y-4">
            <p className="text-sm text-gray-600 italic">
              Select a predefined category to add to your expense tracker:
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 pt-1">
              {predefinedCategories.map((category, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedPredefined === category
                      ? `${category.color} border-2 transform scale-102 shadow-md`
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedPredefined(category)}
                >
                  <div
                    className={`flex items-center justify-center rounded-full h-11 w-11 bg-white shadow-sm ${selectedPredefined === category ? 'border-2 border-white' : 'border border-gray-200'}`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <span
                    className={`font-medium ${selectedPredefined === category ? (category.name === 'Utilities' ? 'text-black' : 'text-white') : 'text-gray-700'}`}
                  >
                    {category.name}
                  </span>

                  {selectedPredefined === category && (
                    <span className="ml-auto">
                      <Check
                        className={`h-5 w-5 ${category.name === 'Utilities' ? 'text-black' : 'text-white'}`}
                      />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              className={`w-full mt-4 py-3 px-4 bg-indigo-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center shadow-md ${
                !isSubmitting
                  ? 'hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  : ''
              } ${!selectedPredefined || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleCreateCategory}
              disabled={!selectedPredefined || isSubmitting}
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
                  <span className="font-medium">Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  <span className="font-medium">Add Selected Category</span>
                </>
              )}
            </button>

            {error && activeTab === 'predefined' && (
              <div className="mt-4 p-3 border border-red-200 rounded-lg bg-red-50 text-red-600 text-sm flex items-start">
                <X className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategoryModalUI;
