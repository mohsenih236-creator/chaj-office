import React, { useEffect, useState } from 'react';
import { Language, Project, StudioInfo } from '../types';

interface HomeProps {
  language: Language;
  onProjects: () => void;
  onAbout: () => void;
  onServices: () => void;
  onContact: () => void;
  projects: Project[];
  studioInfo: StudioInfo;
}

/*
 * ============================================================
 * CONTINUOUS VERTICAL IMAGE REEL
 * ============================================================
 *
 * Images move upward continuously at a constant speed.
 *
 * The image list is duplicated:
 *
 *   1 → 2 → 3 → 4
 *   1 → 2 → 3 → 4
 *
 * The track moves exactly one complete image-set.
 * Therefore the end position is visually identical to
 * the beginning position and the loop can continue forever.
 */

let crossfadeInstanceCounter = 0;

const CrossfadeStack: React.FC<{
  images: string[];
  intervalMs?: number;
}> = ({ images, intervalMs = 3200 }) => {
  const instanceIdRef = React.useRef<number | null>(null);

  if (instanceIdRef.current === null) {
    crossfadeInstanceCounter += 1;
    instanceIdRef.current = crossfadeInstanceCounter;
  }

  const instanceId = instanceIdRef.current;

  if (images.length === 0) return null;

  /*
   * Soft fade/mask around the image.
   */
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',

    WebkitMaskComposite: 'source-in',

    maskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',

    maskComposite: 'intersect'
  };

  /*
   * Each image gets approximately intervalMs milliseconds.
   */
  const loopDurationMs = intervalMs * images.length;
  const loopSeconds = (loopDurationMs / 1000).toFixed(2);

  /*
   * Every CrossfadeStack gets its own animation name.
   */
  const animName = `reel-scroll-${instanceId}`;

  /*
   * Duplicate the complete image sequence.
   */
  const doubled = [...images, ...images];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '200%',
          animation: `${animName} ${loopSeconds}s linear infinite`
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            style={{
              flex: '0 0 50%',
              width: '100%',
              height: '50%'
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={maskStyle}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ${animName} {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({
  language,
  onProjects,
  onAbout,
  onServices,
  onContact,
  projects,
  studioInfo
}) => {
  const isFa = language === 'FA';

  const [introFinished, setIntroFinished] = useState(false);

  /*
   * ============================================================
   * INTRO
   * ============================================================
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  /*
   * ============================================================
   * PREVIEW IMAGES
   * ============================================================
   */

  const projectPreviewImages = [
    '/images/shirvani-render03.png',
    '/images/west-view-01.jpg',
    '/images/west-view-02.jpg',
    '/images/shirvani-old-woman.jpg'
  ];

  const aboutPreviewImages = studioInfo.principals
    .map((p) => p.image)
    .filter(Boolean);

  const servicesPreviewImages = [
    '/images/services-01.JPG',
    '/images/services-02.jpg',
    '/images/services-03.jpg'
  ];

  const contactPreviewImages = [
    '/images/connect-gmail.jpg',
    '/images/connect-inesta.jpg',
    '/images/connect-phone.jpg',
    '/images/coonect-telgram.jpg',
    '/images/coonect-whatsapp.jpg'
  ];

  /*
   * ============================================================
   * NAVIGATION ITEMS
   * ============================================================
   */

  const items = [
    {
      key: 'projects',
      labelEn: 'Projects',
      labelFa: 'پروژه‌ها',
      action: onProjects
    },
    {
      key: 'about',
      labelEn: 'About',
      labelFa: 'درباره ما',
      action: onAbout
    },
    {
      key: 'services',
      labelEn: 'Services',
      labelFa: 'خدمات',
      action: onServices
    },
    {
      key: 'contact',
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
   * Convert percentage positions to SVG coordinates.
   */

  const toSvgX = (percent: number) => {
    return -MARGIN_X + (percent / 100) * viewBoxWidth;
  };

  /*
   * ============================================================
   * FIVE THIN VERTICAL COLUMNS
   * ============================================================
   */

  const colPercent = [5, 18, 32, 45, 58];

  const thinLineX = colPercent.map(toSvgX);

  const thinLineTopY = [23, 27, 31, 34, 38];

  const thinLineBottomY = 91;

  /*
   * ============================================================
   * MAIN ROOF + COLUMN
   * ============================================================
   */

  const pillarX = 72 * ASPECT;

  const pillarTopY = 28;

  const pillarBottomY = 100;

  const roofStrokeWidth = 8;

  /*
   * ============================================================
   * ROOF GEOMETRY
   * ============================================================
   */

  const roofStartX = 0;
  const roofStartY = 0;

  const roofEndX = pillarX;
  const roofEndY = pillarTopY;

  /*
   * ============================================================
   * RIGHT ROOF CONTINUATION
   * ============================================================
   */

  const continuationEndX = contentWidth - 2;

  const beamLength = Math.sqrt(
    pillarX * pillarX + pillarTopY * pillarTopY
  );

  const beamUx = pillarX / beamLength;
  const beamUy = pillarTopY / beamLength;

  const tContinuation =
    (continuationEndX - pillarX) / beamUx;

  const continuationEndY =
    pillarTopY + tContinuation * beamUy;

  /*
   * ============================================================
   * WORD ZONE
   * ============================================================
   */

  const wordZoneTop = 41;
  const wordZoneBottom = 79;

  /*
   * ============================================================
   * IMAGE ZONES
   * ============================================================
   */

  const zoneFor = (key: string) => {
    const idx = items.findIndex((i) => i.key === key);

    const left = colPercent[idx];

    const width =
      idx + 1 < colPercent.length
        ? colPercent[idx + 1] - colPercent[idx]
        : colPercent[idx] - colPercent[idx - 1];

    return {
      left,
      width
    };
  };

  const projectsZone = zoneFor('projects');
  const aboutZone = zoneFor('about');
  const servicesZone = zoneFor('services');
  const contactZone = zoneFor('contact');

  /*
   * ============================================================
   * CHAJ GROUP POSITION
   * ============================================================
   *
   * IMPORTANT:
   *
   * The text starts exactly at the first thin column:
   *
   * C → column 1
   *
   * and ends exactly at the fifth thin column:
   *
   * P → column 5
   *
   * The text width therefore equals:
   *
   * colPercent[4] - colPercent[0]
   */

  const chajGroupLeft = colPercent[0];

  const chajGroupWidth =
    colPercent[colPercent.length - 1] - colPercent[0];

  /*
   * ============================================================
   * RETURN
   * ============================================================
   */

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

      {/* ======================================================
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
              PROJECTS IMAGE REEL
              ================================================== */}

          <div
            className="
              absolute
              pointer-events-none
              z-0
            "
            style={{
              left: `${projectsZone.left}%`,
              width: `${projectsZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <CrossfadeStack
              images={projectPreviewImages}
              intervalMs={3200}
            />
          </div>

          {/* ==================================================
              ABOUT IMAGE REEL
              ================================================== */}

          <div
            className="
              absolute
              pointer-events-none
              z-0
            "
            style={{
              left: `${aboutZone.left}%`,
              width: `${aboutZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <CrossfadeStack
              images={aboutPreviewImages}
              intervalMs={2600}
            />
          </div>

          {/* ==================================================
              SERVICES IMAGE REEL
              ================================================== */}

          <div
            className="
              absolute
              pointer-events-none
              z-0
            "
            style={{
              left: `${servicesZone.left}%`,
              width: `${servicesZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <CrossfadeStack
              images={servicesPreviewImages}
              intervalMs={3200}
            />
          </div>

          {/* ==================================================
              CONTACT IMAGE REEL
              ================================================== */}

          <div
            className="
              absolute
              pointer-events-none
              z-0
            "
            style={{
              left: `${contactZone.left}%`,
              width: `${contactZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <CrossfadeStack
              images={contactPreviewImages}
              intervalMs={2600}
            />
          </div>

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
              z-10
            "
            aria-hidden="true"
          >

            {/* =================================================
                MAIN DIAGONAL ROOF
                ================================================= */}

            <line
              x1={roofStartX}
              y1={roofStartY}
              x2={roofEndX}
              y2={roofEndY}
              stroke="#1C1C1C"
              strokeWidth={roofStrokeWidth}
              strokeLinecap="square"
            />

            {/* =================================================
                MAIN VERTICAL COLUMN
                ================================================= */}

            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={pillarX}
              y2={pillarBottomY}
              stroke="#1C1C1C"
              strokeWidth={roofStrokeWidth}
              strokeLinecap="butt"
            />

            {/* =================================================
                ROOF CONTINUATION
                ================================================= */}

            <line
              x1={pillarX}
              y1={pillarTopY}
              x2={continuationEndX}
              y2={continuationEndY}
              stroke="#1C1C1C"
              strokeWidth={roofStrokeWidth}
              strokeLinecap="square"
            />

            {/* =================================================
                FIVE THIN VERTICAL LINES
                ================================================= */}

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
              CHAJ GROUP
              ==================================================
              
              This is BELOW the five thin columns.

              C aligns with column 1.
              P aligns with column 5.

              The characters are distributed across the
              complete width using space-between.
          */}

          <div
            className="
              absolute
              z-20
              pointer-events-none
              flex
              items-start
              justify-between
              font-mono
              font-medium
              uppercase
              text-[#1C1C1C]
              leading-none
              tracking-[-0.055em]
              text-[13px]
              sm:text-[17px]
              md:text-[20px]
            "
            style={{
              left: `${chajGroupLeft}%`,
              width: `${chajGroupWidth}%`,
              top: '94%'
            }}
            aria-hidden="true"
          >
            {'CHAJ GROUP'.split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          {/* ==================================================
              CLICKABLE WORD ZONES
              ================================================== */}

          {items.map((item, idx) => {

            const left = colPercent[idx];

            const width =
              idx + 1 < colPercent.length
                ? colPercent[idx + 1] - colPercent[idx]
                : colPercent[idx] - colPercent[idx - 1];

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
                  z-20
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
                  height: `${wordZoneBottom - wordZoneTop}%`
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
                      mix-blend-difference
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
                      mix-blend-difference
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
