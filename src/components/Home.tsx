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

// Continuously cross-fading image stack (no hard cuts) with soft,
// feathered edges on all sides via a mask gradient.
const CrossfadeStack: React.FC<{
  images: string[];
  intervalMs?: number;
}> = ({ images, intervalMs = 3200 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
    WebkitMaskComposite: 'source-in',
    maskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
    maskComposite: 'intersect'
  };

  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          className={`
            absolute inset-0
            w-full h-full
            object-cover
            transition-opacity
            duration-[1800ms]
            ease-in-out
            ${i === index ? 'opacity-100' : 'opacity-0'}
          `}
          style={maskStyle}
        />
      ))}
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  // Portrait images requested for the Projects word zone.
  const projectPreviewImages = [
    '/images/shirvani-render03.png',
    '/images/west-view-01.jpg'
  ];

  // Portrait team images for the About word zone.
  const aboutPreviewImages = studioInfo.principals
    .map((p) => p.image)
    .filter(Boolean);

  // Images for the Services word zone (full-bleed, same treatment as Projects).
  const servicesPreviewImages = [
    '/images/services-01.JPG',
    '/images/services-02.jpg',
    '/images/services-03.jpg'
  ];

  // Images for the Contact word zone (scaled-down, centered, same treatment as About).
  const contactPreviewImages = [
    '/images/connect-gmail.jpg',
    '/images/connect-inesta.jpg',
    '/images/connect-phone.jpg',
    '/images/coonect-telgram.jpg',
    '/images/coonect-whatsapp.jpg'
  ];

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
   * WORD POSITION
   * ------------------------------------------------------------
   */

  const wordZoneTop = 41;
  const wordZoneBottom = 79;

  // Percentage span (left/width) for each item's column, used to size
  // and position the background image stacks precisely between the
  // two letter-columns of each word. For the last item (contact) there
  // is no explicit right-edge entry in colPercent, so we fall back to
  // the same column width as the preceding gap to keep the zone sized
  // consistently with the others.
  const zoneFor = (key: string) => {
    const idx = items.findIndex((i) => i.key === key);
    const left = colPercent[idx];
    const width =
      idx + 1 < colPercent.length
        ? colPercent[idx + 1] - colPercent[idx]
        : colPercent[idx] - colPercent[idx - 1];
    return { left, width };
  };

  const projectsZone = zoneFor('projects');
  const aboutZone = zoneFor('about');
  const servicesZone = zoneFor('services');
  const contactZone = zoneFor('contact');

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
              PROJECTS — background crossfading portrait images
              Sits behind the "PROJECTS" word zone, between the
              two letter columns.
              ================================================== */}

          <div
            className="absolute pointer-events-none z-0"
            style={{
              left: `${projectsZone.left}%`,
              width: `${projectsZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <CrossfadeStack images={projectPreviewImages} intervalMs={3200} />
          </div>

          {/* ==================================================
              ABOUT — background crossfading team portraits,
              scaled down to sit within the "ABOUT" word zone.
              ================================================== */}

          <div
            className="absolute pointer-events-none z-0 flex items-center justify-center"
            style={{
              left: `${aboutZone.left}%`,
              width: `${aboutZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <div className="w-[62%] h-[62%]">
              <CrossfadeStack images={aboutPreviewImages} intervalMs={2600} />
            </div>
          </div>

          {/* ==================================================
              SERVICES — background crossfading images, same
              full-zone treatment as Projects.
              ================================================== */}

          <div
            className="absolute pointer-events-none z-0"
            style={{
              left: `${servicesZone.left}%`,
              width: `${servicesZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <CrossfadeStack images={servicesPreviewImages} intervalMs={3200} />
          </div>

          {/* ==================================================
              CONTACT — background crossfading images, scaled
              down and centered, same treatment as About.
              ================================================== */}

          <div
            className="absolute pointer-events-none z-0 flex items-center justify-center"
            style={{
              left: `${contactZone.left}%`,
              width: `${contactZone.width}%`,
              top: `${wordZoneTop}%`,
              height: `${wordZoneBottom - wordZoneTop}%`
            }}
          >
            <div className="w-[62%] h-[62%]">
              <CrossfadeStack images={contactPreviewImages} intervalMs={2600} />
            </div>
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
