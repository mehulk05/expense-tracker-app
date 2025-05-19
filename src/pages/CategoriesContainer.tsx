import { useEffect, useState } from 'react';
import { 
  Plus, X, Check, ChevronRight, ShoppingBag, Utensils, Car, Film, 
  Receipt, Stethoscope, Plane, GraduationCap, Search, MoreVertical, Edit,
  Loader,
  Trash
} from 'lucide-react';
import AddCategoryModalUI from '@/components/features/category/components/AddCategory';
import { ICategory } from '@/components/features/category/interface/category-list.interface';
import { deleteCategory, getCategoriesByUserId } from '@/components/features/category/services/category.service';
import { useAuth } from '@/hooks/useAuth';
import DeleteConfirmation from '@/shared/component/DeleteConfirmation';

const CategoriesContainer = () => {
  const { currentUser } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const iconOptions = [
    { id: 'shopping', icon: <ShoppingBag size={24} /> },
    { id: 'food', icon: <Utensils size={24} /> },
    { id: 'transport', icon: <Car size={24} /> },
    { id: 'entertainment', icon: <Film size={24} /> },
    { id: 'bills', icon: <Receipt size={24} /> },
    { id: 'health', icon: <Stethoscope size={24} /> },
    { id: 'travel', icon: <Plane size={24} /> },
    { id: 'education', icon: <GraduationCap size={24} /> }
  ];

   // Filter categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
   // Fetch categories from Firestore
  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!currentUser?.uid) return;
      const categories = await getCategoriesByUserId(currentUser.uid);
      
      setCategories(categories);
      setFilteredCategories(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteCategory = (category: ICategory) => {
    setShowDeleteConfirmation(true);
    setSelectedCategory(category)
    
  };

   const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSelectedCategory(null)
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    if (currentUser?.uid && selectedCategory) {
      try {
        await deleteCategory(currentUser.uid, selectedCategory.id);
        setShowDeleteConfirmation(false);
        fetchCategories();
      } catch (err) {
        console.error('Error deleting category:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  }

  const renderCategoryIcon = (iconId: string) => {
    const iconObj = iconOptions.find(opt => opt.id === iconId);
    return iconObj ? iconObj.icon : <ShoppingBag size={24} />;
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);

  }

  const handleCreateCategory = () => {
    setIsModalOpen(false);
    fetchCategories();
    setSelectedCategory(null);

  }


  const handleEditCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };
    // Skeleton loader for categories
  const CategorySkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="flex items-center justify-between p-4 border-b border-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-16 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
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
            <h1 className="text-3xl font-bold">Expense Categories</h1>
            <p className="text-indigo-100">Organize your spending with custom categories</p>
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
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="font-medium">New Category</span>
        </button>
      </div>
      
      {/* Main content */}
     
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
              <span className="text-gray-600">Loading categories...</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Categories grid */}
            {filteredCategories.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                    <div className="flex items-center justify-between p-4 border-b border-gray-50">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: category.color + '15' }}
                        >
                          <div className="text-2xl" style={{ color: category.color }}>
                            {renderCategoryIcon(category.icon)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          {/* <p className="text-sm text-gray-500">Budget: ${category.budget}</p> */}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                        onClick={() => handleEditCategory(category)} 
                        className="p-1.5 cursor-pointer rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDeleteCategory(category)} className="p-1.5 cursor-pointer rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100">
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-indigo-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No categories found</h3>
                <p className="text-gray-500 max-w-md mb-6">
                  {searchQuery.trim() !== '' 
                    ? "We couldn't find any categories matching your search. Try adjusting your search terms or create a new category."
                    : "You don't have any categories yet. Create your first category to get started."}
                </p>
                <button 
                  onClick={() => {setIsModalOpen(true); setSearchQuery('');setSelectedCategory(null);}}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  <span>Create new category</span>
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Add Category Modal with enhanced UI */}
      {isModalOpen && (
        <div className="fixed inset-1 bg-transparent bg-opacity-20 backdrop-blur-sm  p-4 z-50">
         <div className="flex items-start mt-20 justify-center p-4 z-50">

          <AddCategoryModalUI
            onModalClose={handleModalClose}
            onCreateCategory={handleCreateCategory}
            categoryToEdit={selectedCategory}

          />
        </div>
        </div>
      )}
    </div>

      {showDeleteConfirmation && (
        <DeleteConfirmation
              isOpen={showDeleteConfirmation}
              title='Delete Payment Method'
              message='Are you sure you want to delete this payment method?'
              isDeleting={isDeleting}
              onClose={closeDeleteConfirmation}
              onConfirm={confirmDelete}
        />
)}

    </>
  );


};


export default CategoriesContainer;