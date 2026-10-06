import type { KayitliRandevu } from "../types/randevu";

interface RandevuListesiProps {
  randevular: KayitliRandevu[];
}

// Listede görünecek satırın metnini hazırlar
function randevuMetni(r: KayitliRandevu): string {
  let metin = `${r.tarih} ${r.saat} - ${r.ad} (${r.hizmet})`;

  // Not sadece doluysa gösterilir
  if (r.not !== "") {
    metin += ` - Not: ${r.not}`;
  }

  return metin;
}

export default function RandevuListesi({ randevular }: RandevuListesiProps) {
  return (
    <section>
      <h2>Randevularım</h2>
      <ul>
        {randevular.map((randevu) => (
          <li key={randevu.id}>{randevuMetni(randevu)}</li>
        ))}
      </ul>
    </section>
  );
}
