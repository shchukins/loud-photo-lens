import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface PhotoMetadata {
  id: string;
  fileName: string;
  dateTaken: Date;
  latitude?: number;
  longitude?: number;
  device?: string;
  orientation?: number;
  dominantColors?: string[];
  contentType?: string;
  width?: number;
  height?: number;
  uploadedAt: Date;
}

interface PhotoInsightDB extends DBSchema {
  photos: {
    key: string;
    value: PhotoMetadata;
    indexes: { 
      'by-date': Date;
      'by-location': [number, number];
    };
  };
  settings: {
    key: string;
    value: any;
  };
}

let dbInstance: IDBPDatabase<PhotoInsightDB> | null = null;

export async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<PhotoInsightDB>('photo-insight-db', 1, {
    upgrade(db) {
      const photoStore = db.createObjectStore('photos', { keyPath: 'id' });
      photoStore.createIndex('by-date', 'dateTaken');
      photoStore.createIndex('by-location', ['latitude', 'longitude']);
      
      db.createObjectStore('settings', { keyPath: 'key' });
    },
  });

  return dbInstance;
}

export async function addPhoto(metadata: PhotoMetadata) {
  const db = await getDB();
  await db.add('photos', metadata);
}

export async function getAllPhotos(): Promise<PhotoMetadata[]> {
  const db = await getDB();
  return db.getAll('photos');
}

export async function deleteAllPhotos() {
  const db = await getDB();
  const tx = db.transaction('photos', 'readwrite');
  await tx.store.clear();
  await tx.done;
}

export async function getSetting(key: string) {
  const db = await getDB();
  return db.get('settings', key);
}

export async function setSetting(key: string, value: any) {
  const db = await getDB();
  await db.put('settings', { key, value });
}
