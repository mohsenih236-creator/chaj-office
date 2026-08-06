import React, { useEffect, useState } from 'react';
import { Language } from '../types';

interface HomeProps {
  language: Language;
  onProjects: () => void;
  onAbout: () => void;
  onServices: () => void;
  onContact: () => void;
}

export const Home: React.FC<HomeProps> = ({
  language,
  onProjects,
  onAbout,
  onServices,
  onContact
}) => {
  const isFa = language === 'FA';
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const items: {
    labelEn: string;
    labelFa: string;
    action: () => void;
  }[] = [
    { labelEn: 'Projects', labelFa: 'پروژه‌ها', action: onProjects },
    { labelEn: 'About', labelFa: 'درباره ما', action: onAbout },
    { labelEn: 'Services', labelFa: 'خدمات', action: onServices },
    { labelEn: 'Contact', labelFa: 'تماس با ما', action: onContact }
  ];

  // --- Geometry (all values are % of the diagram box, matching the reference proportions) ---
  // 4 thin boundary lines mark the left edges of PROJECTS / ABOUT / SERVICES / CONTACT.
  // The thick pillar (below) forms the RIGHT edge of CONTACT — note the CONTACT gap
  // (58 -> 78) is roughly double the width of the other three gaps, matching the reference.
  const thinLineX = [28, 38, 48, 58];
  const thinLineTopY = [18, 22, 26, 29]; // staggered — tallest (smallest y) on the left
  const lineBottomY = 92; // shared bottom for the 4 thin lines AND the pillar

  const pillarX = 78;
  const pillarTopY = 5; // where the diagonal beam bends into the vertical pillar

  // Short floating decorative stub line, further right, unlabeled (not clickable).
  const stubX = 88;
  const stubTopY = 31;
  const stubBottomY = 72;

  // Vertical zone (% of diagram box) where each word/letters is centered.
  // Kept the same across all four gaps, roughly matching the reference.
  const wordZoneTop = 34;
  const wordZoneBottom = 63;

  const gapEdges = [...thinLineX, pillarX]; // 5 edges -> 4 gaps

  return (
    <div id="home-landing" className="relative min-h-screen overflow-hidden bg-[#F4F1EE]">
      {/* CHAJ LOGO INTRO */}
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center bg-[#F4F1EE] transition-opacity duration-1000 ${
          introFinished ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <img
          src="/images/chaj-logo.png"
          alt="CHAJ Architecture Group"
          className="w-[220px] sm:w-[270px] md:w-[320px] animate-chaj-logo"
        />
      </div>

      {/* MAIN NAVIGATION */}
      <div
        className={`min-h-screen pt-20 flex items-center justify-center transition-opacity duration-1000 ${
          introFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Desktop / tablet: architectural diagram layout */}
        <div className="hidden md:block relative w-full max-w-5xl aspect-[10/7] mx-auto px-6">
          {/* Decorative beam + divider lines (purely visual, sits behind the buttons) */}
          <svg
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {/* Diagonal roof beam bending into the vertical pillar (uniformly thick all the way down) */}
            <polyline
              points={`150,20 ${pillarX * 10},${pillarTopY * 7}`}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth="18"
              strokeLinecap="square"
            />
            <line
              x1={pillarX * 10}
              y1={pillarTopY * 7}
              x2={pillarX * 10}
              y2={lineBottomY * 7}
              stroke="#1C1C1C"
              strokeWidth="18"
            />

            {/* The 4 thin staggered boundary lines */}
            {thinLineX.map((x, i) => (
              <line
                key={x}
                x1={x * 10}
                y1={thinLineTopY[i] * 7}
                x2={x * 10}
                y2={lineBottomY * 7}
                stroke="#1C1C1C"
                strokeWidth="2"
              />
            ))}

            {/* Short floating decorative stub line */}
            <line
              x1={stubX * 10}
              y1={stubTopY * 7}
              x2={stubX * 10}
              y2={stubBottomY * 7}
              stroke="#1C1C1C"
              strokeWidth="2"
            />
          </svg>

          {/* Clickable word zones, positioned in the gaps between boundary lines */}
          {items.map((item, idx) => {
            const left = gapEdges[idx];
            const width = gapEdges[idx + 1] - gapEdges[idx];
            return (
              <button
                key={item.labelEn}
                onClick={item.action}
                aria-label={isFa ? item.labelFa : item.labelEn}
                className="group absolute flex items-center justify-center cursor-pointer transition-opacity duration-500 hover:opacity-50"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: `${wordZoneTop}%`,
                  height: `${wordZoneBottom - wordZoneTop}%`
                }}
              >
                {isFa ? (
                  <span className="font-serif text-lg sm:text-xl text-[#1C1C1C] tracking-tight">
                    {item.labelFa}
                  </span>
                ) : (
                  <span className="flex flex-col items-center leading-tight font-mono font-medium uppercase text-[11px] sm:text-xs tracking-[0.15em] text-[#1C1C1C]">
                    {item.labelEn
                      .toUpperCase()
                      .split('')
                      .map((ch, chIdx) => (
                        <span key={chIdx}>{ch}</span>
                      ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile: simple stacked full-width rows (no diagram, normal horizontal words) */}
        <div className="flex md:hidden flex-col w-full">
          {items.map((item, idx) => (
            <button
              key={item.labelEn}
              onClick={item.action}
              className={`w-full py-10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-black/[0.025] ${
                idx !== items.length - 1 ? 'border-b border-black/10' : ''
              }`}
            >
              <span className="font-serif italic text-xl text-[#1C1C1C] tracking-tight">
                {isFa ? item.labelFa : item.labelEn}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

