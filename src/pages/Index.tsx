
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BudgetGoalCard } from "@/components/budget/BudgetGoalCard";
import { budgetGoals } from "@/lib/data";

const Index = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content ml-[240px]">
        <Header />
        <div className="page-container pt-24">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
          
          <DashboardOverview />
          
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 lg:col-span-1">
              <TransactionForm compact />
            </div>
            <ExpenseChart />
            <BudgetProgress />
            <RecentTransactions />
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight mb-4">Savings Goals</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {budgetGoals.map((goal) => (
                <BudgetGoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
