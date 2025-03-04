
import { Budget, BudgetGoal, Category, Transaction } from "./types";

export const categories: Category[] = [
  {
    id: "c1",
    name: "Housing",
    color: "#4F46E5",
    icon: "home",
  },
  {
    id: "c2",
    name: "Transportation",
    color: "#0EA5E9",
    icon: "car",
  },
  {
    id: "c3",
    name: "Food",
    color: "#10B981",
    icon: "utensils",
  },
  {
    id: "c4",
    name: "Utilities",
    color: "#F59E0B",
    icon: "lightbulb",
  },
  {
    id: "c5",
    name: "Entertainment",
    color: "#EC4899",
    icon: "popcorn",
  },
  {
    id: "c6",
    name: "Health",
    color: "#8B5CF6",
    icon: "heart-pulse",
  },
  {
    id: "c7",
    name: "Shopping",
    color: "#F43F5E",
    icon: "shopping-bag",
  },
  {
    id: "c8",
    name: "Personal",
    color: "#6366F1",
    icon: "user",
  },
  {
    id: "c9",
    name: "Income",
    color: "#22C55E",
    icon: "wallet",
  },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    amount: 1200,
    description: "Monthly Rent",
    date: new Date(2023, 6, 1).toISOString(),
    categoryId: "c1",
    type: "expense",
  },
  {
    id: "t2",
    amount: 35,
    description: "Gas",
    date: new Date(2023, 6, 5).toISOString(),
    categoryId: "c2",
    type: "expense",
  },
  {
    id: "t3",
    amount: 85,
    description: "Grocery Shopping",
    date: new Date(2023, 6, 8).toISOString(),
    categoryId: "c3",
    type: "expense",
  },
  {
    id: "t4",
    amount: 60,
    description: "Electricity Bill",
    date: new Date(2023, 6, 10).toISOString(),
    categoryId: "c4",
    type: "expense",
  },
  {
    id: "t5",
    amount: 25,
    description: "Movie Tickets",
    date: new Date(2023, 6, 12).toISOString(),
    categoryId: "c5",
    type: "expense",
  },
  {
    id: "t6",
    amount: 3000,
    description: "Monthly Salary",
    date: new Date(2023, 6, 28).toISOString(),
    categoryId: "c9",
    type: "income",
  },
  {
    id: "t7",
    amount: 120,
    description: "Doctor's Appointment",
    date: new Date(2023, 6, 15).toISOString(),
    categoryId: "c6",
    type: "expense",
  },
  {
    id: "t8",
    amount: 150,
    description: "New Clothes",
    date: new Date(2023, 6, 18).toISOString(),
    categoryId: "c7",
    type: "expense",
  },
  {
    id: "t9",
    amount: 50,
    description: "Haircut",
    date: new Date(2023, 6, 20).toISOString(),
    categoryId: "c8",
    type: "expense",
  },
  {
    id: "t10",
    amount: 40,
    description: "Mobile Phone Bill",
    date: new Date(2023, 6, 22).toISOString(),
    categoryId: "c4",
    type: "expense",
  },
];

export const budgets: Budget[] = [
  {
    id: "b1",
    categoryId: "c1",
    amount: 1300,
    period: "monthly",
  },
  {
    id: "b2",
    categoryId: "c2",
    amount: 200,
    period: "monthly",
  },
  {
    id: "b3",
    categoryId: "c3",
    amount: 400,
    period: "monthly",
  },
  {
    id: "b4",
    categoryId: "c4",
    amount: 150,
    period: "monthly",
  },
  {
    id: "b5",
    categoryId: "c5",
    amount: 100,
    period: "monthly",
  },
  {
    id: "b6",
    categoryId: "c6",
    amount: 200,
    period: "monthly",
  },
  {
    id: "b7",
    categoryId: "c7",
    amount: 100,
    period: "monthly",
  },
  {
    id: "b8",
    categoryId: "c8",
    amount: 100,
    period: "monthly",
  },
];

export const budgetGoals: BudgetGoal[] = [
  {
    id: "g1",
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 5000,
    endDate: new Date(2023, 11, 31).toISOString(),
    color: "#4F46E5",
  },
  {
    id: "g2",
    name: "New Laptop",
    targetAmount: 1500,
    currentAmount: 800,
    endDate: new Date(2023, 9, 30).toISOString(),
    color: "#0EA5E9",
  },
  {
    id: "g3",
    name: "Vacation",
    targetAmount: 3000,
    currentAmount: 1200,
    endDate: new Date(2023, 8, 15).toISOString(),
    color: "#EC4899",
  },
];

// Helper functions
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

export const getTransactionsByCategory = (categoryId: string): Transaction[] => {
  return transactions.filter((transaction) => transaction.categoryId === categoryId);
};

export const getBudgetByCategory = (categoryId: string): Budget | undefined => {
  return budgets.find((budget) => budget.categoryId === categoryId);
};

export const calculateTotalIncome = (): number => {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const calculateTotalExpenses = (): number => {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const calculateCategoryTotal = (categoryId: string): number => {
  return transactions
    .filter((transaction) => transaction.categoryId === categoryId)
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const getCategorySpendingData = (): { name: string; value: number; color: string }[] => {
  return categories
    .filter((category) => category.id !== "c9") // Exclude income category
    .map((category) => {
      const total = calculateCategoryTotal(category.id);
      return {
        name: category.name,
        value: total,
        color: category.color,
      };
    })
    .filter((item) => item.value > 0);
};

export const getRecentTransactions = (limit: number = 5): Transaction[] => {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
