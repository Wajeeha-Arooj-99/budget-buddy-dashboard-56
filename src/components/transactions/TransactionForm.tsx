
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/data";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { toast } from "sonner";

interface TransactionFormProps {
  onCreateTransaction?: () => void;
  className?: string;
  compact?: boolean;
}

export function TransactionForm({ onCreateTransaction, className, compact = false }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !selectedCategory) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // In a real app, we'd save the transaction to the database
    toast.success(`${type === "income" ? "Income" : "Expense"} added successfully`);
    
    // Reset form
    setDescription("");
    setAmount("");
    setType("expense");
    setSelectedCategory("");
    
    // Notify parent component
    if (onCreateTransaction) {
      onCreateTransaction();
    }
  };
  
  return (
    <Card className={cn("w-full overflow-hidden transition-all", className)}>
      <CardHeader className={cn(compact ? "p-4 pb-2" : "")}>
        <CardTitle className={compact ? "text-base" : ""}>Add Transaction</CardTitle>
        <CardDescription>Record a new expense or income</CardDescription>
      </CardHeader>
      <CardContent className={compact ? "p-4 pt-2" : ""}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as "income" | "expense")}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between text-muted-foreground"
                  >
                    {selectedCategory
                      ? categories.find((category) => category.id === selectedCategory)?.name
                      : "Select category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.id}
                          onSelect={(value) => {
                            setSelectedCategory(value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCategory === category.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            {category.name}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was this for?"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Add {type === "income" ? "Income" : "Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
