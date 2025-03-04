
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateCategoryTotal, categories, formatCurrency } from "@/lib/data";
import { Plus, PlusCircle, Trash2 } from "lucide-react";

const Categories = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content ml-[240px]">
        <Header />
        <div className="page-container pt-24">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
          
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Organize your expenses with custom categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {categories
                  .filter((category) => category.id !== "c9") // Exclude income category
                  .map((category) => {
                    const spent = calculateCategoryTotal(category.id);
                    return (
                      <div key={category.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="h-10 w-10 rounded-full flex items-center justify-center" 
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            <div 
                              className="h-5 w-5 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Total spent: {formatCurrency(spent)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete category</span>
                        </Button>
                      </div>
                    );
                  })}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Input placeholder="New category name" className="max-w-xs" />
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-8 overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Income Categories</CardTitle>
              <CardDescription>Track your income sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {categories
                  .filter((category) => category.id === "c9") // Only income category
                  .map((category) => {
                    const income = calculateCategoryTotal(category.id);
                    return (
                      <div key={category.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="h-10 w-10 rounded-full flex items-center justify-center" 
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            <div 
                              className="h-5 w-5 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Total income: {formatCurrency(income)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete category</span>
                        </Button>
                      </div>
                    );
                  })}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Input placeholder="New income source" className="max-w-xs" />
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Income Source
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Categories;
