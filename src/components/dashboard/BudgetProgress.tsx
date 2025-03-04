
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { budgets, calculateCategoryTotal, categories, formatCurrency, getCategoryById } from "@/lib/data";
import { Budget } from "@/lib/types";
import { cn } from "@/lib/utils";

function BudgetItem({ budget }: { budget: Budget }) {
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
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />
          <p className="text-sm font-medium">{category.name}</p>
        </div>
        <p className="text-sm">
          {formatCurrency(spent)} <span className="text-muted-foreground">/ {formatCurrency(budget.amount)}</span>
        </p>
      </div>
      <div className="h-2 rounded-full bg-secondary">
        <div 
          className={cn("h-full rounded-full transition-all", statusColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function BudgetProgress() {
  const activeBudgets = budgets.filter(budget => {
    const spent = calculateCategoryTotal(budget.categoryId);
    return spent > 0;
  }).slice(0, 5);
  
  return (
    <Card className="col-span-1 lg:col-span-2 overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Track your spending against budget</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeBudgets.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))}
          {activeBudgets.length === 0 && (
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-muted-foreground">No active budgets</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
