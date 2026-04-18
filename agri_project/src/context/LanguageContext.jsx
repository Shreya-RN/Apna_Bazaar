import { createContext, useContext, useMemo, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

const languages = [
  "English",
  "Hindi",
  "Kannada",
  "Telugu",
  "Tamil",
  "Malayalam",
  "Marathi",
  "Bhojpuri",
  "Assamese",
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("apnabazaar_language") || "English"
  );

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("apnabazaar_language", lang);
  };

  const value = useMemo(
    () => ({
      language,
      languages,
      setLanguage: changeLanguage,
      t: translations[language] || translations.English,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}