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

  // SVG aspect ratio is matched to the 6:5 container so the geometry
  // keeps the same visual proportions on desktop/tablet.
  const ASPECT = 6 / 5;

  const MARGIN_Y = 6;
  const MARGIN_X = MARGIN_Y * ASPECT;
  const contentWidth = 100 * ASPECT;
  const viewBoxWidth = contentWidth + MARGIN_X;
  const viewBoxHeight = 100 + MARGIN_Y;
  const viewBox = `${-MARGIN_X} ${-MARGIN_Y} ${viewBoxWidth} ${viewBoxHeight}`;

  // Convert a percentage of the actual container width into SVG coordinates.
  const toSvgX = (percent: number) =>
    -MARGIN_X + (percent / 100) * viewBoxWidth;

  // Five thin vertical lines create the four navigation columns.
  const colPercent = [5, 18, 32, 45, 58];
  const thinLineX = colPercent.map(toSvgX);
  const thinLineTopY = [23, 27, 31, 34, 38];
  const thinLineBottomY = 91;

  // Main roof + right column.
  const pillarX = 72 * ASPECT;
  const pillarTopY = 28;
  const pillarBottomY = 100;
  const beamStrokeWidth = 8;

  // Roof direction.
  const beamLen = Math.sqrt(pillarX * pillarX + pillarTopY * pillarTopY);
  const beamUx = pillarX / beamLen;
  const beamUy = pillarTopY / beamLen;

  // Perpendicular unit vector, pointing below the roof.
  const perpX = -beamUy;
  const perpY = beamUx;

  // Continue the solid roof beyond the column.
  const continuationEndX = contentWidth - 2;
  const tContinuation = (continuationEndX - pillarX) / beamUx;

  const continuationEnd = {
    x: continuationEndX,
    y: pillarTopY + tContinuation * beamUy
  };

  /*
   * REFERENCE DETAIL:
   *
   * The thin line under the roof must NOT touch the vertical pillar.
   * It starts approximately 1.5 cm to the right of the pillar, then
   * follows the same roof slope, and finally turns upward in an L-shape
   * until it reaches the underside of the thick roof.
   *
   * Because the SVG uses its own coordinate system, 1.5 cm is represented
   * here by ~10.5 SVG units at the current max-w-2xl desktop scale.
   * This keeps the visual gap matching the supplied reference.
   */
  const gutterHorizontalGap = 10.5;

  // Distance between the centerline of the solid roof and the thin line.
  // This keeps the thin line visibly separated from the roof.
  const belowLineGap = 10;

  // Start of the thin line: to the RIGHT of the pillar, not on the pillar.
  const belowLineStart = {
    x: pillarX + gutterHorizontalGap,
    y:
      pillarTopY +
      ((pillarX + gutterHorizontalGap - pillarX) / beamUx) * beamUy +
      belowLineGap * perpY
  };

  // End of the diagonal thin line.
  const belowLineEnd = {
    x: continuationEnd.x + belowLineGap * perpX,
    y: continuationEnd.y + belowLineGap * perpY
  };

  /*
   * The final vertical segment of the L.
   *
   * It rises from the end of the thin diagonal line to the underside
   * of the solid roof at exactly the same X position.
   */
  const roofUndersideAtEndY =
    continuationEnd.y + (beamStrokeWidth / 2) * perpY;

  const gutterPath = [
    `M ${belowLineStart.x} ${belowLineStart.y}`,
    `L ${belowLineEnd.x} ${belowLineEnd.y}`,
    `L ${belowLineEnd.x} ${roofUndersideAtEndY}`
  ].join(' ');

  // Vertical zone where each navigation word sits.
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
        {/* Desktop / tablet: architectural diagram layout */}
        <div className="hidden md:block relative w-full max-w-2xl aspect-[6/5] mx-auto px-6">
          {/* Architectural roof + divider lines */}
          <svg
            viewBox={viewBox}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {/* Main diagonal roof beam */}
            <polyline
              points={`0,0 ${pillarX},${pillarTopY}`}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />

            {/* Main vertical pillar */}
            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={pillarX}
              y2={pillarBottomY}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
            />

            {/* Solid roof continuation past the pillar */}
            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={continuationEnd.x}
              y2={continuationEnd.y}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />

            {/* 
              Thin L-shaped detail under the roof.

              1) Starts with a clear gap from the pillar.
              2) Runs parallel to the roof.
              3) Turns upward at the end and reaches the underside
                 of the thick roof, matching the supplied reference.
            */}
            <path
              d={gutterPath}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth="0.7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />

            {/* Five thin staggered vertical boundary lines */}
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
            const width = colPercent[idx + 1] - colPercent[idx];

            return (
              <button
                key={item.labelEn}
                onClick={item.action}
                aria-label={isFa ? item.labelFa : item.labelEn}
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
                        <span key={chIdx}>{ch}</span>
                      ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile: simple stacked rows */}
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

