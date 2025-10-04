import { useCallback, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addPhoto } from '@/lib/db';
import { extractMetadata } from '@/lib/exifParser';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PhotoUploaderProps {
  onUploadComplete?: () => void;
}

const PhotoUploader = ({ onUploadComplete }: PhotoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const processFiles = async (files: FileList) => {
    setUploading(true);
    setProgress(0);
    
    const fileArray = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    if (fileArray.length === 0) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файлы изображений",
        variant: "destructive",
      });
      setUploading(false);
      return;
    }

    let processed = 0;

    for (const file of fileArray) {
      try {
        const metadata = await extractMetadata(file);
        await addPhoto(metadata);
        processed++;
        setProgress((processed / fileArray.length) * 100);
      } catch (error) {
        console.error('Error processing file:', file.name, error);
      }
    }

    toast({
      title: "Успешно!",
      description: `Обработано ${processed} фото`,
    });

    setUploading(false);
    setProgress(0);
    onUploadComplete?.();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  return (
    <Card className="p-8">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center transition-all
          ${isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-border'}
          ${uploading ? 'opacity-50 pointer-events-none' : 'hover:border-primary/50'}
        `}
      >
        {uploading ? (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
            <p className="text-lg font-medium">Обработка фотографий...</p>
            <Progress value={progress} className="w-full max-w-xs mx-auto" />
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              Перетащите фото сюда
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              или выберите файлы с вашего устройства
            </p>
            <label className="inline-block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <span className="px-6 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors inline-block">
                Выбрать файлы
              </span>
            </label>
          </>
        )}
      </div>
    </Card>
  );
};

export default PhotoUploader;
