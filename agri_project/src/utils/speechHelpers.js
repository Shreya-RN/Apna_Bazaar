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
    let voices = speechSynthesis.getVoices();

    if (voices.length) {
      resolve(voices);
      return;
    }

    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices);
    };
  });
}

function pickBestVoice(voices, langCode) {
  if (!voices?.length) return null;

  const base = langCode.split("-")[0].toLowerCase();

  // Prefer offline voices first (avoid Online Natural voices)
  return (
    voices.find(
      v =>
        v.lang?.toLowerCase().startsWith(base) &&
        !v.name.includes("Online")
    ) ||
    voices.find(
      v =>
        v.lang?.toLowerCase().startsWith(base)
    ) ||
    voices.find(
      v =>
        v.lang?.toLowerCase().startsWith("en")
    ) ||
    voices[0]
  );
}

export function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export async function speakText(text, language = "English") {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-speech not supported");
    return false;
  }

  stopSpeech();

  const langCode = getLangCode(language);
  const voices = await loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;

  const bestVoice = pickBestVoice(voices, langCode);

  if (bestVoice) {
    utterance.voice = bestVoice;
    console.log("Using voice:", bestVoice.name);
  }

  return new Promise((resolve) => {
    utterance.onend = () => resolve(true);

    utterance.onerror = (e) => {
      console.error(e);
      resolve(false);
    };

    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 500);
  });
}
