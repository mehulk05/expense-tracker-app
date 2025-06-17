/**
 * Interface for the Budget Goal data structure
 */
export interface IAddBudgetGoalsProps {
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  categoryId: string;
  status: 'active' | 'completed' | 'overdue';
}