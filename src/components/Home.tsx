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
      labelEn: 'PROJECTS',
      labelFa: 'پروژه‌ها',
      action: onProjects
    },
    {
      labelEn: 'ABOUT',
      labelFa: 'درباره ما',
      action: onAbout
    },
    {
      labelEn: 'SERVICES',
      labelFa: 'خدمات',
      action: onServices
    },
    {
      labelEn: 'CONTACT',
      labelFa: 'تماس با ما',
      action: onContact
    }
  ];

  return (
    <div
      id="home-landing"
      className="relative min-h-screen overflow-hidden bg-[#F4F1EE] text-[#111111]"
    >

      {/* =========================
          CHAJ INTRO
      ========================= */}
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


      {/* =========================
          MAIN HOME
      ========================= */}
      <main
        className={`relative min-h-screen flex items-center justify-center px-8 sm:px-12 md:px-20 lg:px-32 transition-opacity duration-1000 ${
          introFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >

        <div className="relative w-full max-w-[1050px] h-[620px] sm:h-[650px]">

          {/* =========================
              CHAJ SYMBOL / TOP BAR
          ========================= */}

          <div className="absolute top-[35px] left-1/2 -translate-x-1/2 w-[55%] sm:w-[53%] md:w-[52%]">

            {/* diagonal upper bar */}
            <div
              className="absolute left-0 top-0 w-full h-[28px] sm:h-[32px] md:h-[38px] bg-black origin-left"
              style={{
                transform: 'rotate(15deg)'
              }}
            />

            {/* vertical CHAJ stem */}
            <div className="absolute right-[10%] top-[20px] w-[30px] sm:w-[34px] md:w-[38px] h-[340px] bg-black" />

            {/* small horizontal detail */}
            <div className="absolute right-[4%] top-[55px] w-[125px] sm:w-[140px] md:w-[155px] h-[5px] bg-black" />

            {/* small vertical detail */}
            <div className="absolute right-[4%] top-[55px] w-[5px] h-[45px] bg-black" />

          </div>


          {/* =========================
              NAVIGATION AREA
          ========================= */}

          <div
            className="absolute left-[22%] right-[22%] bottom-[55px] top-[160px] grid grid-cols-4"
          >

            {items.map((item, index) => (

              <button
                key={item.labelEn}
                onClick={item.action}
                className={`
                  group relative h-full
                  flex items-center justify-center
                  cursor-pointer
                  transition-all duration-500
                  ${index !== 0 ? 'border-l border-black' : ''}
                `}
              >

                {/* Hover background */}
                <span
                  className="
                    absolute inset-0
                    bg-black/[0.025]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />

                {/* Vertical text */}
                <span
                  className="
                    relative z-10
                    flex flex-col
                    items-center justify-center
                    text-[13px] sm:text-[14px] md:text-[15px]
                    font-normal
                    tracking-[0.28em]
                    leading-[1.55]
                    text-[#111111]
                    transition-opacity duration-500
                    group-hover:opacity-40
                  "
                >
                  {(isFa ? item.labelFa : item.labelEn)
                    .split('')
                    .map((char, charIndex) => (
                      <span key={charIndex}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                </span>

              </button>

            ))}

          </div>


          {/* =========================
              BOTTOM LINE
          ========================= */}

          <div
            className="
              absolute
              left-[22%]
              right-[22%]
              bottom-[55px]
              h-px
              bg-black
            "
          />

        </div>

      </main>
    </div>
  );
};
