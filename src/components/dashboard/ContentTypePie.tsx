import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PhotoMetadata } from "@/lib/db";

interface ContentTypePieProps {
  photos: PhotoMetadata[];
}

const ContentTypePie = ({ photos }: ContentTypePieProps) => {
  const data = useMemo(() => {
    const typeCounts = new Map<string, number>();
    
    photos.forEach(photo => {
      const type = photo.contentType || "Другое";
      typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
    });

    const chartColors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ];

    return Array.from(typeCounts.entries()).map(([name, value], index) => ({
      name,
      value,
      color: chartColors[index % chartColors.length]
    }));
  }, [photos]);

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
