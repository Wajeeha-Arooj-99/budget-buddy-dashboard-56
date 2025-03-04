
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, getCategoryById, getRecentTransactions } from "@/lib/data";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function RecentTransactions() {
  const transactions = getRecentTransactions(5);
  
  return (
    <Card className="col-span-1 lg:col-span-2 overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/transactions">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add transaction</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const category = getCategoryById(transaction.categoryId);
              return (
                <div key={transaction.id} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: category?.color }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category?.name} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <p 
                    className={transaction.type === "expense" ? "text-sm font-medium text-budget-high" : "text-sm font-medium text-budget-low"}
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No recent transactions</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" asChild className="w-full">
          <Link to="/transactions" className="flex w-full items-center justify-center gap-1">
            View all transactions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
