import { IBudgetGoal } from "../interface/budget-goals.interface";

export const dummyGoals: IBudgetGoal[] = [
  {
    id: '1',
    targetAmount: 10000,
    currentAmount: 7500,
    deadline: new Date('2025-12-31'),
    category: {
      id: 'cat-1',
      name: 'Savings',
      icon: '💰',
      color: '#4CAF50',
      budget: 15000,
      userId: 'user-123',
      createdAt: new Date('2024-01-01')
    },
    status: 'active',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '2',
    targetAmount: 5000,
    currentAmount: 5000,
    deadline: new Date('2025-08-15'),
    category: {
      id: 'cat-2',
      name: 'Travel',
      icon: '✈️',
      color: '#2196F3',
      budget: 8000,
      userId: 'user-123',
      createdAt: new Date('2024-01-01')
    },
    status: 'completed',
    createdAt: new Date('2025-01-15')
  },
  {
    id: '3',
    targetAmount: 2000,
    currentAmount: 800,
    deadline: new Date('2025-07-01'),
    category: {
      id: 'cat-3',
      name: 'Electronics',
      icon: '💻',
      color: '#FF9800',
      budget: 3000,
      userId: 'user-123',
      createdAt: new Date('2024-01-01')
    },
    status: 'active',
    createdAt: new Date('2025-02-01')
  },
  {
    id: '4',
    targetAmount: 15000,
    currentAmount: 3000,
    deadline: new Date('2025-05-30'),
    category: {
      id: 'cat-4',
      name: 'Transportation',
      icon: '🚗',
      color: '#9C27B0',
      budget: 20000,
      userId: 'user-123',
      createdAt: new Date('2024-01-01')
    },
    status: 'overdue',
    createdAt: new Date('2025-01-10')
  }
];