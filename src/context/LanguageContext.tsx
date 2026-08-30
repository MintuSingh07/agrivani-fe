"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  LanguageInfo,
  TranslationSchema,
  TRANSLATIONS,
} from "@/i18n/translations";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationSchema;
  currentLanguageInfo: LanguageInfo;
  supportedLanguages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");

  // Load saved language on mount and listen for dynamic changes
  useEffect(() => {
    const syncLanguage = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("agrivani_app_language") as SupportedLanguage;
        if (saved && TRANSLATIONS[saved]) {
          setLanguageState(saved);
        }
      }
    };

    syncLanguage();

    window.addEventListener("agrivani_language_changed", syncLanguage);
    window.addEventListener("storage", syncLanguage);

    return () => {
      window.removeEventListener("agrivani_language_changed", syncLanguage);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  const setLanguage = (newLang: SupportedLanguage) => {
    if (!TRANSLATIONS[newLang]) return;
    setLanguageState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("agrivani_app_language", newLang);
      const chosen = SUPPORTED_LANGUAGES.find((l) => l.id === newLang);
      if (chosen) {
        localStorage.setItem(
          "agrivani_app_language_name",
          `${chosen.name} / ${chosen.nativeName}`
        );
      }
      // Dispatch custom window event for instant sync across tabs/components
      window.dispatchEvent(new Event("agrivani_language_changed"));
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.id === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguageInfo,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe default if rendered outside provider
    return {
      language: "en" as SupportedLanguage,
      setLanguage: () => {},
      t: TRANSLATIONS.en,
      currentLanguageInfo: SUPPORTED_LANGUAGES[0],
      supportedLanguages: SUPPORTED_LANGUAGES,
    };
  }
  return context;
}
