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

  // =========================================================
  // SVG GEOMETRY
  // =========================================================

  const ASPECT = 6 / 5;

  const MARGIN_Y = 6;
  const MARGIN_X = MARGIN_Y * ASPECT;

  const contentWidth = 100 * ASPECT;

  const viewBoxWidth = contentWidth + MARGIN_X;
  const viewBoxHeight = 100 + MARGIN_Y;

  const viewBox = `${-MARGIN_X} ${-MARGIN_Y} ${viewBoxWidth} ${viewBoxHeight}`;

  // تبدیل درصد عرض کانتینر به مختصات واقعی SVG
  const toSvgX = (percent: number) => {
    return (
      -MARGIN_X +
      (percent / 100) * viewBoxWidth
    );
  };

  // =========================================================
  // FIVE THIN VERTICAL LINES
  // =========================================================

  const colPercent = [
    5,
    18,
    32,
    45,
    58
  ];

  const thinLineX = colPercent.map(toSvgX);

  const thinLineTopY = [
    23,
    27,
    31,
    34,
    38
  ];

  const thinLineBottomY = 91;

  // =========================================================
  // MAIN ROOF + VERTICAL PILLAR
  // =========================================================

  const pillarX = 72 * ASPECT;

  const pillarTopY = 28;

  const pillarBottomY = 100;

  // ضخامت سقف و ستون
  const beamStrokeWidth = 8;

  // =========================================================
  // ROOF VECTOR
  // =========================================================

  /*
   * سقف از نقطه‌ی 0,0 شروع می‌شود
   * و در نقطه‌ی ستون به:
   *
   * pillarX , pillarTopY
   *
   * می‌رسد.
   */

  const beamLen = Math.sqrt(
    pillarX * pillarX +
      pillarTopY * pillarTopY
  );

  // بردار واحد در راستای سقف
  const beamUx =
    pillarX / beamLen;

  const beamUy =
    pillarTopY / beamLen;

  /*
   * بردار عمود بر سقف
   *
   * این بردار برای ایجاد خط نازک زیر سقف
   * استفاده می‌شود تا خط دقیقاً موازی سقف باشد.
   */

  const perpX = -beamUy;
  const perpY = beamUx;

  // =========================================================
  // ROOF CONTINUATION
  // =========================================================

  /*
   * سقف بعد از ستون نیز ادامه دارد.
   */

  const continuationEndX =
    contentWidth - 2;

  const tContinuation =
    (continuationEndX - pillarX) /
    beamUx;

  const continuationEnd = {
    x: continuationEndX,

    y:
      pillarTopY +
      tContinuation * beamUy
  };

  // =========================================================
  // THIN L-SHAPED LINE UNDER ROOF
  // =========================================================

  /*
   * فاصله‌ی شروع خط نازک از ستون.
   *
   * این همان بخشی است که در رفرنس حدود
   * 1.5 سانتی‌متر فاصله دارد.
   */

  const gutterHorizontalGap = 10.5;

  /*
   * فاصله‌ی خط نازک از زیر سقف.
   */

  const gutterHorizontalGap = 10.5;
const belowLineGap = 7;

const gutterStartX =
  pillarX + gutterHorizontalGap;

const gutterStartRoofY =
  pillarTopY +
  ((gutterStartX - pillarX) / beamUx) *
    beamUy;

const gutterStartUndersideY =
  gutterStartRoofY +
  (beamStrokeWidth / 2) * perpY;

const belowLineStart = {
  x:
    gutterStartX +
    belowLineGap * perpX,

  y:
    gutterStartUndersideY +
    belowLineGap * perpY
};

const belowLineEnd = {
  x:
    continuationEnd.x +
    belowLineGap * perpX,

  y:
    continuationEnd.y +
    belowLineGap * perpY
};

// نقطه‌ی اتصال عمودی به زیر سقف
const gutterRoofEndY =
  continuationEnd.y +
  (beamStrokeWidth / 2) * perpY;

const gutterPath =
  `M ${belowLineStart.x} ${belowLineStart.y} ` +
  `L ${belowLineEnd.x} ${belowLineEnd.y} ` +
  `L ${belowLineEnd.x} ${gutterRoofEndY}`;

  // =========================================================
  // WORD POSITIONS
  // =========================================================

  const wordZoneTop = 41;

  const wordZoneBottom = 79;

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div
      id="home-landing"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F4F1EE]
      "
    >

      {/* =====================================================
          CHAJ LOGO INTRO
      ====================================================== */}

      <div
        className={`
          absolute
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-[#F4F1EE]
          transition-opacity
          duration-1000

          ${
            introFinished
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'
          }
        `}
      >

        <img
          src="/images/chaj-logo.png"
          alt="CHAJ Architecture Group"
          className="
            w-[220px]
            sm:w-[270px]
            md:w-[320px]
            animate-chaj-logo
          "
        />

      </div>

      {/* =====================================================
          MAIN NAVIGATION
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

        {/* ===================================================
            DESKTOP / TABLET
        ==================================================== */}

        <div
          className="
            hidden
            md:block
            relative
            w-full
            max-w-2xl
            aspect-[6/5]
            mx-auto
            px-6
          "
        >

          {/* =================================================
              ARCHITECTURAL SVG
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

            {/* =================================================
                MAIN DIAGONAL ROOF
            ================================================== */}

            <polyline
              points={`
                0,0
                ${pillarX},${pillarTopY}
              `}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />

            {/* =================================================
                VERTICAL PILLAR
            ================================================== */}

            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={pillarX}
              y2={pillarBottomY}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
            />

            {/* =================================================
                ROOF CONTINUATION AFTER PILLAR
            ================================================== */}

            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={continuationEnd.x}
              y2={continuationEnd.y}
              stroke="#1C1C1C"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="square"
            />

            {/* =================================================
                THIN L-SHAPED LINE
            ================================================== */}

            <path
              d={gutterPath}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth="0.7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />

            {/* =================================================
                FIVE THIN VERTICAL LINES
            ================================================== */}

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

          {/* =================================================
              CLICKABLE WORD ZONES
          ================================================== */}

          {items.map((item, idx) => {

            const left =
              colPercent[idx];

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
                  height: `${
                    wordZoneBottom -
                    wordZoneTop
                  }%`
                }}
              >

                {isFa ? (

                  <span
                    className="
                      font-serif
                      text-lg
                      sm:text-xl
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
                      text-xs
                      sm:text-sm
                      tracking-[0.1em]
                      text-[#1C1C1C]
                    "
                  >

                    {item.labelEn
                      .toUpperCase()
                      .split('')
                      .map(
                        (
                          ch,
                          chIdx
                        ) => (
                          <span
                            key={chIdx}
                          >
                            {ch}
                          </span>
                        )
                      )}

                  </span>

                )}

              </button>
            );
          })}

        </div>

        {/* ===================================================
            MOBILE
        ==================================================== */}

        <div
          className="
            flex
            md:hidden
            flex-col
            w-full
          "
        >

          {items.map(
            (item, idx) => (

              <button
                key={item.labelEn}
                onClick={item.action}
                className={`
                  w-full
                  py-10
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  transition-colors
                  duration-300
                  hover:bg-black/[0.025]

                  ${
                    idx !==
                    items.length - 1
                      ? 'border-b border-black/10'
                      : ''
                  }
                `}
              >

                <span
                  className="
                    font-serif
                    italic
                    text-xl
                    text-[#1C1C1C]
                    tracking-tight
                  "
                >
                  {
                    isFa
                      ? item.labelFa
                      : item.labelEn
                  }
                </span>

              </button>

            )
          )}

        </div>

      </div>

    </div>
  );
};
