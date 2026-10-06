import Header from "./components/Header";
import HizmetListesi from "./components/HizmetListesi";
import RandevuBolumu from "./components/RandevuBolumu";
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
        <RandevuBolumu hizmetler={hizmetler} />
      </main>

      <Footer adres="Örnek Mah. Örnek Sok. No:1" />
    </>
  );
}
