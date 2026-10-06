import type { Hizmet } from "../data/hizmetler";

interface RandevuFormuProps {
  hizmetler: Hizmet[];
}

export default function RandevuFormu({ hizmetler }: RandevuFormuProps) {
  return (
    <section>
      <h2>Randevu Al</h2>
      <form noValidate>
        <label htmlFor="ad">Adınız Soyadınız</label>
        <input type="text" id="ad" name="ad" />

        <label htmlFor="telefon">Telefon</label>
        <input type="tel" id="telefon" name="telefon" inputMode="numeric" maxLength={11} placeholder="05XXXXXXXXX" />

        <label htmlFor="hizmet">Hizmet</label>
        <select id="hizmet" name="hizmet">
          {hizmetler.map((hizmet) => (
            <option key={hizmet.ad}>{hizmet.ad}</option>
          ))}
        </select>

        <label htmlFor="tarih">Tarih</label>
        <input type="date" id="tarih" name="tarih" />

        <label htmlFor="saat">Saat</label>
        <input type="time" id="saat" name="saat" />

        <label htmlFor="not">Not (isteğe bağlı)</label>
        <textarea id="not" name="not" rows={4}></textarea>

        <ul id="hata" className="hata" role="alert"></ul>

        <button type="submit">Randevu Oluştur</button>
      </form>
    </section>
  );
}
