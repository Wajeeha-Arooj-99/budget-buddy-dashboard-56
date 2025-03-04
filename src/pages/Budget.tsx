
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { BudgetGoalCard } from "@/components/budget/BudgetGoalCard";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { budgetGoals, budgets, calculateCategoryTotal, calculateTotalExpenses, calculateTotalIncome, categories, formatCurrency, getCategoryById } from "@/lib/data";
import { Plus } from "lucide-react";

const Budget = () => {
  const totalIncome = calculateTotalIncome();
  const totalExpenses = calculateTotalExpenses();
  const remainingBudget = totalIncome - totalExpenses;
  const percentageSpent = (totalExpenses / totalIncome) * 100;
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content ml-[240px]">
        <Header />
        <div className="page-container pt-24">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Budget</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Monthly Overview</CardTitle>
                  <CardDescription>Your budget for this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly spending</span>
                      <span className="font-medium">
                        {formatCurrency(totalExpenses)} <span className="text-muted-foreground">of {formatCurrency(totalIncome)}</span>
                      </span>
                    </div>
                    <Progress value={percentageSpent} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-budget-low font-medium">Remaining: {formatCurrency(remainingBudget)}</span>
                      <span className="text-muted-foreground">{Math.round(percentageSpent)}% spent</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Category Budgets</h3>
                    {budgets.map((budget) => {
                      const category = getCategoryById(budget.categoryId);
                      if (!category) return null;
                      
                      const spent = calculateCategoryTotal(budget.categoryId);
                      const percentage = Math.min((spent / budget.amount) * 100, 100);
                      
                      let statusColor = "bg-budget-low";
                      if (percentage >= 85) {
                        statusColor = "bg-budget-high";
                      } else if (percentage >= 60) {
                        statusColor = "bg-budget-medium";
                      }
                      
                      return (
                        <div key={budget.id} className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3 flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                            <p className="text-sm font-medium">{category.name}</p>
                          </div>
                          <div className="col-span-7">
                            <div className="h-2 rounded-full bg-secondary">
                              <div 
                                className={`h-full rounded-full transition-all ${statusColor}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <div className="col-span-2 text-right text-sm">
                            <span className="font-medium">{formatCurrency(spent)}</span>
                            <span className="text-muted-foreground"> / {formatCurrency(budget.amount)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Savings Goals</CardTitle>
                      <CardDescription>Track your progress towards financial goals</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      New Goal
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {budgetGoals.map((goal) => (
                      <BudgetGoalCard key={goal.id} goal={goal} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <BudgetProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
