import { ICategory } from "../../category/interface/category-list.interface";
import { Timestamp } from "firebase/firestore";
export interface IBudgetGoal {
  id: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Timestamp;
  category: ICategory;
  categoryId: string;
  status: 'active' | 'completed' | 'overdue';
  createdAt: Timestamp;
}
