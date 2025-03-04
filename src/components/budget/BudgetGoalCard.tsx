
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetGoal } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface BudgetGoalCardProps {
  goal: BudgetGoal;
}

export function BudgetGoalCard({ goal }: BudgetGoalCardProps) {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-base font-medium">{goal.name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Pencil className="h-3.5 w-3.5" />
            <span className="sr-only">Edit goal</span>
          </Button>
        </div>
        <CardDescription>
          {goal.endDate ? `Target date: ${formatDate(goal.endDate)}` : "No end date"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
        <Progress value={percentage} className="h-2" style={{ "--theme-primary": goal.color } as React.CSSProperties} />
        <div className="flex justify-between text-sm pt-2">
          <span className="font-medium">{formatCurrency(goal.currentAmount)}</span>
          <span className="text-muted-foreground">of {formatCurrency(goal.targetAmount)}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button size="sm" variant="outline" className="w-full">
          Add funds
        </Button>
      </CardFooter>
    </Card>
  );
}
