// Bir hizmetin hangi alanlardan oluştuğunu tanımlayan şablon
export interface Hizmet {
  ad: string;
  fiyat: number;
}

// Hizmetlerin tek kaynağı: liste ve form buradan beslenir
export const hizmetler: Hizmet[] = [
  { ad: "Saç Kesimi", fiyat: 400 },
  { ad: "Sakal Tıraşı", fiyat: 150 },
  { ad: "Saç + Sakal", fiyat: 400 },
  { ad: "Saç Yıkama", fiyat: 100 },
  { ad: "Damat Tıraşı", fiyat: 1000 },
];
