import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { PhotoMetadata } from "@/lib/db";

interface ColorPaletteProps {
  photos: PhotoMetadata[];
}

const ColorPalette = ({ photos }: ColorPaletteProps) => {
  const colors = useMemo(() => {
    const colorMap = new Map<string, number>();
    
    photos.forEach(photo => {
      if (photo.dominantColors) {
        photo.dominantColors.forEach(color => {
          colorMap.set(color, (colorMap.get(color) || 0) + 1);
        });
      }
    });

    const total = Array.from(colorMap.values()).reduce((a, b) => a + b, 0);
    
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([color, count]) => ({
        color,
        percentage: Math.round((count / total) * 100)
      }));
  }, [photos]);

  if (colors.length === 0) {
    return (
      <Card className="p-6 shadow-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Цветовая палитра</h3>
          <p className="text-sm text-muted-foreground">Самые частые цвета в ваших фото</p>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          Загрузите фото для анализа цветовой палитры
        </div>
      </Card>
    );
  }

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
              <p className="text-white text-xs">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ColorPalette;
