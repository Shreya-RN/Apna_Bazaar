import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useLanguage } from "../context/LanguageContext";
import "../App.css";
import heroImg from "../assets/farmer.jpg";
import VoiceButton from "../components/VoiceButton";

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function Home() {
  const navigate = useNavigate();
  const { language, languages, setLanguage, t } = useLanguage();
    const homeReadText = `
    ${t.appTitle}.
    ${t.equipment}. ${t.equipmentSubtitle}.
    ${t.personalBazaar}. ${t.bazaarSubtitle}.
    ${t.recruitment}. ${t.recruitmentSubtitle}.
  `;

  const cards = [
    {
      title: t.equipment,
      subtitle: t.equipmentSubtitle,
      image: "/icons/tractor.png",
      path: "/equipment",
    },
    {
      title: t.personalBazaar,
      subtitle: t.bazaarSubtitle,
      image: "/icons/bazaar.png",
      path: "/bazaar",
    },
    {
      title: t.recruitment,
      subtitle: t.recruitmentSubtitle,
      image: "/icons/recruitment.png",
      path: "/recruitment",
    },
  ];

  const hasSeenIntro = sessionStorage.getItem("apnabazaar_intro_seen") === "true";

  const [progress, setProgress] = useState(hasSeenIntro ? 1 : 0);
  const targetProgress = useRef(hasSeenIntro ? 1 : 0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (hasSeenIntro) return;

    const onScroll = () => {
      const maxScroll = 500;
      const raw = clamp(window.scrollY / maxScroll, 0, 1);
      targetProgress.current = raw;

      if (raw >= 0.98) {
        sessionStorage.setItem("apnabazaar_intro_seen", "true");
      }
    };

    const animate = () => {
      setProgress((prev) => {
        const next = lerp(prev, targetProgress.current, 0.08);
        return Math.abs(next - targetProgress.current) < 0.001
          ? targetProgress.current
          : next;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasSeenIntro]);

  const heroScale = hasSeenIntro ? 0.52 : lerp(1, 0.52, progress);
  const heroTranslateY = hasSeenIntro ? -140 : lerp(0, -140, progress);
  const heroTranslateX = hasSeenIntro ? -20 : lerp(0, -20, progress);
  const heroOpacity = hasSeenIntro ? 0.32 : lerp(1, 0.32, progress);

  const shellOpacity = hasSeenIntro ? 1 : clamp((progress - 0.2) / 0.5, 0, 1);
  const shellTranslateY = hasSeenIntro ? 0 : lerp(60, 0, shellOpacity);

  return (
    <div className="page">
      <section className={`scroll-scene ${hasSeenIntro ? "intro-finished" : ""}`}>
        <div className="scene-sticky">
          {!hasSeenIntro && (
            <div
              className="hero-canvas"
              style={{
                transform: `translate3d(${heroTranslateX}px, ${heroTranslateY}px, 0) scale(${heroScale})`,
                opacity: heroOpacity,
              }}
            >
              <img src={heroImg} alt="Agriculture" className="hero-main-image" />
              <div className="hero-overlay" />
              <div className="hero-vignette" />
            </div>
          )}

          <div
            className="ui-shell"
            style={{
              opacity: shellOpacity,
              transform: `translate3d(0, ${shellTranslateY}px, 0)`,
            }}
          >
           <TopBar title={t.appTitle} />

            <div className="language-wrap">
              <select
                className="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="voice-row">
            <VoiceButton textToRead={homeReadText} />
            </div>

            <div className="cards-row">
              {cards.map((card, index) => {
                const delay = index * 0.1;
                const appear = clamp((shellOpacity - delay) / 0.4, 0, 1);

                return (
                  <article
                    className="liquid-card feature-card"
                    key={card.title}
                    style={{
                      opacity: appear,
                      transform: `translate3d(0, ${lerp(40, 0, appear)}px, 0)`,
                    }}
                    onClick={() => navigate(card.path)}
                  >
                    <div className="card-glow" />
                    <div className="card-icon-wrap">
                      <img src={card.image} alt={card.title} className="card-icon" />
                    </div>

                    <div className="card-text-wrap">
                      <h3>{card.title}</h3>
                      <p className="card-subtitle">{card.subtitle}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}