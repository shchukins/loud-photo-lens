import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "Утро", photos: 245, fill: "hsl(var(--chart-2))" },
  { time: "День", photos: 412, fill: "hsl(var(--chart-1))" },
  { time: "Вечер", photos: 328, fill: "hsl(var(--chart-3))" },
  { time: "Ночь", photos: 89, fill: "hsl(var(--chart-4))" },
];

const TimeOfDayChart = () => {
  return (
    <Card className="p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Время суток</h3>
        <p className="text-sm text-muted-foreground">Когда вы делаете больше всего фото</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
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
          />
          <Bar 
            dataKey="photos" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TimeOfDayChart;
