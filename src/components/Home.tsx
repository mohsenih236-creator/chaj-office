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
        className={`min-h-screen pt-20 flex flex-col md:flex-row items-stretch justify-center transition-opacity duration-1000 ${
          introFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {items.map((item, idx) => (
          <button
            key={item.labelEn}
            onClick={item.action}
            className={`group flex-1 flex items-center justify-center py-16 md:py-0 cursor-pointer transition-colors duration-500 hover:bg-black/[0.025] border-black/10 ${
              idx === 0
                ? 'border-b md:border-b-0 md:border-r'
                : ''
            } ${
              idx > 0 && idx < items.length - 1
                ? 'border-b md:border-b-0 md:border-r md:border-l'
                : ''
            } ${
              idx === items.length - 1
                ? 'md:border-l'
                : ''
            }`}
          >
            <span
              className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#1C1C1C] group-hover:opacity-40 transition-opacity duration-500 tracking-tight"
            >
              {isFa ? item.labelFa : item.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

