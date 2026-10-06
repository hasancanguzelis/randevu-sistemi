import type { Randevu } from "../types/randevu";

// Bugünden en fazla kaç gün sonrasına randevu alınabilir
export const EN_FAZLA_GUN = 90;

// 5 -> "05" (tarih ve saat biçimi için)
function iki(sayi: number): string {
  return String(sayi).padStart(2, "0");
}

// Bir Date nesnesini "2026-10-07" biçimine çevirir (yerel saate göre)
function tarihYazisi(d: Date): string {
  return `${d.getFullYear()}-${iki(d.getMonth() + 1)}-${iki(d.getDate())}`;
}

export function bugununTarihi(simdi: Date = new Date()): string {
  return tarihYazisi(simdi);
}

export function enGecTarih(simdi: Date = new Date()): string {
  const d = new Date(simdi);
  d.setDate(d.getDate() + EN_FAZLA_GUN);
  return tarihYazisi(d);
}

// Şu anki saati "14:05" biçiminde verir
export function suAnkiSaat(simdi: Date = new Date()): string {
  return `${iki(simdi.getHours())}:${iki(simdi.getMinutes())}`;
}

// Hataları bir diziye toplar. Dizi boşsa her şey geçerli demektir.
// "simdi" parametresi sayesinde fonksiyon tek bir an üzerinden karar verir
// (gece yarısında bugün ile saat birbirini tutmaz hale gelmez).
export function hatalariBul(r: Randevu, simdi: Date = new Date()): string[] {
  const hatalar: string[] = [];
  const bugun = bugununTarihi(simdi);

  if (r.ad === "") {
    hatalar.push("Ad soyad boş olamaz.");
  }

  // 05 ile başlayan, toplam 11 haneli numara
  if (!/^05\d{9}$/.test(r.telefon)) {
    hatalar.push(
      "Telefon 05 ile başlayan 11 haneli bir numara olmalı (örnek: 05551234567)."
    );
  }

  if (r.tarih === "") {
    hatalar.push("Tarih seçin.");
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(r.tarih)) {
    // Tarayıcı elle yazılan yılı 6 haneye kadar kabul eder, biçimi biz denetliyoruz
    hatalar.push("Tarih geçersiz: yıl 4 haneli olmalı.");
  } else if (r.tarih < bugun) {
    hatalar.push("Geçmiş bir tarihe randevu alınamaz.");
  } else if (r.tarih > enGecTarih(simdi)) {
    hatalar.push(`En fazla ${EN_FAZLA_GUN} gün sonrasına randevu alınabilir.`);
  }

  if (r.saat === "") {
    hatalar.push("Saat seçin.");
  } else if (r.tarih === bugun && r.saat <= suAnkiSaat(simdi)) {
    hatalar.push("Bugün için geçmiş bir saat seçemezsiniz.");
  }

  return hatalar;
}
