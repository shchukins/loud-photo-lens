import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Пейзаж", value: 312, color: "hsl(var(--chart-1))" },
  { name: "Портрет", value: 245, color: "hsl(var(--chart-2))" },
  { name: "Еда", value: 156, color: "hsl(var(--chart-3))" },
  { name: "Животные", value: 98, color: "hsl(var(--chart-4))" },
  { name: "Другое", value: 263, color: "hsl(var(--chart-5))" },
];

const ContentTypePie = () => {
  return (
    <Card className="p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Тип контента</h3>
        <p className="text-sm text-muted-foreground">Распределение фотографий по типам</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ContentTypePie;
