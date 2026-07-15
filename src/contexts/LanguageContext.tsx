'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'tr';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T extends object>(dict: { en: T; tr: T }) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLang = 'tr',
}: {
  children: ReactNode;
  /** Resolved server-side from the `aivex-lang` cookie so the very first paint
   *  is in the correct language — no post-hydration flip / flash. */
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('aivex-lang', l);
    document.cookie = `aivex-lang=${l}; path=/; max-age=31536000; SameSite=Lax`;
  }

  function t<T extends object>(dict: { en: T; tr: T }): T {
    return dict[lang];
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
