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

  // --- Geometry, measured directly from the reference image. ---
  const ASPECT = 6 / 5;

  const colPercent = [5, 18, 32, 45, 58];
  const thinLineX = colPercent.map((p) => p * ASPECT);
  const thinLineTopY = [23, 27, 31, 34, 38];
  const thinLineBottomY = 91;

  const pillarX = 72 * ASPECT;
  const pillarTopY = 28;
  const pillarBottomY = 100;
  const beamStrokeWidth = 8;

  const beamLen = Math.sqrt(pillarX * pillarX + pillarTopY * pillarTopY);
  const beamUx = pillarX / beamLen;
  const beamUy = pillarTopY / beamLen;
  const perpX = -beamUy; // perpendicular unit vector, points "down" off the beam
  const perpY = beamUx;

  const MARGIN_Y = 6;
  const MARGIN_X = MARGIN_Y * ASPECT;
  const contentWidth = 100 * ASPECT;
  const viewBox = `${-MARGIN_X} ${-MARGIN_Y} ${contentWidth + MARGIN_X} ${100 + MARGIN_Y}`;

  const halfThickness = beamStrokeWidth / 2;

  // --- Continuation of the roof beam PAST the pillar. ---
  // Per reference: this is a THIN line (not a solid thick bar) that begins
  // exactly at the TOP edge of the beam/pillar junction (i.e. offset "up"
  // from the beam centerline by halfThickness along the perpendicular),
  // and travels down-right along the SAME slope as the main beam, ending
  // lower than it started — matching the hand-drawn red reference line.
  const continuationEndX = contentWidth - 2;
  const tContinuation = (continuationEndX - pillarX) / beamUx;

  // Start point: top edge of the beam at the pillar junction.
  const continuationStart = {
    x: pillarX - halfThickness * perpX,
    y: pillarTopY - halfThickness * perpY
  };
  // End point: same slope, projected out to continuationEndX, then also
  // pulled up by halfThickness so the whole thin line traces the beam's
  // top edge (not its centerline) — this is what makes it read as a
  // continuation of the roof's top surface rather than a parallel offset bar.
  const rawEnd = {
    x: continuationEndX,
    y: pillarTopY + tContinuation * beamUy
  };
  const continuationEnd = {
    x: rawEnd.x - halfThickness * perpX,
    y: rawEnd.y - halfThickness * perpY
  };

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
            viewBox={viewBox}
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

            {/* Thin continuation line tracing the TOP edge of the beam past
               the pillar, matching the reference's red guide line. */}
            <line
              x1={continuationStart.x}
              y1={continuationStart.y}
              x2={continuationEnd.x}
              y2={continuationEnd.y}
              stroke="#1C1C1C"
              strokeWidth="0.7"
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
            const left = colPercent[idx];
            const width = colPercent[idx + 1] - colPercent[idx];
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
                  <span className="font-serif text-lg sm:text-xl text-[#1C1C1C] tracking-tight text-center">
                    {item.labelFa}
                  </span>
                ) : (
                  <span className="flex flex-col items-center leading-tight font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.1em] text-[#1C1C1C] text-center">
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

