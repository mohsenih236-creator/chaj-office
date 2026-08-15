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
 * CONTINUOUS VERTICAL IMAGE REEL — SEAMLESS LOOP
 * ============================================================
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
   * ============================================================
   * SOFT IMAGE FADE
   * ============================================================
   *
   * IMPORTANT:
   *
   * The fade is applied to the entire image reel container,
   * NOT to the black architectural columns.
   *
   * This keeps the black columns completely sharp.
   *
   * TOP    → image fades out when leaving the zone
   * BOTTOM → image fades in when entering the zone
   * LEFT   → slight horizontal fade
   * RIGHT  → slight horizontal fade
   *
   * The actual dimensions and animation remain unchanged.
   */

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      `
        linear-gradient(
          to bottom,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.15) 5%,
          rgba(0,0,0,0.55) 10%,
          rgba(0,0,0,1) 35%,
          rgba(0,0,0,1) 65%,
          rgba(0,0,0,0.55) 90%,
          rgba(0,0,0,0.15) 95%,
          rgba(0,0,0,0) 100%
        ),
        linear-gradient(
          to right,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.45) 7%,
          rgba(0,0,0,1) 20%,
          rgba(0,0,0,1) 80%,
          rgba(0,0,0,0.45) 93%,
          rgba(0,0,0,0) 100%
        )
      `,

    WebkitMaskComposite: 'source-in',

    maskImage:
      `
        linear-gradient(
          to bottom,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.15) 5%,
          rgba(0,0,0,0.55) 10%,
          rgba(0,0,0,1) 35%,
          rgba(0,0,0,1) 65%,
          rgba(0,0,0,0.55) 90%,
          rgba(0,0,0,0.15) 95%,
          rgba(0,0,0,0) 100%
        ),
        linear-gradient(
          to right,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.45) 7%,
          rgba(0,0,0,1) 20%,
          rgba(0,0,0,1) 80%,
          rgba(0,0,0,0.45) 93%,
          rgba(0,0,0,0) 100%
        )
      `,

    maskComposite: 'intersect',

    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  };

  /*
   * ============================================================
   * ANIMATION TIMING
   * ============================================================
   */

  const loopDurationMs = intervalMs * images.length;
  const loopSeconds = (loopDurationMs / 1000).toFixed(2);

  const animName = `reel-scroll-${instanceId}`;

  /*
   * ============================================================
   * THREE COPIES OF THE IMAGE SEQUENCE
   * ============================================================
   */

  const tripled = [
    ...images,
    ...images,
    ...images
  ];

  /*
   * ============================================================
   * RETURN
   * ============================================================
   */

  return (
    <div
      className="
        relative
        w-full
        h-full
        overflow-hidden
      "
      style={{
        contain: 'paint',
        transform: 'translateZ(0)',

        /*
         * ======================================================
         * IMPORTANT
         * ======================================================
         *
         * The fade is attached to this outer container.
         *
         * Therefore the fade stays fixed at the four edges
         * of the image zone while the images continue moving.
         *
         * The black architectural lines are outside this
         * container and therefore remain completely sharp.
         */
        ...maskStyle
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: `${tripled.length * 100}%`,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          animation: `${animName} ${loopSeconds}s linear infinite`
        }}
      >
        {tripled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            style={{
              flex: '0 0 auto',
              width: '100%',
              height: `${100 / tripled.length}%`,
              overflow: 'hidden'
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="
                block
                w-full
                h-full
                object-cover
              "
              style={{
                /*
                 * NO MASK HERE.
                 *
                 * The fade belongs to the fixed image-zone
                 * container above.
                 */
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ${animName} {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(
              0,
              -${(100 * images.length) / tripled.length}%,
              0
            );
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

  const svgYToPercent = (svgY: number) =>
    ((svgY + MARGIN_Y) / viewBoxHeight) * 100;

  const zoneFor = (key: string) => {
    const idx = items.findIndex((i) => i.key === key);

    const left = colPercent[idx];

    const right =
      idx + 1 < colPercent.length
        ? colPercent[idx + 1]
        : colPercent[idx];

    const width = right - left;

    /*
     * Exact top heights of the two thin columns
     * surrounding this image zone.
     */

    const topLeftY = thinLineTopY[idx];

    const topRightY =
      idx + 1 < thinLineTopY.length
        ? thinLineTopY[idx + 1]
        : thinLineTopY[idx];

    /*
     * Exact bottom of all thin columns.
     */

    const bottomY = thinLineBottomY;

    /*
     * Convert SVG coordinates to percentage coordinates.
     */

    const topLeft = svgYToPercent(topLeftY);
    const topRight = svgYToPercent(topRightY);
    const bottom = svgYToPercent(bottomY);

    /*
     * The container begins at the higher point.
     */

    const top = topLeft;

    /*
     * Height is based on the left side.
     */

    const height = bottom - top;

    /*
     * The clip-path creates the exact trapezoid between
     * the two thin columns.
     */

    const rightTopPercent =
      ((topRight - top) / height) * 100;

    return {
      left,
      width,
      top,
      height,

      clipPath: `polygon(
        0% 0%,
        100% ${rightTopPercent}%,
        100% 100%,
        0% 100%
      )`
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
              top: `${projectsZone.top}%`,
              height: `${projectsZone.height}%`,
              clipPath: projectsZone.clipPath
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
              top: `${aboutZone.top}%`,
              height: `${aboutZone.height}%`,
              clipPath: aboutZone.clipPath
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
              top: `${servicesZone.top}%`,
              height: `${servicesZone.height}%`,
              clipPath: servicesZone.clipPath
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
              top: `${contactZone.top}%`,
              height: `${contactZone.height}%`,
              clipPath: contactZone.clipPath
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
              ================================================== */}

          <div
            className="
              absolute
              z-20
              pointer-events-none
              flex
              items-start
              justify-between
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
              top: '94%',
              fontFamily: '"CHAJGothic", sans-serif',
              direction: 'ltr',
              unicodeBidi: 'isolate'
            }}
            aria-hidden="true"
          >
            {'CHAJ GROUP'.split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                style={{
                  fontFamily: '"CHAJGothic", sans-serif',
                  direction: 'ltr',
                  unicodeBidi: 'isolate'
                }}
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
