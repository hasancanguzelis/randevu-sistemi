import Header from "./components/Header";
import HizmetListesi from "./components/HizmetListesi";
import RandevuFormu from "./components/RandevuFormu";
import RandevuListesi from "./components/RandevuListesi";
import Footer from "./components/Footer";
import { hizmetler } from "./data/hizmetler";

export default function Home() {
  return (
    <>
      <Header
        baslik="İmaj Erkek Kuaför"
        aciklama="Online randevu ile sıra beklemeden hizmet alın."
      />

      <main>
        <HizmetListesi hizmetler={hizmetler} />
        <RandevuFormu hizmetler={hizmetler} />
        <RandevuListesi />
      </main>

      <Footer adres="Örnek Mah. Örnek Sok. No:1" />
    </>
  );
}
