import { Card } from "@/components/ui/card";

const colors = [
  { color: "#8B5CF6", name: "Фиолетовый", percentage: 24 },
  { color: "#3B82F6", name: "Синий", percentage: 18 },
  { color: "#10B981", name: "Зелёный", percentage: 16 },
  { color: "#F59E0B", name: "Оранжевый", percentage: 14 },
  { color: "#EF4444", name: "Красный", percentage: 12 },
  { color: "#6366F1", name: "Индиго", percentage: 10 },
  { color: "#EC4899", name: "Розовый", percentage: 6 },
];

const ColorPalette = () => {
  return (
    <Card className="p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Цветовая палитра</h3>
        <p className="text-sm text-muted-foreground">Самые частые цвета в ваших фото</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {colors.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: item.color }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-xs font-medium">{item.name}</p>
              <p className="text-white/80 text-xs">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ColorPalette;
