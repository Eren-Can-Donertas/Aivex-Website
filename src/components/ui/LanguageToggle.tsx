'use client';

import { useLanguage, type Lang } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  function toggle(l: Lang) {
    setLang(l);
  }

  return (
    <div className="flex items-center rounded-md border border-border bg-muted/40 p-0.5">
      <button
        onClick={() => toggle('tr')}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          lang === 'tr'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to Turkish"
      >
        TR
      </button>
      <button
        onClick={() => toggle('en')}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          lang === 'en'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
