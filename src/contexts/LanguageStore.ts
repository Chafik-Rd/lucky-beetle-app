import { create } from "zustand";
import { translations } from "../data/translations";

type Lang = "th" | "en";

type TranslationObject = typeof translations.th;

interface LanguageState {
  // State
  lang: Lang;
  t: TranslationObject; // เก็บ Translation Object ที่ใช้งานอยู่

  // Actions
  setLang: (newLang: Lang) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  // ค่าเริ่มต้น
  lang: "th",
  t: translations.th as TranslationObject,

  // Action: กำหนดภาษาใหม่
  setLang: (newLang) =>
    set({
      lang: newLang,
      t: translations[newLang] as TranslationObject, // อัปเดต Translation Object
    }),

  // Action: สลับภาษา (Toggle)
  toggleLang: () =>
    set((state) => {
      const newLang = state.lang === "th" ? "en" : "th";
      return {
        lang: newLang,
        t: translations[newLang] as TranslationObject, // อัปเดต Translation Object
      };
    }),
}));
