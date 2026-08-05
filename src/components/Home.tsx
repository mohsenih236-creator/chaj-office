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
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const items = [
    {
      en: 'PROJECTS',
      fa: 'پروژه‌ها',
      action: onProjects
    },
    {
      en: 'ABOUT',
      fa: 'درباره ما',
      action: onAbout
    },
    {
      en: 'SERVICES',
      fa: 'خدمات',
      action: onServices
    },
    {
      en: 'CONTACT',
      fa: 'تماس با ما',
      action: onContact
    }
  ];

  return (
    <div
      id="home-landing"
      className="relative min-h-screen overflow-hidden bg-[#F4F1EE]"
    >

      {/* =========================================
          INTRO
      ========================================= */}

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
          className="w-[220px] sm:w-[270px] md:w-[300px] animate-chaj-logo"
        />
      </div>


      {/* =========================================
          HOME
      ========================================= */}

      <main
        className={`relative min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
          introFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >

        {/* Main composition */}
        <div
          className="
            relative
            w-[760px]
            max-w-[72vw]
            h-[600px]
            max-h-[72vh]
          "
        >

          {/* =====================================
              TOP CHAJ GEOMETRY
          ===================================== */}

          {/* Main diagonal bar */}
          <div
            className="
              absolute
              left-[2%]
              top-[8%]
              w-[72%]
              h-[34px]
              bg-black
              origin-left
            "
            style={{
              transform: 'rotate(15deg)'
            }}
          />


          {/* Main vertical bar */}
          <div
            className="
              absolute
              right-[18%]
              top-[11%]
              w-[30px]
              h-[55%]
              bg-black
            "
          />


          {/* Small horizontal detail */}
          <div
            className="
              absolute
              right-[10%]
              top-[16%]
              w-[105px]
              h-[4px]
              bg-black
            "
          />


          {/* Small vertical detail */}
          <div
            className="
              absolute
              right-[10%]
              top-[16%]
              w-[4px]
              h-[42px]
              bg-black
            "
          />


          {/* =====================================
              NAVIGATION GRID
          ===================================== */}

          <div
            className="
              absolute
              left-[6%]
              right-[14%]
              top-[34%]
              bottom-[8%]
              grid
              grid-cols-4
            "
          >

            {items.map((item, index) => (

              <button
                key={item.en}
                onClick={item.action}
                className="
                  relative
                  h-full
                  flex
                  items-center
                  justify-center
                  group
                  cursor-pointer
                  bg-transparent
                "
              >

                {/* Vertical separator */}
                <span
                  className="
                    absolute
                    top-0
                    bottom-0
                    left-0
                    w-px
                    bg-black
                    opacity-80
                  "
                />


                {/* Navigation label */}
                <span
                  className="
                    relative
                    z-10
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-[13px]
                    sm:text-[14px]
                    md:text-[15px]
                    font-normal
                    tracking-[0.30em]
                    leading-[1.55]
                    text-black
                    transition-opacity
                    duration-500
                    group-hover:opacity-35
                  "
                >

                  {(isFa ? item.fa : item.en)
                    .split('')
                    .map((char, charIndex) => (
                      <span key={charIndex}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}

                </span>

              </button>

            ))}

            {/* Right boundary */}
            <span
              className="
                absolute
                top-0
                bottom-0
                right-0
                w-px
                bg-black
                opacity-80
              "
            />

          </div>


          {/* =====================================
              BOTTOM BASE LINE
          ===================================== */}

          <div
            className="
              absolute
              left-[6%]
              right-[14%]
              bottom-[8%]
              h-px
              bg-black
              opacity-80
            "
          />

        </div>

      </main>
    </div>
  );
};
