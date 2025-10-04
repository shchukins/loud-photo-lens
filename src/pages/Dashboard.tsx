import { Camera, MapPin, Calendar, TrendingUp } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PhotosOverTime from "@/components/dashboard/PhotosOverTime";
import TimeOfDayChart from "@/components/dashboard/TimeOfDayChart";
import ContentTypePie from "@/components/dashboard/ContentTypePie";
import ColorPalette from "@/components/dashboard/ColorPalette";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-white shadow-glow">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Добро пожаловать в Photo Insight</h2>
          <p className="text-white/90 text-lg">Анализ ваших фотографий из iCloud</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
        <StatsCard
          title="Всего фотографий"
          value="1,074"
          icon={<Camera className="h-6 w-6 text-primary" />}
          trend={{ value: "12% за месяц", isPositive: true }}
        />
        <StatsCard
          title="Локаций"
          value="42"
          icon={<MapPin className="h-6 w-6 text-primary" />}
          trend={{ value: "3 новых", isPositive: true }}
        />
        <StatsCard
          title="Активных дней"
          value="156"
          icon={<Calendar className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Тренд активности"
          value="+24%"
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
          trend={{ value: "по сравнению с прошлым годом", isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PhotosOverTime />
        <TimeOfDayChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentTypePie />
        <ColorPalette />
      </div>
    </div>
  );
};

export default Dashboard;
