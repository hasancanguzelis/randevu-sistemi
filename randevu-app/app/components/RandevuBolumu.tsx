"use client";

import { useState } from "react";
import type { Hizmet } from "../data/hizmetler";
import type { KayitliRandevu, Randevu } from "../types/randevu";
import RandevuFormu from "./RandevuFormu";
import RandevuListesi from "./RandevuListesi";

interface RandevuBolumuProps {
  hizmetler: Hizmet[];
}

// Form ile liste aynı bilgiye ihtiyaç duyduğu için randevu listesi
// bu ortak üst bileşende tutulur ("state'i yukarı taşımak").
export default function RandevuBolumu({ hizmetler }: RandevuBolumuProps) {
  const [randevular, setRandevular] = useState<KayitliRandevu[]>([]);

  function randevuEkle(randevu: Randevu): void {
    const yeni: KayitliRandevu = { ...randevu, id: crypto.randomUUID() };
    setRandevular((onceki) => [...onceki, yeni]);
  }

  return (
    <>
      <RandevuFormu hizmetler={hizmetler} onEkle={randevuEkle} />
      <RandevuListesi randevular={randevular} />
    </>
  );
}
