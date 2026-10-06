// ---------- Tipler ----------

// Bir randevunun hangi alanlardan oluştuğunu tanımlayan şablon
interface Randevu {
  ad: string;
  telefon: string;
  hizmet: string;
  tarih: string;
  saat: string;
  not: string;
}

// Bugünden en fazla kaç gün sonrasına randevu alınabilir
const EN_FAZLA_GUN = 90;

// ---------- Sayfadaki elemanları bulma ----------

// querySelector eleman bulamazsa null döner. TypeScript bunu bize hatırlatır.
// Bu fonksiyon elemanı bulur, bulamazsa anlaşılır bir hata verir.
// <T> "hangi tür eleman bekliyoruz" bilgisini dışarıdan almamızı sağlar.
function elemanBul<T extends HTMLElement>(secici: string): T {
  const eleman = document.querySelector<T>(secici);
  if (eleman === null) {
    throw new Error(`Sayfada "${secici}" bulunamadı. index.html dosyasını kontrol et.`);
  }
  return eleman;
}

const form = elemanBul<HTMLFormElement>("form");
const liste = elemanBul<HTMLUListElement>("#randevu-listesi");
const hataAlani = elemanBul<HTMLUListElement>("#hata");
const adKutusu = elemanBul<HTMLInputElement>("#ad");
const telefonKutusu = elemanBul<HTMLInputElement>("#telefon");
const hizmetKutusu = elemanBul<HTMLSelectElement>("#hizmet");
const tarihKutusu = elemanBul<HTMLInputElement>("#tarih");
const saatKutusu = elemanBul<HTMLInputElement>("#saat");
const notKutusu = elemanBul<HTMLTextAreaElement>("#not");

// ---------- Yardımcı fonksiyonlar ----------

// 5 -> "05" (tarih ve saat biçimi için)
function iki(sayi: number): string {
  return String(sayi).padStart(2, "0");
}

// Bir Date nesnesini "2026-10-07" biçimine çevirir (yerel saate göre)
function tarihYazisi(d: Date): string {
  return `${d.getFullYear()}-${iki(d.getMonth() + 1)}-${iki(d.getDate())}`;
}

function bugununTarihi(): string {
  return tarihYazisi(new Date());
}

function enGecTarih(): string {
  const d = new Date();
  d.setDate(d.getDate() + EN_FAZLA_GUN);
  return tarihYazisi(d);
}

// Şu anki saati "14:05" biçiminde verir
function suAnkiSaat(): string {
  const simdi = new Date();
  return `${iki(simdi.getHours())}:${iki(simdi.getMinutes())}`;
}

// ---------- Doğrulama ----------

// Hataları bir diziye toplar. Dizi boşsa her şey geçerli demektir.
function hatalariBul(r: Randevu): string[] {
  const hatalar: string[] = [];

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
  } else if (r.tarih < bugununTarihi()) {
    hatalar.push("Geçmiş bir tarihe randevu alınamaz.");
  } else if (r.tarih > enGecTarih()) {
    hatalar.push(`En fazla ${EN_FAZLA_GUN} gün sonrasına randevu alınabilir.`);
  }

  if (r.saat === "") {
    hatalar.push("Saat seçin.");
  } else if (r.tarih === bugununTarihi() && r.saat <= suAnkiSaat()) {
    hatalar.push("Bugün için geçmiş bir saat seçemezsiniz.");
  }

  return hatalar;
}

function hatalariGoster(hatalar: string[]): void {
  hataAlani.textContent = "";

  for (const hata of hatalar) {
    const satir = document.createElement("li");
    satir.textContent = hata;
    hataAlani.appendChild(satir);
  }
}

// Listede görünecek satırın metnini hazırlar
function randevuMetni(r: Randevu): string {
  let metin = `${r.tarih} ${r.saat} - ${r.ad} (${r.hizmet})`;

  // Not sadece doluysa gösterilir
  if (r.not !== "") {
    metin += ` - Not: ${r.not}`;
  }

  return metin;
}

// ---------- Kullanıcıyı yönlendirme (kuralı zorunlu tutmaz, sadece yönlendirir) ----------

// Takvimde geçmiş ve çok ileri günler seçilemez görünür
tarihKutusu.min = bugununTarihi();
tarihKutusu.max = enGecTarih();

// Telefon kutusuna sadece rakam yazılabilsin
telefonKutusu.addEventListener("input", function (): void {
  telefonKutusu.value = telefonKutusu.value.replace(/\D/g, "");
});

// ---------- Form gönderilince ----------

form.addEventListener("submit", function (event: SubmitEvent): void {
  event.preventDefault();

  const randevu: Randevu = {
    ad: adKutusu.value.trim(),
    telefon: telefonKutusu.value.trim(),
    hizmet: hizmetKutusu.value,
    tarih: tarihKutusu.value,
    saat: saatKutusu.value,
    not: notKutusu.value.trim(),
  };

  const hatalar = hatalariBul(randevu);
hatalariGoster(hatalar);

if (hatalar.length > 0) {
  return;
}

  const madde = document.createElement("li");
  madde.textContent = randevuMetni(randevu);
  liste.appendChild(madde);

  form.reset();
});