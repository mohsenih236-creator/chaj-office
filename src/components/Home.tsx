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
  //
  // The diagram box (aspect-[6/5], i.e. 1.2:1) is WIDER than it is tall, but the
  // old viewBox was a plain square ("0 0 100 100") stretched with
  // preserveAspectRatio="none". That stretch is NON-uniform (x gets scaled more
  // than y), so a stroke of the same strokeWidth renders thinner or thicker
  // depending on which direction the line runs — that's exactly why the pillar
  // (a pure-vertical line, width along x) looked thicker than the sloped beam
  // (width mostly along y). To fix it for real, the viewBox's own aspect ratio
  // must match the box's aspect ratio (1.2:1) so the stretch is uniform.
  //
  // So: Y stays a plain 0-100 scale (100 = full height). X is expressed in the
  // SAME physical units by multiplying "% of width" by ASPECT — i.e. 100% of
  // width = 120 units, matching 100 units of height at a 1.2:1 ratio. Every
  // x-coordinate below is written as `<percent-of-width> * ASPECT`.
  const ASPECT = 6 / 5;

  // The beam's start cap needs a small margin around the viewBox so it isn't
  // clipped (see below) — defined early because thinLineX needs it too.
  const MARGIN_Y = 6;
  const MARGIN_X = MARGIN_Y * ASPECT;
  const contentWidth = 100 * ASPECT;
  const viewBoxWidth = contentWidth + MARGIN_X;
  const viewBoxHeight = 100 + MARGIN_Y;
  const viewBox = `${-MARGIN_X} ${-MARGIN_Y} ${viewBoxWidth} ${viewBoxHeight}`;

  // Converts "% of the container's width" into the SVG x-coordinate that will
  // actually render at that exact percentage. Naively using `percent * ASPECT`
  // (as before) ignores that the margin above ALSO grew the viewBox's total
  // width — so the same raw coordinate ends up rendering at a smaller
  // percentage than intended. That mismatch was exactly why the thin divider
  // lines drifted away from the button edges they're supposed to bound. Any
  // x-position that must land at a specific % of the container (the 5 thin
  // lines, matched to the buttons' left/width %) MUST go through this helper.
  const toSvgX = (percent: number) => -MARGIN_X + (percent / 100) * viewBoxWidth;

  // 5 thin lines create the 4 equal-width word gaps (Projects / About / Services / Contact).
  // Column CSS positions (button left/width) stay plain 0-100 percentages — those
  // are unrelated to the SVG's internal coordinate system and were already correct;
  // thinLineX is now derived from the SAME numbers via toSvgX so the lines land
  // exactly at the button edges instead of drifting off them.
  const colPercent = [5, 18, 32, 45, 58];
  const thinLineX = colPercent.map(toSvgX);
  const thinLineTopY = [23, 27, 31, 34, 38]; // staggered, tallest (smallest y) on the left
  const thinLineBottomY = 91; // shared bottom for all 5 thin lines

  // The thick pillar sits separately, further right, with an empty unlabeled gap
  // between it and the 5th thin line. It bends out of the diagonal roof beam at
  // the top, and overhangs slightly LOWER than the thin lines at the bottom.
  // (Left in plain content-space coordinates, unchanged — this angle/position
  // was already confirmed correct against the reference.)
  const pillarX = 72 * ASPECT;
  const pillarTopY = 28; // where the beam bends into the pillar
  const pillarBottomY = 100;
  const beamStrokeWidth = 8;

  // Beam direction, computed once the coordinate system is uniform — this is
  // the TRUE visual angle of the roofline (was previously skewed by the
  // non-uniform stretch above).
  const beamLen = Math.sqrt(pillarX * pillarX + pillarTopY * pillarTopY);
  const beamUx = pillarX / beamLen;
  const beamUy = pillarTopY / beamLen;
  const perpX = -beamUy; // perpendicular unit vector, points "down" off the beam
  const perpY = beamUx;

  // The beam's start cap at (0,0) extends ~halfThickness past the corner in
  // every direction (it's a "square" linecap on a diagonal). With no margin,
  // that overshoot fell into negative territory and got clipped by the SVG
  // viewBox — that was the "cut roof tip" bug. The margin defined above gives
  // it room to render in full.
  // --- Continuation of the roof beam PAST the pillar. ---
  // In the reference this is a SOLID bar, same thickness as the main beam,
  // running along the exact same slope — not a hollow outline. A separate,
  // thin line sits just below it, also starting at the column.
  const continuationEndX = contentWidth - 2; // near the right edge, matching the reference's whitespace after it
  const tContinuation = (continuationEndX - pillarX) / beamUx;
  const continuationEnd = {
    x: continuationEndX,
    y: pillarTopY + tContinuation * beamUy
  };

  const halfThickness = beamStrokeWidth / 2;

  // The thin line below the continuation: it must touch the UNDERSIDE of the
  // roof/pillar junction (no gap) and rise as it travels right, closing back
  // up to meet the roof's own thickness by the time it reaches the end of the
  // continuation — a tapering sliver, not a parallel offset line.
  const belowLineStart = {
    x: pillarX + halfThickness * perpX,
    y: pillarTopY + halfThickness * perpY
  };
  const belowLineEnd = {
    x: continuationEnd.x - halfThickness * perpX,
    y: continuationEnd.y - halfThickness * perpY
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

            {/* Continuation of the beam past the pillar: SOLID, same thickness
               as the main beam, along the exact same slope. */}
            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={continuationEnd.x}
              y2={continuationEnd.y}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />

            {/* Thin accent line just below the continuation, starting at the column */}
            <line
              x1={belowLineStart.x}
              y1={belowLineStart.y}
              x2={belowLineEnd.x}
              y2={belowLineEnd.y}
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

