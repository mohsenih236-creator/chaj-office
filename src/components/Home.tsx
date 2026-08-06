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

  // --- Geometry, all in % of the diagram box (0-100), measured directly from the
  // reference image. SVG viewBox is "0 0 100 100" so these values can be used as-is. ---

  // 5 thin lines create the 4 equal-width word gaps (Projects / About / Services / Contact).
  const thinLineX = [5, 18, 32, 45, 58];
  const thinLineTopY = [23, 27, 31, 34, 38]; // staggered, tallest (smallest y) on the left
  const thinLineBottomY = 91; // shared bottom for all 5 thin lines

  // The thick pillar sits separately, further right, with an empty unlabeled gap
  // between it and the 5th thin line. It bends out of the diagonal roof beam at
  // the top, and overhangs slightly LOWER than the thin lines at the bottom.
  const pillarX = 72;
  const pillarTopY = 28; // where the beam bends into the pillar
  const pillarBottomY = 100;
  const beamStrokeWidth = 8;

  // --- Continuation of the roof beam PAST the pillar. ---
  // In the reference, the solid beam bends into the pillar, and on the far side
  // of the pillar the SAME diagonal keeps going, but opens up into two thin
  // parallel lines (the top and bottom edge of the beam), capped off at the
  // right edge of the box. These are derived geometrically from the beam's own
  // direction and thickness so the slope matches the main beam exactly instead
  // of being eyeballed.
  const beamDx = pillarX - 0;
  const beamDy = pillarTopY - 0;
  const beamLen = Math.sqrt(beamDx * beamDx + beamDy * beamDy);
  const beamUx = beamDx / beamLen;
  const beamUy = beamDy / beamLen;
  // perpendicular unit vector (rotate direction 90°)
  const perpX = -beamUy;
  const perpY = beamUx;
  const halfThickness = beamStrokeWidth / 2;

  const continuationEndX = 100; // right edge of the box

  const topStart = {
    x: pillarX - halfThickness * perpX,
    y: pillarTopY - halfThickness * perpY
  };
  const bottomStart = {
    x: pillarX + halfThickness * perpX,
    y: pillarTopY + halfThickness * perpY
  };

  const tTop = (continuationEndX - topStart.x) / beamUx;
  const topEnd = { x: continuationEndX, y: topStart.y + tTop * beamUy };

  const tBottom = (continuationEndX - bottomStart.x) / beamUx;
  const bottomEnd = { x: continuationEndX, y: bottomStart.y + tBottom * beamUy };

  // Vertical zone (% of box) where each word/letters sits — same for all 4 words.
  const wordZoneTop = 41;
  const wordZoneBottom = 79;

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
        <div className="hidden md:block relative w-full max-w-2xl aspect-[6/5] mx-auto px-6">
          {/* Decorative beam + divider lines (purely visual, sits behind the buttons) */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {/* Diagonal roof beam bending into the vertical pillar */}
            <polyline
              points={`0,0 ${pillarX},${pillarTopY}`}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />
            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={pillarX}
              y2={pillarBottomY}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
            />

            {/* Continuation of the beam past the pillar: opens into two thin
               parallel lines along the exact same slope, capped at the end. */}
            <line
              x1={topStart.x}
              y1={topStart.y}
              x2={topEnd.x}
              y2={topEnd.y}
              stroke="#1C1C1C"
              strokeWidth="0.6"
            />
            <line
              x1={bottomStart.x}
              y1={bottomStart.y}
              x2={bottomEnd.x}
              y2={bottomEnd.y}
              stroke="#1C1C1C"
              strokeWidth="0.6"
            />
            <line
              x1={topEnd.x}
              y1={topEnd.y}
              x2={bottomEnd.x}
              y2={bottomEnd.y}
              stroke="#1C1C1C"
              strokeWidth="0.6"
            />

            {/* The 5 thin staggered boundary lines */}
            {thinLineX.map((x, i) => (
              <line
                key={x}
                x1={x}
                y1={thinLineTopY[i]}
                x2={x}
                y2={thinLineBottomY}
                stroke="#1C1C1C"
                strokeWidth="0.7"
              />
            ))}
          </svg>

          {/* Clickable word zones, positioned in the gaps between the thin lines */}
          {items.map((item, idx) => {
            const left = thinLineX[idx];
            const width = thinLineX[idx + 1] - thinLineX[idx];
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
                  <span className="flex flex-col items-center leading-tight font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.1em] text-[#1C1C1C]">
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

