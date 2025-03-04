
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateTotalExpenses, calculateTotalIncome, formatCurrency } from "@/lib/data";
import { ArrowDown, ArrowUp, DollarSign, PieChart } from "lucide-react";

export function DashboardOverview() {
  const totalIncome = calculateTotalIncome();
  const totalExpenses = calculateTotalExpenses();
  const balance = totalIncome - totalExpenses;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
          <p className="text-xs text-muted-foreground">
            Current balance across all accounts
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUp className="h-4 w-4 text-budget-low" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-budget-low">{formatCurrency(totalIncome)}</div>
          <p className="text-xs text-muted-foreground">
            Total monthly income
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDown className="h-4 w-4 text-budget-high" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-budget-high">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">
            Total monthly expenses
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saving Rate</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            Percentage of income saved
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
