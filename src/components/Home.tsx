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

  const items = [
    {
      labelEn: 'Projects',
      labelFa: 'پروژه‌ها',
      action: onProjects
    },
    {
      labelEn: 'About',
      labelFa: 'درباره ما',
      action: onAbout
    },
    {
      labelEn: 'Services',
      labelFa: 'خدمات',
      action: onServices
    },
    {
      labelEn: 'Contact',
      labelFa: 'تماس با ما',
      action: onContact
    }
  ];

  /*
   * ============================================================
   * ARCHITECTURAL DIAGRAM
   * ============================================================
   */

  const ASPECT = 6 / 5;

  const MARGIN_Y = 6;
  const MARGIN_X = MARGIN_Y * ASPECT;

  const contentWidth = 100 * ASPECT;

  const viewBoxWidth = contentWidth + MARGIN_X;
  const viewBoxHeight = 100 + MARGIN_Y;

  const viewBox = `
    ${-MARGIN_X}
    ${-MARGIN_Y}
    ${viewBoxWidth}
    ${viewBoxHeight}
  `;

  /*
   * Convert percentage of visual container width
   * into SVG coordinates.
   */
  const toSvgX = (percent: number) => {
    return -MARGIN_X + (percent / 100) * viewBoxWidth;
  };

  /*
   * ------------------------------------------------------------
   * FIVE VERTICAL LINES
   * ------------------------------------------------------------
   */

  const colPercent = [5, 18, 32, 45, 58];

  const thinLineX = colPercent.map(toSvgX);

  const thinLineTopY = [23, 27, 31, 34, 38];

  const thinLineBottomY = 91;

  /*
   * ------------------------------------------------------------
   * MAIN ROOF + COLUMN
   * ------------------------------------------------------------
   */

  const pillarX = 72 * ASPECT;

  const pillarTopY = 28;

  const pillarBottomY = 100;

  const roofStrokeWidth = 8;

  /*
   * ------------------------------------------------------------
   * ROOF GEOMETRY
   * ------------------------------------------------------------
   */

  const roofStartX = 0;
  const roofStartY = 0;

  /*
   * Main roof ends exactly at the column.
   */
  const roofEndX = pillarX;
  const roofEndY = pillarTopY;

  /*
   * ------------------------------------------------------------
   * RIGHT SIDE OF ROOF
   * ------------------------------------------------------------
   *
   * The roof continues past the column.
   */

  const continuationEndX = contentWidth - 2;

  const beamLength = Math.sqrt(
    pillarX * pillarX + pillarTopY * pillarTopY
  );

  const beamUx = pillarX / beamLength;
  const beamUy = pillarTopY / beamLength;

  /*
   * Continue the roof using the EXACT SAME slope.
   */
  const tContinuation =
    (continuationEndX - pillarX) / beamUx;

  const continuationEndY =
    pillarTopY + tContinuation * beamUy;

  /*
   * ------------------------------------------------------------
   * THIN LINE UNDER THE ROOF
   * ------------------------------------------------------------
   *
   * IMPORTANT:
   *
   * This is NOT a <path>.
   *
   * It is made from two simple SVG lines:
   *
   * 1. diagonal line under the roof
   * 2. vertical line at the right end
   *
   * This creates the L-shaped detail from the reference image.
   */

  /*
   * Horizontal distance between the pillar and
   * the beginning of the thin diagonal line.
   *
   * This is intentionally separated from the pillar.
   */
  const thinLineStartGap = 7;

  /*
   * Perpendicular direction from the roof.
   */
  const perpX = -beamUy;
  const perpY = beamUx;

  /*
   * Start of the thin line.
   *
   * It begins to the RIGHT of the pillar,
   * while also being below the roof.
   */
  const thinRoofStart = {
    x: pillarX + thinLineStartGap,
    y: pillarTopY + thinLineStartGap * (beamUy / beamUx)
  };

  /*
   * End of the diagonal thin line.
   *
   * It stops before the end of the thick roof.
   */
  const thinRoofEndX = continuationEndX - 3;

  const thinRoofT =
    (thinRoofEndX - pillarX) / beamUx;

  const thinRoofCenterEnd = {
    x: thinRoofEndX,
    y: pillarTopY + thinRoofT * beamUy
  };

  /*
   * Move the line downward from the roof.
   *
   * This controls the visible gap between
   * the thick roof and thin line.
   */
  const thinRoofOffset = 7;

  const thinRoofEnd = {
    x:
      thinRoofCenterEnd.x +
      thinRoofOffset * perpX,

    y:
      thinRoofCenterEnd.y +
      thinRoofOffset * perpY
  };

  /*
   * The vertical end of the L.
   *
   * It rises upward until it reaches
   * the LOWER edge of the thick roof.
   */
  const roofHalfThickness = roofStrokeWidth / 2;

  const lVerticalTopY =
    continuationEndY + roofHalfThickness;

  /*
   * Small correction so the vertical stroke visually
   * touches the bottom edge of the thick roof.
   */
  const lVerticalBottomY = thinRoofEnd.y;

  /*
   * ------------------------------------------------------------
   * WORD POSITION
   * ------------------------------------------------------------
   */

  const wordZoneTop = 41;
  const wordZoneBottom = 79;

  return (
    <div
      id="home-landing"
      className="relative min-h-screen overflow-hidden bg-[#F4F1EE]"
    >

      {/* ======================================================
          CHAJ LOGO INTRO
          ====================================================== */}

      <div
        className={`
          absolute inset-0 z-50
          flex items-center justify-center
          bg-[#F4F1EE]
          transition-opacity duration-1000
          ${
            introFinished
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'
          }
        `}
      >
        <img
          src="/images/chaj-logo-group.png"
          alt="CHAJ Architecture Group"
          className="
            w-[220px]
            sm:w-[270px]
            md:w-[320px]
            animate-chaj-logo
          "
        />
      </div>

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <div
        className={`
          min-h-screen
          pt-20
          flex
          items-center
          justify-center
          transition-opacity
          duration-1000
          ${
            introFinished
              ? 'opacity-100'
              : 'opacity-0'
          }
        `}
      >

        {/* ====================================================
            ARCHITECTURAL DIAGRAM
            DESKTOP + MOBILE
            ==================================================== */}

        <div
          className="
            relative
            w-[88vw]
            max-w-2xl
            aspect-[6/5]
            mx-auto
          "
        >

          {/* ==================================================
              SVG ARCHITECTURAL DRAWING
              ================================================== */}

          <svg
            viewBox={viewBox}
            preserveAspectRatio="none"
            className="
              absolute
              inset-0
              w-full
              h-full
              pointer-events-none
            "
            aria-hidden="true"
          >

            {/* ================================================
                MAIN DIAGONAL ROOF
                ================================================ */}

            <line
              x1={roofStartX}
              y1={roofStartY}
              x2={roofEndX}
              y2={roofEndY}
              stroke="#1C1C1C"
              strokeWidth={roofStrokeWidth}
              strokeLinecap="square"
            />

            {/* ================================================
                VERTICAL COLUMN
                ================================================ */}

            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={pillarX}
              y2={pillarBottomY}
              stroke="#1C1C1C"
              strokeWidth={roofStrokeWidth}
              strokeLinecap="butt"
            />

            {/* ================================================
                ROOF CONTINUATION AFTER COLUMN
                ================================================ */}

            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={continuationEndX}
              y2={continuationEndY}
              stroke="#1C1C1C"
              strokeWidth={roofStrokeWidth}
              strokeLinecap="square"
            />

            {/* ================================================
                THIN DIAGONAL LINE UNDER ROOF

                IMPORTANT:
                This is a normal <line>, NOT a path.

                It starts with a gap from the column.
                ================================================ */}

            

            {/* ================================================
                VERTICAL END OF THIN LINE

                This creates the L shape and rises
                into the thickness of the roof.
                ================================================ */}

            

            {/* ================================================
                FIVE THIN VERTICAL LINES
                ================================================ */}

            {thinLineX.map((x, i) => (
              <line
                key={`thin-line-${i}`}
                x1={x}
                y1={thinLineTopY[i]}
                x2={x}
                y2={thinLineBottomY}
                stroke="#1C1C1C"
                strokeWidth="0.7"
              />
            ))}

          </svg>

          {/* ==================================================
              CLICKABLE WORD ZONES
              ================================================== */}

          {items.map((item, idx) => {

            const left = colPercent[idx];

            const width =
              colPercent[idx + 1] -
              colPercent[idx];

            return (
              <button
                key={item.labelEn}
                onClick={item.action}
                aria-label={
                  isFa
                    ? item.labelFa
                    : item.labelEn
                }
                className="
                  group
                  absolute
                  flex
                  items-start
                  justify-center
                  cursor-pointer
                  transition-opacity
                  duration-500
                  hover:opacity-50
                "
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: `${wordZoneTop}%`,
                  height:
                    `${wordZoneBottom - wordZoneTop}%`
                }}
              >

                {isFa ? (

                  <span
                    className="
                      font-serif
                      text-[11px]
                      sm:text-lg
                      md:text-xl
                      text-[#1C1C1C]
                      tracking-tight
                    "
                  >
                    {item.labelFa}
                  </span>

                ) : (

                  <span
                    className="
                      flex
                      flex-col
                      items-center
                      leading-tight
                      font-mono
                      font-medium
                      uppercase
                      text-[8px]
                      sm:text-xs
                      md:text-sm
                      tracking-[0.1em]
                      text-[#1C1C1C]
                    "
                  >
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

      </div>
    </div>
  );
};
