import TopBar from "../components/TopBar";
import { useLanguage } from "../context/LanguageContext";
import VoiceButton from "../components/VoiceButton";

export default function Recruitment() {
  const { t } = useLanguage();
      const recruitmentReadText = `
    ${t.recruitment}.
    ${t.recruitComing}
  `;
  return (
    <div className="simple-page-wrap">
      <div className="simple-page-shell liquid-shell">
        <TopBar
            title={t.recruitment}
            rightExtra={<VoiceButton textToRead={recruitmentReadText} />}
        />
        <div className="simple-page-content">{t.recruitComing}</div>
      </div>
    </div>
  );
}