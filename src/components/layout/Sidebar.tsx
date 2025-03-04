
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CreditCard,
  PieChart,
  TagIcon,
  PlusCircle,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={cn("w-[240px] border-r bg-background flex flex-col fixed top-0 bottom-0 left-0 pt-16", className)}>
      <div className="flex-1 overflow-auto py-6 px-3">
        <div className="space-y-1">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 font-medium" 
            asChild
          >
            <Link to="/">
              <PlusCircle className="h-4 w-4" />
              New Transaction
            </Link>
          </Button>
        </div>
        
        <nav className="mt-6 flex flex-col gap-1">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "secondary" : "ghost"} 
              className="w-full justify-start gap-3"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/transactions">
            <Button 
              variant={isActive("/transactions") ? "secondary" : "ghost"} 
              className="w-full justify-start gap-3"
            >
              <CreditCard className="h-4 w-4" />
              Transactions
            </Button>
          </Link>
          <Link to="/budget">
            <Button 
              variant={isActive("/budget") ? "secondary" : "ghost"} 
              className="w-full justify-start gap-3"
            >
              <PieChart className="h-4 w-4" />
              Budget
            </Button>
          </Link>
          <Link to="/categories">
            <Button 
              variant={isActive("/categories") ? "secondary" : "ghost"} 
              className="w-full justify-start gap-3"
            >
              <TagIcon className="h-4 w-4" />
              Categories
            </Button>
          </Link>
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-1">
            <PieChart className="h-4 w-4 text-primary" />
          </div>
          <div className="text-sm">
            <p className="font-medium">BudgetTracker</p>
            <p className="text-xs text-muted-foreground">Your financial companion</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
