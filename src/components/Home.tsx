import React from 'react';
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

  const items: { labelEn: string; labelFa: string; action: () => void }[] = [
    { labelEn: 'Projects', labelFa: 'پروژه‌ها', action: onProjects },
    { labelEn: 'About', labelFa: 'درباره ما', action: onAbout },
    { labelEn: 'Services', labelFa: 'خدمات', action: onServices },
    { labelEn: 'Contact', labelFa: 'تماس با ما', action: onContact }
  ];

  return (
    <div
      id="home-landing"
      className="min-h-screen pt-20 flex flex-col md:flex-row items-stretch justify-center bg-[#F4F1EE] animate-fade-in"
    >
      {items.map((item, idx) => (
        <button
          key={item.labelEn}
          onClick={item.action}
          className={`group flex-1 flex items-center justify-center py-16 md:py-0 cursor-pointer transition-colors duration-300 hover:bg-black/[0.025] border-black/10 ${
            idx === 0 ? 'border-b md:border-b-0 md:border-r' : ''
          } ${idx > 0 && idx < items.length - 1 ? 'border-b md:border-b-0 md:border-r md:border-l' : ''} ${
            idx === items.length - 1 ? 'md:border-l' : ''
          }`}
        >
          <span className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#1C1C1C] group-hover:opacity-50 transition-opacity tracking-tight">
            {isFa ? item.labelFa : item.labelEn}
          </span>
        </button>
      ))}
    </div>
  );
};


