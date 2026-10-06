// ---------- Sayfadaki elemanlar ----------
const form = document.querySelector("form");
const liste = document.querySelector("#randevu-listesi");
const hataAlani = document.querySelector("#hata");
const telefonKutusu = document.querySelector("#telefon");
const tarihKutusu = document.querySelector("#tarih");

// Bugünden en fazla kaç gün sonrasına randevu alınabilir
const EN_FAZLA_GUN = 90;

// ---------- Yardımcı fonksiyonlar ----------

// 5 -> "05" (tarih ve saat biçimi için)
function iki(sayi) {
  return String(sayi).padStart(2, "0");
}

// Bir Date nesnesini "2026-10-07" biçimine çevirir (yerel saate göre)
function tarihYazisi(d) {
  return `${d.getFullYear()}-${iki(d.getMonth() + 1)}-${iki(d.getDate())}`;
}

function bugununTarihi() {
  return tarihYazisi(new Date());
}

function enGecTarih() {
  const d = new Date();
  d.setDate(d.getDate() + EN_FAZLA_GUN);
  return tarihYazisi(d);
}

// Şu anki saati "14:05" biçiminde verir
function suAnkiSaat() {
  const simdi = new Date();
  return `${iki(simdi.getHours())}:${iki(simdi.getMinutes())}`;
}

// ---------- Doğrulama ----------

// Hataları bir diziye toplar. Dizi boşsa her şey geçerli demektir.
function hatalariBul(ad, telefon, tarih, saat) {
  const hatalar = [];

  if (ad === "") {
    hatalar.push("Ad soyad boş olamaz.");
  }

  // 05 ile başlayan, toplam 11 haneli numara
  if (!/^05\d{9}$/.test(telefon)) {
    hatalar.push(
      "Telefon 05 ile başlayan 11 haneli bir numara olmalı (örnek: 05551234567)."
    );
  }

  if (tarih === "") {
    hatalar.push("Tarih seçin.");
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) {
    // Tarayıcı elle yazılan yılı 6 haneye kadar kabul eder, biçimi biz denetliyoruz
    hatalar.push("Tarih geçersiz: yıl 4 haneli olmalı.");
  } else if (tarih < bugununTarihi()) {
    hatalar.push("Geçmiş bir tarihe randevu alınamaz.");
  } else if (tarih > enGecTarih()) {
    hatalar.push(`En fazla ${EN_FAZLA_GUN} gün sonrasına randevu alınabilir.`);
  }

  if (saat === "") {
    hatalar.push("Saat seçin.");
  } else if (tarih === bugununTarihi() && saat <= suAnkiSaat()) {
    hatalar.push("Bugün için geçmiş bir saat seçemezsiniz.");
  }

  return hatalar;
}

// ---------- Kullanıcıyı yönlendirme (kuralı zorunlu tutmaz, sadece yönlendirir) ----------

// Takvimde geçmiş ve çok ileri günler seçilemez görünür
tarihKutusu.min = bugununTarihi();
tarihKutusu.max = enGecTarih();

// Telefon kutusuna sadece rakam yazılabilsin
telefonKutusu.addEventListener("input", function () {
  telefonKutusu.value = telefonKutusu.value.replace(/\D/g, "");
});

// ---------- Form gönderilince ----------

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const ad = document.querySelector("#ad").value.trim();
  const telefon = telefonKutusu.value.trim();
  const hizmet = document.querySelector("#hizmet").value;
  const tarih = tarihKutusu.value;
  const saat = document.querySelector("#saat").value;
  const not = document.querySelector("#not").value.trim();

  const hatalar = hatalariBul(ad, telefon, tarih, saat);

  if (hatalar.length > 0) {
    hataAlani.textContent = hatalar.join(" ");
    return;
  }

  hataAlani.textContent = "";

  const madde = document.createElement("li");
  madde.textContent = `${tarih} ${saat} - ${ad} (${hizmet})`;

  // Not sadece doluysa gösterilir
  if (not !== "") {
    madde.textContent += ` - Not: ${not}`;
  }

  liste.appendChild(madde);
  form.reset();
});