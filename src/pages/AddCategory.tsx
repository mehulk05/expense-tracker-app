import AddCategoryUI from '@/components/features/category/components/AddCategory';
import { ICategory } from '@/components/features/category/interface/category-list.interface';
import { getCategoryById } from '@/components/features/category/services/category.service';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState<null | ICategory>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCategorySuccess = () => {
    navigate('/dashboard/category-list');
  };

  const fetchCategory = async (id: string) => {
    try {
      setIsLoading(true);
      if (!currentUser || !categoryId) return;
      const category = await getCategoryById(currentUser?.uid, id);
      setSelectedCategoryToEdit(category);
    } catch (error) {
      navigate('/dashboard/category-list');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
    return () => {
      setSelectedCategoryToEdit(null);
    };
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <AddCategoryUI
        onCreateCategory={handleCreateCategorySuccess}
        categoryToEdit={selectedCategoryToEdit}
      />
    </div>
  );
};

export default AddCategory;