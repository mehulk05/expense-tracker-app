import { IAddBudgetGoalsProps } from "../interface/add-budget-goals.interface";
import { db } from "@/firebase";
import {
  collection,
  serverTimestamp,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  getDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { IBudgetGoal } from "../interface/budget-goals.interface";

export const addBudgetGoals = async (userId: string, data: IAddBudgetGoalsProps) => {
  const categoriesCollection = collection(db, 'budget-goals');
  const payload = {
    userId,
    ...data,
    createdAt: serverTimestamp(),
  };

  return await addDoc(categoriesCollection, payload);
};

export const getBudgetGoalsByUserId = async (userId: string): Promise<IBudgetGoal[]> => {
  try {
    const budgetGoalsCollection = collection(db, 'budget-goals');
    const q = query(budgetGoalsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const budgetGoals = await Promise.all(
      querySnapshot.docs.map(async (budgetDoc) => {
        const budgetData = budgetDoc.data();
        const categoryId = budgetData.categoryId;

        let categoryData = null;
        if (categoryId) {
          const categoryRef = doc(db, 'categories', categoryId);
          const categorySnap = await getDoc(categoryRef);
          if (categorySnap.exists()) {
            categoryData = categorySnap.data();
          }
        }
        return {
          id: budgetDoc.id,
          ...budgetData,
          category: categoryData, // Replace categoryId with actual category
        };
      })
    );
    console.log({budgetGoals})

    return budgetGoals;
  } catch (error) {
    console.error('Error fetching user budget goals:', error);
    throw error;
  }
};
