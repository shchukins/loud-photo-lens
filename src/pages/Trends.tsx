import { Card } from "@/components/ui/card";
import { TrendingUp, Sunrise, Camera, Globe } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const yearlyData = [
  { year: "2020", photos: 456 },
  { year: "2021", photos: 678 },
  { year: "2022", photos: 892 },
  { year: "2023", photos: 1045 },
  { year: "2024", photos: 1074 },
];

const goldenHourData = [
  { month: "Янв", count: 12 },
  { month: "Фев", count: 18 },
  { month: "Мар", count: 24 },
  { month: "Апр", count: 32 },
  { month: "Май", count: 45 },
  { month: "Июн", count: 52 },
];

const cameraData = [
  { device: "iPhone 15 Pro", value: 450 },
  { device: "iPhone 14", value: 324 },
  { device: "iPhone 13", value: 189 },
  { device: "Canon EOS", value: 87 },
  { device: "Sony A7", value: 24 },
];

const Trends = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Тренды</h2>
          <p className="text-muted-foreground">Анализ вашей активности</p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sunrise className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Golden Hour</h3>
          </div>
          <p className="text-3xl font-bold mb-2">38%</p>
          <p className="text-sm text-muted-foreground">
            фото сделаны во время золотого часа
          </p>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Путешествия</h3>
          </div>
          <p className="text-3xl font-bold mb-2">12</p>
          <p className="text-sm text-muted-foreground">
            стран посещено за год
          </p>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Camera className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Активность</h3>
          </div>
          <p className="text-3xl font-bold mb-2">+135%</p>
          <p className="text-sm text-muted-foreground">
            рост по сравнению с 2020 годом
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Активность по годам</h3>
            <p className="text-sm text-muted-foreground">Рост количества фотографий</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="year" 
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
              <Line 
                type="monotone" 
                dataKey="photos" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Golden Hour Insights</h3>
            <p className="text-sm text-muted-foreground">Съёмка на рассвете и закате</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={goldenHourData}>
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
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Camera Trends */}
      <Card className="p-6 shadow-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Используемые устройства</h3>
          <p className="text-sm text-muted-foreground">Статистика по камерам</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={cameraData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="device" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
            <Radar 
              name="Фото" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))" 
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Trends;
