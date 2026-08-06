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

  // Horizontal position (as % of container width) of each of the 5 boundary
  // lines. Gaps between consecutive lines are where the 4 nav words live.
  const lineX = [28, 38, 48, 58, 68]; // percent
  // How tall each boundary line is (staggered, tallest on the left) — matches
  // the reference image's "stepped" look. All lines share the same bottom.
  const lineTopY = [31.5, 37.1, 42.9, 48.6, 48.6]; // percent (y-top)
  const lineBottomY = 92.9; // percent (shared bottom for all 5 lines)
  // The thick diagonal beam + its vertical pillar (decorative only). The
  // pillar sits exactly above the 5th boundary line (lineX[4]) and continues
  // seamlessly into it.
  const pillarX = lineX[4];
  const pillarTopY = 8;
  const pillarBottomY = lineTopY[4];
  // A short, separate decorative stub line further right (unlabeled), like
  // the floating short line in the reference image.
  const stubX = 72;
  const stubTopY = 54;
  const stubBottomY = 74;

  // Vertical zone (as % of container height) where the clickable word sits.
  const wordZoneTop = 54.3;
  const wordZoneBottom = 92.9;

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
            {/* Diagonal roof beam bending into the vertical pillar */}
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
              y2={pillarBottomY * 7}
              stroke="#1C1C1C"
              strokeWidth="18"
            />

            {/* The 5 staggered boundary lines */}
            {lineX.map((x, i) => (
              <line
                key={x}
                x1={x * 10}
                y1={lineTopY[i] * 7}
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
            const left = lineX[idx];
            const width = lineX[idx + 1] - lineX[idx];
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
                  <span className="flex flex-col items-center leading-tight font-sans font-bold uppercase text-[11px] sm:text-xs tracking-widest text-[#1C1C1C]">
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

