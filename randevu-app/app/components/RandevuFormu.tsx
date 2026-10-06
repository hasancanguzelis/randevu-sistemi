"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Hizmet } from "../data/hizmetler";
import type { Randevu } from "../types/randevu";

interface RandevuFormuProps {
  hizmetler: Hizmet[];
  onEkle: (randevu: Randevu) => void;
}

export default function RandevuFormu({ hizmetler, onEkle }: RandevuFormuProps) {
  // Formun boş hali: gönderince bu değerlere dönülür
  const bosForm: Randevu = {
    ad: "",
    telefon: "",
    hizmet: hizmetler[0].ad,
    tarih: "",
    saat: "",
    not: "",
  };

  const [form, setForm] = useState<Randevu>(bosForm);

  // Her kutuda bir şey değişince çalışır; kutunun name'i hangi alanın güncelleneceğini söyler
  function degisti(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    // Telefon kutusuna sadece rakam yazılabilsin
    const yeniDeger = name === "telefon" ? value.replace(/\D/g, "") : value;
    setForm((onceki) => ({ ...onceki, [name]: yeniDeger }));
  }

  function gonderildi(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    onEkle({
      ...form,
      ad: form.ad.trim(),
      telefon: form.telefon.trim(),
      not: form.not.trim(),
    });

    setForm(bosForm);
  }

  return (
    <section>
      <h2>Randevu Al</h2>
      <form noValidate onSubmit={gonderildi}>
        <label htmlFor="ad">Adınız Soyadınız</label>
        <input type="text" id="ad" name="ad" value={form.ad} onChange={degisti} />

        <label htmlFor="telefon">Telefon</label>
        <input
          type="tel"
          id="telefon"
          name="telefon"
          inputMode="numeric"
          maxLength={11}
          placeholder="05XXXXXXXXX"
          value={form.telefon}
          onChange={degisti}
        />

        <label htmlFor="hizmet">Hizmet</label>
        <select id="hizmet" name="hizmet" value={form.hizmet} onChange={degisti}>
          {hizmetler.map((hizmet) => (
            <option key={hizmet.ad}>{hizmet.ad}</option>
          ))}
        </select>

        <label htmlFor="tarih">Tarih</label>
        <input type="date" id="tarih" name="tarih" value={form.tarih} onChange={degisti} />

        <label htmlFor="saat">Saat</label>
        <input type="time" id="saat" name="saat" value={form.saat} onChange={degisti} />

        <label htmlFor="not">Not (isteğe bağlı)</label>
        <textarea id="not" name="not" rows={4} value={form.not} onChange={degisti}></textarea>

        <button type="submit">Randevu Oluştur</button>
      </form>
    </section>
  );
}
