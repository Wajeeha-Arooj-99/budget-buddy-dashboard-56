
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategorySpendingData } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartData } from "@/lib/types";

export function ExpenseChart() {
  const [data, setData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    setData(getCategorySpendingData());
  }, []);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-md text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2 overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>See where your money goes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  animationBegin={200}
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No spending data available</p>
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {data.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <div className="text-xs">
                <p className="font-medium">{category.name}</p>
                <p className="text-muted-foreground">${category.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
