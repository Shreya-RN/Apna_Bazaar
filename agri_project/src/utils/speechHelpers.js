function getLangCode(language) {
  const langMap = {
    English: "en-IN",
    Hindi: "hi-IN",
    Kannada: "kn-IN",
    Telugu: "te-IN",
    Tamil: "ta-IN",
    Malayalam: "ml-IN",
    Marathi: "mr-IN",
    Bhojpuri: "hi-IN",
    Assamese: "bn-IN",
  };

  return langMap[language] || "en-IN";
}

function loadVoices() {
  return new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) {
      resolve(existing);
      return;
    }

    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
        resolve(voices);
      }
    };

    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

    setTimeout(() => {
      const fallbackVoices = window.speechSynthesis.getVoices();
      resolve(fallbackVoices);
    }, 1200);
  });
}

function pickBestVoice(voices, langCode, languageName) {
  if (!voices?.length) return null;

  if (languageName === "Bhojpuri") {
    return (
      voices.find((voice) => voice.lang?.toLowerCase() === "hi-in") ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("hi")) ||
      voices.find((voice) => voice.lang?.toLowerCase() === "en-in") ||
      voices[0] ||
      null
    );
  }

  if (languageName === "Assamese") {
    return (
      voices.find((voice) => voice.lang?.toLowerCase() === "as-in") ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("as")) ||
      voices.find((voice) => voice.lang?.toLowerCase() === "hi-in") ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("hi")) ||
      voices.find((voice) => voice.lang?.toLowerCase() === "en-in") ||
      voices[0] ||
      null
    );
  }

  const exact = voices.find((voice) => voice.lang?.toLowerCase() === langCode.toLowerCase());
  if (exact) return exact;

  const base = langCode.split("-")[0].toLowerCase();

  const sameBase = voices.find((voice) =>
    voice.lang?.toLowerCase().startsWith(base)
  );
  if (sameBase) return sameBase;

  const indianEnglish = voices.find((voice) =>
    voice.lang?.toLowerCase() === "en-in"
  );
  if (indianEnglish) return indianEnglish;

  const anyEnglish = voices.find((voice) =>
    voice.lang?.toLowerCase().startsWith("en")
  );
  if (anyEnglish) return anyEnglish;

  return voices[0] || null;
}

export function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export async function speakText(text, language = "English") {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-speech is not supported in this browser.");
    return false;
  }

  stopSpeech();

  const langCode = getLangCode(language);
  const voices = await loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.volume = 1;

  const bestVoice = pickBestVoice(voices, langCode, language);

  return new Promise((resolve) => {
    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);
    window.speechSynthesis.speak(utterance);
  });
}