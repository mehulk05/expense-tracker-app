import { ICategory } from "../../category/interface/category-list.interface";

export interface IBudgetGoal {
  id: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: ICategory;
  status: 'active' | 'completed' | 'overdue';
  createdAt: Date;
}