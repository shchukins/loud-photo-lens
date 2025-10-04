import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PhotoMetadata } from "@/lib/db";

interface PhotosOverTimeProps {
  photos: PhotoMetadata[];
}

const PhotosOverTime = ({ photos }: PhotosOverTimeProps) => {
  const data = useMemo(() => {
    const monthCounts = new Map<string, number>();
    const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
    
    photos.forEach(photo => {
      const date = new Date(photo.dateTaken);
      const monthKey = months[date.getMonth()];
      monthCounts.set(monthKey, (monthCounts.get(monthKey) || 0) + 1);
    });

    return months.map(month => ({
      month,
      photos: monthCounts.get(month) || 0
    }));
  }, [photos]);

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
