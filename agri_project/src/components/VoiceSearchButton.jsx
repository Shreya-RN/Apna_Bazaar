import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function VoiceSearchButton({ onResult }) {
  const [listening, setListening] = useState(false);
  const { showToast } = useToast();

  const handleStart = () => {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      showToast("Voice search not supported in this browser", "error");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript || "";
      onResult(text);
      showToast(`Voice search: ${text}`, "success");
    };

    recognition.onerror = () => {
      showToast("Voice search failed", "error");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <button className="voice-search-btn" onClick={handleStart}>
      {listening ? "Listening..." : "Voice Search"}
    </button>
  );
}