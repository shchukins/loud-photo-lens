import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts";
import { PhotoMetadata } from "@/lib/db";

interface TimeOfDayChartProps {
  photos: PhotoMetadata[];
}

// Периоды суток для фоновых зон
const timeRanges = [
  { start: 0, end: 6, name: "Ночь", fill: "hsl(var(--chart-4) / 0.1)" },
  { start: 6, end: 12, name: "Утро", fill: "hsl(var(--chart-2) / 0.1)" },
  { start: 12, end: 18, name: "День", fill: "hsl(var(--chart-1) / 0.1)" },
  { start: 18, end: 22, name: "Вечер", fill: "hsl(var(--chart-3) / 0.1)" },
  { start: 22, end: 24, name: "Ночь", fill: "hsl(var(--chart-4) / 0.1)" },
];

const TimeOfDayChart = ({ photos }: TimeOfDayChartProps) => {
  const data = useMemo(() => {
    const hourCounts = new Map<number, number>();
    
    photos.forEach(photo => {
      const hour = new Date(photo.dateTaken).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      photos: hourCounts.get(i) || 0,
      fill: i >= 6 && i < 12 ? "hsl(var(--chart-2))" : 
            i >= 12 && i < 18 ? "hsl(var(--chart-1))" :
            i >= 18 && i < 22 ? "hsl(var(--chart-3))" : "hsl(var(--chart-4))"
    }));
  }, [photos]);

  return (
    <Card className="p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Время суток</h3>
        <p className="text-sm text-muted-foreground">Когда вы делаете больше всего фото</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          
          {/* Фоновые зоны для периодов суток */}
          {timeRanges.map((range, index) => (
            <ReferenceArea
              key={index}
              x1={range.start}
              x2={range.end}
              fill={range.fill}
              fillOpacity={1}
            />
          ))}
          
          <XAxis 
            dataKey="hour" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickFormatter={(hour) => `${hour}:00`}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelFormatter={(hour) => `${hour}:00 - ${hour}:59`}
            formatter={(value: number) => [`${value} фото`, "Количество"]}
          />
          <Bar 
            dataKey="photos" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Легенда периодов */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
          <span className="text-muted-foreground">Ночь (0-6, 22-24)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
          <span className="text-muted-foreground">Утро (6-12)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
          <span className="text-muted-foreground">День (12-18)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
          <span className="text-muted-foreground">Вечер (18-22)</span>
        </div>
      </div>
    </Card>
  );
};

export default TimeOfDayChart;
