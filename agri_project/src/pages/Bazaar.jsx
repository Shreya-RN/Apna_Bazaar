import TopBar from "../components/TopBar";
import { useLanguage } from "../context/LanguageContext";
import VoiceButton from "../components/VoiceButton";

export default function Bazaar() {
  const { t } = useLanguage();
    const bazaarReadText = `
    ${t.personalBazaar}.
    ${t.bazaarComing}
  `;

  return (
    <div className="simple-page-wrap">
      <div className="simple-page-shell liquid-shell">
        <TopBar
            title={t.personalBazaar}
            rightExtra={<VoiceButton textToRead={bazaarReadText} />}
        />
        <div className="simple-page-content">{t.bazaarComing}</div>
      </div>
    </div>
  );
}