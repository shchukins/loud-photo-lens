import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Янв", photos: 45 },
  { month: "Фев", photos: 52 },
  { month: "Мар", photos: 68 },
  { month: "Апр", photos: 78 },
  { month: "Май", photos: 92 },
  { month: "Июн", photos: 105 },
  { month: "Июл", photos: 118 },
  { month: "Авг", photos: 95 },
  { month: "Сен", photos: 82 },
  { month: "Окт", photos: 73 },
  { month: "Ноя", photos: 61 },
  { month: "Дек", photos: 54 },
];

const PhotosOverTime = () => {
  return (
    <Card className="p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Фото за год</h3>
        <p className="text-sm text-muted-foreground">Активность съёмки по месяцам</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPhotos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="month" 
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
          <Area 
            type="monotone" 
            dataKey="photos" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPhotos)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PhotosOverTime;
