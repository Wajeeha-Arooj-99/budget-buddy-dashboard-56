
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, formatCurrency, formatDate, getCategoryById, transactions as allTransactions } from "@/lib/data";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [transactionType, setTransactionType] = useState<string>("all");
  
  // Filter transactions based on search query, category, and type
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || transaction.categoryId === selectedCategory;
    const matchesType = transactionType === "all" || transaction.type === transactionType;
    return matchesSearch && matchesCategory && matchesType;
  });
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content ml-[240px]">
        <Header />
        <div className="page-container pt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8 w-full md:w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="flex gap-4">
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-secondary/50 px-4 py-3 text-sm font-medium grid grid-cols-12">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-3">Category</div>
                  <div className="col-span-3 text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => {
                      const category = getCategoryById(transaction.categoryId);
                      return (
                        <div 
                          key={transaction.id} 
                          className="px-4 py-3 grid grid-cols-12 items-center hover:bg-muted/40 transition-colors"
                        >
                          <div className="col-span-6">
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                          </div>
                          <div className="col-span-3">
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-2.5 w-2.5 rounded-full" 
                                style={{ backgroundColor: category?.color }}
                              />
                              <span className="text-sm">{category?.name}</span>
                            </div>
                          </div>
                          <div 
                            className={`col-span-3 text-right font-medium ${
                              transaction.type === "expense" ? "text-budget-high" : "text-budget-low"
                            }`}
                          >
                            {transaction.type === "expense" ? "-" : "+"}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center p-8">
                      <p className="text-muted-foreground">No transactions found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <TransactionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
