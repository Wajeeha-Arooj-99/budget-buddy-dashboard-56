
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 flex items-center px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">BudgetTracker</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
