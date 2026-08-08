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

  // --- Geometry ---

  const ASPECT = 6 / 5;

  const MARGIN_Y = 6;
  const MARGIN_X = MARGIN_Y * ASPECT;

  const contentWidth = 100 * ASPECT;
  const viewBoxWidth = contentWidth + MARGIN_X;
  const viewBoxHeight = 100 + MARGIN_Y;

  const viewBox = `${-MARGIN_X} ${-MARGIN_Y} ${viewBoxWidth} ${viewBoxHeight}`;

  const toSvgX = (percent: number) =>
    -MARGIN_X + (percent / 100) * viewBoxWidth;

  // 5 thin staggered boundary lines
  const colPercent = [5, 18, 32, 45, 58];

  const thinLineX = colPercent.map(toSvgX);
  const thinLineTopY = [23, 27, 31, 34, 38];
  const thinLineBottomY = 91;

  // Main pillar
  const pillarX = 72 * ASPECT;
  const pillarTopY = 28;
  const pillarBottomY = 100;

  const beamStrokeWidth = 8;

  // Roof beam direction
  const beamLen = Math.sqrt(
    pillarX * pillarX + pillarTopY * pillarTopY
  );

  const beamUx = pillarX / beamLen;
  const beamUy = pillarTopY / beamLen;

  // Perpendicular direction to the roof beam
  const perpX = -beamUy;
  const perpY = beamUx;

  // --- Roof continuation ---

  const continuationEndX = contentWidth - 2;

  const tContinuation =
    (continuationEndX - pillarX) / beamUx;

  const continuationEnd = {
    x: continuationEndX,
    y: pillarTopY + tContinuation * beamUy
  };

  const halfThickness = beamStrokeWidth / 2;

  // ------------------------------------------------------------
  // THIN L-SHAPED ACCENT LINE
  // ------------------------------------------------------------
  //
  // The diagonal section follows the exact same slope as the roof.
  // The vertical return is placed at the exact end of that diagonal
  // and stops inside the roof thickness.
  //

  const belowLineStart = {
    x: pillarX + halfThickness * perpX,
    y: pillarTopY + halfThickness * perpY
  };

  // End of the diagonal accent line.
  // It follows the roof slope and sits just below the roof.
  const belowLineEnd = {
    x: continuationEnd.x + halfThickness * perpX,
    y: continuationEnd.y + halfThickness * perpY
  };

  // Centerline Y at the exact X position of the vertical return.
  const centerLineYAtReturn =
    pillarTopY +
    ((belowLineEnd.x - pillarX) / beamUx) * beamUy;

  // Top boundary of the roof thickness at the same X position.
  // The vertical return ends here, so it cannot protrude above the roof.
  const roofTopYAtReturn =
    centerLineYAtReturn - halfThickness * beamUx;

  // Vertical return keeps exactly the same X coordinate.
  const belowLineTopEnd = {
    x: belowLineEnd.x,
    y: roofTopYAtReturn
  };

  // Vertical zone for the words
  const wordZoneTop = 41;
  const wordZoneBottom = 79;

  return (
    <div
      id="home-landing"
      className="relative min-h-screen overflow-hidden bg-[#F4F1EE]"
    >
      {/* CHAJ LOGO INTRO */}
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center bg-[#F4F1EE] transition-opacity duration-1000 ${
          introFinished
            ? 'pointer-events-none opacity-0'
            : 'opacity-100'
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
        {/* Desktop / tablet */}
        <div className="hidden md:block relative w-full max-w-2xl aspect-[6/5] mx-auto px-6">

          {/* Decorative architectural diagram */}
          <svg
            viewBox={viewBox}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {/* Diagonal roof beam */}
            <polyline
              points={`0,0 ${pillarX},${pillarTopY}`}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />

            {/* Vertical pillar */}
            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={pillarX}
              y2={pillarBottomY}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
            />

            {/* Roof continuation */}
            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={continuationEnd.x}
              y2={continuationEnd.y}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />

            {/* Thin L-shaped black accent line */}
            <path
              d={`
                M ${belowLineStart.x} ${belowLineStart.y}
                L ${belowLineEnd.x} ${belowLineEnd.y}
                L ${belowLineTopEnd.x} ${belowLineTopEnd.y}
              `}
              fill="none"
              stroke="#000000"
              strokeWidth="0.7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />

            {/* 5 thin staggered boundary lines */}
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

          {/* Clickable word zones */}
          {items.map((item, idx) => {
            const left = colPercent[idx];
            const width =
              colPercent[idx + 1] - colPercent[idx];

            return (
              <button
                key={item.labelEn}
                onClick={item.action}
                aria-label={
                  isFa ? item.labelFa : item.labelEn
                }
                className="group absolute flex items-start justify-center cursor-pointer transition-opacity duration-500 hover:opacity-50"
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
                        <span key={chIdx}>
                          {ch}
                        </span>
                      ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden flex-col w-full">
          {items.map((item, idx) => (
            <button
              key={item.labelEn}
              onClick={item.action}
              className={`w-full py-10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-black/[0.025] ${
                idx !== items.length - 1
                  ? 'border-b border-black/10'
                  : ''
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
