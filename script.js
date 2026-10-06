"use strict";
// ---------- Tipler ----------
// Bugünden en fazla kaç gün sonrasına randevu alınabilir
const EN_FAZLA_GUN = 90;
// ---------- Sayfadaki elemanları bulma ----------
// querySelector eleman bulamazsa null döner. TypeScript bunu bize hatırlatır.
// Bu fonksiyon elemanı bulur, bulamazsa anlaşılır bir hata verir.
// <T> "hangi tür eleman bekliyoruz" bilgisini dışarıdan almamızı sağlar.
function elemanBul(secici) {
    const eleman = document.querySelector(secici);
    if (eleman === null) {
        throw new Error(`Sayfada "${secici}" bulunamadı. index.html dosyasını kontrol et.`);
    }
    return eleman;
}
const form = elemanBul("form");
const liste = elemanBul("#randevu-listesi");
const hataAlani = elemanBul("#hata");
const adKutusu = elemanBul("#ad");
const telefonKutusu = elemanBul("#telefon");
const hizmetKutusu = elemanBul("#hizmet");
const tarihKutusu = elemanBul("#tarih");
const saatKutusu = elemanBul("#saat");
const notKutusu = elemanBul("#not");
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
function hatalariBul(r) {
    const hatalar = [];
    if (r.ad === "") {
        hatalar.push("Ad soyad boş olamaz.");
    }
    // 05 ile başlayan, toplam 11 haneli numara
    if (!/^05\d{9}$/.test(r.telefon)) {
        hatalar.push("Telefon 05 ile başlayan 11 haneli bir numara olmalı (örnek: 05551234567).");
    }
    if (r.tarih === "") {
        hatalar.push("Tarih seçin.");
    }
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(r.tarih)) {
        // Tarayıcı elle yazılan yılı 6 haneye kadar kabul eder, biçimi biz denetliyoruz
        hatalar.push("Tarih geçersiz: yıl 4 haneli olmalı.");
    }
    else if (r.tarih < bugununTarihi()) {
        hatalar.push("Geçmiş bir tarihe randevu alınamaz.");
    }
    else if (r.tarih > enGecTarih()) {
        hatalar.push(`En fazla ${EN_FAZLA_GUN} gün sonrasına randevu alınabilir.`);
    }
    if (r.saat === "") {
        hatalar.push("Saat seçin.");
    }
    else if (r.tarih === bugununTarihi() && r.saat <= suAnkiSaat()) {
        hatalar.push("Bugün için geçmiş bir saat seçemezsiniz.");
    }
    return hatalar;
}
function hatalariGoster(hatalar) {
    hataAlani.textContent = "";
    for (const hata of hatalar) {
        const satir = document.createElement("li");
        satir.textContent = hata;
        hataAlani.appendChild(satir);
    }
}
// Listede görünecek satırın metnini hazırlar
function randevuMetni(r) {
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
telefonKutusu.addEventListener("input", function () {
    telefonKutusu.value = telefonKutusu.value.replace(/\D/g, "");
});
// ---------- Form gönderilince ----------
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const randevu = {
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
