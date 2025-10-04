import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

const places = [
  { name: "Санкт-Петербург", photos: 234, country: "Россия" },
  { name: "Москва", photos: 189, country: "Россия" },
  { name: "Париж", photos: 156, country: "Франция" },
  { name: "Рим", photos: 142, country: "Италия" },
  { name: "Барселона", photos: 98, country: "Испания" },
  { name: "Прага", photos: 87, country: "Чехия" },
];

const Places = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
          <MapPin className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Места</h2>
          <p className="text-muted-foreground">Где вы делали фотографии</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <Card className="p-6 shadow-card">
        <div className="relative h-[400px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="text-center space-y-3">
            <Navigation className="h-12 w-12 text-primary mx-auto animate-pulse" />
            <div>
              <h3 className="text-lg font-semibold">Интерактивная карта</h3>
              <p className="text-sm text-muted-foreground">
                Здесь будет отображаться карта с вашими локациями
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Places List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, index) => (
          <Card
            key={index}
            className="p-5 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-bold text-primary">{place.photos}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{place.name}</h3>
            <p className="text-sm text-muted-foreground">{place.country}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Places;
