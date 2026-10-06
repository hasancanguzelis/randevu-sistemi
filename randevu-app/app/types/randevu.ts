// Bir randevunun hangi alanlardan oluştuğunu tanımlayan şablon
export interface Randevu {
  ad: string;
  telefon: string;
  hizmet: string;
  tarih: string;
  saat: string;
  not: string;
}

// Listeye eklenmiş randevu: React'in satırları ayırt edebilmesi için bir kimliği (id) var
export type KayitliRandevu = Randevu & { id: string };
