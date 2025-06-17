import { db } from "@/firebase";
import { collection, serverTimestamp, addDoc, getDocs, query, where, deleteDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { IAddCategoryProps } from "../interface/add-category.interface";
import { ICategory } from "../interface/category-list.interface";

/**
 * Add a category to the user's collection of categories.
 * @param {string} userId - The id of the user.
 * @param {IAddCategoryProps} data - The data of the category to be added.
 * @returns {Promise<DocumentReference<DocumentData>>} - A promise that resolves with a DocumentReference that points to the newly added category document.
 */
export const addCategory = async (userId: string, data: IAddCategoryProps) => {

 const categoriesCollection = collection(db, 'categories');
  const payload = {
    userId,
    ...data,
    createdAt: serverTimestamp(),
  };

  return await addDoc(categoriesCollection, payload);
};


/**
 * Retrieves all categories for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<any[]>} - Array of the user's categoreis
 */
export const getCategoriesByUserId = async (userId: string): Promise<ICategory[]> => {
  try {
    const categoriesCollection = collection(db, 'categories');
    const q = query(categoriesCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const categories: any[] = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return categories;
  } catch (error) {
    console.error('Error fetching user categories:', error);
    throw error;
  }
};


export const deleteCategory = async (userId: string, categoryId: string) => {
  try {
    const categoryDocRef = doc(db, 'categories', categoryId);
    
    // First check if the category belongs to the user
    const categoryDoc = await getDoc(categoryDocRef);
    if (!categoryDoc.exists() || categoryDoc.data().userId !== userId) {
      throw new Error('Category not found or does not belong to the user');
    }
    
    await deleteDoc(categoryDocRef);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};


// Add this to your category.service.ts file
export const updateCategory = async (userId: string, categoryId: string, categoryData: Partial<ICategory>) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    
    // First check if the category belongs to the user
    const categoryDoc = await getDoc(categoryRef);
    if (!categoryDoc.exists() || categoryDoc.data().userId !== userId) {
      throw new Error('Category not found or does not belong to the user');
    }
    
    await updateDoc(categoryRef, {
      ...categoryData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

/**
 * Retrieves a single category by its ID for a specific user
 * @param {string} userId - The user's ID
 * @param {string} categoryId - The category ID to retrieve
 * @returns {Promise<ICategory | null>} - The category object or null if not found
 */
export const getCategoryById = async (userId: string, categoryId: string): Promise<ICategory | null> => {
  try {
    const categoryDocRef = doc(db, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryDocRef);
    
    if (!categoryDoc.exists()) {
      return null;
    }
    
    const categoryData = categoryDoc.data();
    
    // Check if the category belongs to the user
    if (categoryData.userId !== userId) {
      throw new Error('Category not found or does not belong to the user');
    }
    
    return {
      id: categoryDoc.id,
      ...categoryData
    } as ICategory;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
};