import { useState } from "react";
import { speakText, stopSpeech } from "../utils/speechHelpers";
import { useLanguage } from "../context/LanguageContext";

export default function VoiceButton({ textToRead }) {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    await speakText(textToRead, language);
    setIsSpeaking(false);
  };

  return (
    <button className="voice-btn" onClick={handleSpeak} aria-label="Read aloud">
      {isSpeaking ? "Stop Voice" : "Read Aloud"}
    </button>
  );
}