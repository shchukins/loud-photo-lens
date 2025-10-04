import exifr from 'exifr';
import { PhotoMetadata } from './db';

export async function extractMetadata(file: File): Promise<PhotoMetadata> {
  const id = `${file.name}-${file.lastModified}`;
  
  try {
    const exif = await exifr.parse(file, {
      gps: true,
      exif: true,
      iptc: true,
      icc: true,
    });

    const img = new Image();
    const url = URL.createObjectURL(file);
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const dominantColors = await extractDominantColors(img);
    URL.revokeObjectURL(url);

    return {
      id,
      fileName: file.name,
      dateTaken: exif?.DateTimeOriginal || exif?.CreateDate || new Date(file.lastModified),
      latitude: exif?.latitude,
      longitude: exif?.longitude,
      device: exif?.Make && exif?.Model ? `${exif.Make} ${exif.Model}` : undefined,
      orientation: exif?.Orientation,
      dominantColors,
      contentType: detectContentType(file.name),
      width: img.width,
      height: img.height,
      uploadedAt: new Date(),
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    return {
      id,
      fileName: file.name,
      dateTaken: new Date(file.lastModified),
      uploadedAt: new Date(),
    };
  }
}

function detectContentType(fileName: string): string {
  const lower = fileName.toLowerCase();
  if (lower.includes('portrait') || lower.includes('selfie')) return 'Портрет';
  if (lower.includes('landscape') || lower.includes('nature')) return 'Пейзаж';
  if (lower.includes('food')) return 'Еда';
  if (lower.includes('pet') || lower.includes('dog') || lower.includes('cat')) return 'Животные';
  return 'Другое';
}

async function extractDominantColors(img: HTMLImageElement): Promise<string[]> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  canvas.width = 100;
  canvas.height = 100;
  ctx.drawImage(img, 0, 0, 100, 100);

  const imageData = ctx.getImageData(0, 0, 100, 100);
  const pixels = imageData.data;
  
  const colorMap = new Map<string, number>();
  
  for (let i = 0; i < pixels.length; i += 40) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    
    const hsl = rgbToHsl(r, g, b);
    const key = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }

  return Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([color]) => color);
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
