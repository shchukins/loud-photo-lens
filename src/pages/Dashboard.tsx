import { Camera, MapPin, Calendar, TrendingUp } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PhotosOverTime from "@/components/dashboard/PhotosOverTime";
import TimeOfDayChart from "@/components/dashboard/TimeOfDayChart";
import ContentTypePie from "@/components/dashboard/ContentTypePie";
import ColorPalette from "@/components/dashboard/ColorPalette";
import PhotoUploader from "@/components/PhotoUploader";
import { usePhotoData } from "@/hooks/usePhotoData";

const Dashboard = () => {
  const { photos, loading, reload } = usePhotoData();

  const totalPhotos = photos.length;
  const uniqueLocations = new Set(
    photos.filter(p => p.latitude && p.longitude).map(p => `${p.latitude},${p.longitude}`)
  ).size;
  const activeDays = new Set(
    photos.map(p => new Date(p.dateTaken).toDateString())
  ).size;
  const uniqueDevices = new Set(photos.map(p => p.device).filter(Boolean)).size;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-white shadow-glow">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Добро пожаловать в Photo Insight</h2>
          <p className="text-white/90 text-lg">Локальный анализ метаданных ваших фотографий</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
      </div>

      {/* Photo Uploader */}
      <PhotoUploader onUploadComplete={reload} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
        <StatsCard
          title="Всего фотографий"
          value={loading ? "..." : totalPhotos}
          icon={<Camera className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Локаций"
          value={loading ? "..." : uniqueLocations}
          icon={<MapPin className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Активных дней"
          value={loading ? "..." : activeDays}
          icon={<Calendar className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Устройства"
          value={loading ? "..." : uniqueDevices}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PhotosOverTime photos={photos} />
        <TimeOfDayChart photos={photos} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentTypePie photos={photos} />
        <ColorPalette photos={photos} />
      </div>
    </div>
  );
};

export default Dashboard;
