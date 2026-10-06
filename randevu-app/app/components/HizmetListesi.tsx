import type { Hizmet } from "../data/hizmetler";

interface HizmetListesiProps {
  hizmetler: Hizmet[];
}

export default function HizmetListesi({ hizmetler }: HizmetListesiProps) {
  return (
    <section>
      <h2>Hizmetlerimiz</h2>
      <ul>
        {hizmetler.map((hizmet) => (
          <li key={hizmet.ad}>
            {hizmet.ad} - {hizmet.fiyat} TL
          </li>
        ))}
      </ul>
    </section>
  );
}
