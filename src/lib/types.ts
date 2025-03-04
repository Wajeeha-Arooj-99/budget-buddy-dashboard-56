
export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  type: 'income' | 'expense';
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
};

export type BudgetGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  endDate: string | null;
  color: string;
};

export type ChartData = {
  name: string;
  value: number;
  color: string;
};
