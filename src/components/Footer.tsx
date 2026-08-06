import React from 'react';
import { Language } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  language: Language;
  openContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, openContact }) => {
  const isFa = language === 'FA';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#F4F1EE] px-6 md:px-16 py-12 md:py-16 border-t border-black/10 text-[#1C1C1C]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Brand & Mission Statement */}
        <div className="md:col-span-5">
          <div className="text-2xl md:text-3xl font-serif font-light italic tracking-tight text-[#1C1C1C] mb-3">
            CHAJ OFFICE
          </div>
          <p className="text-xs text-[#4A4A4A] leading-relaxed max-w-sm italic">
            {isFa
              ? 'گروه معماری چاج؛ پژوهش و کاوش در ماهیت فضا، نور و ماده.'
              : 'An architectural practice dedicated to the exploration of space, light, and materiality.'}
          </p>
        </div>

        {/* Links Column */}
        <div className="md:col-span-7 flex flex-wrap gap-8 md:justify-end items-start">
          <div className="flex flex-col gap-3 min-w-[120px]">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C]">
              {isFa ? 'ارتباطات' : 'CONNECT'}
            </span>
            <a
              href="https://instagram.com/chajoffice"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1C1C] hover:text-[#8C8C8C] transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={openContact}
              className="text-left font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1C1C] hover:text-[#8C8C8C] transition-colors cursor-pointer"
            >
              Email
            </button>
          </div>

          <div className="flex flex-col gap-3 min-w-[120px]">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C]">
              {isFa ? 'حقوقی' : 'LEGAL'}
            </span>
            <a
              href="#privacy"
              onClick={(e) => { e.preventDefault(); alert(isFa ? 'بیانیه حریم خصوصی گروه معماری چاج' : 'CHAJ GROUP Privacy Policy'); }}
              className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1C1C] hover:text-[#8C8C8C] transition-colors"
            >
              {isFa ? 'حریم خصوصی' : 'Privacy Policy'}
            </a>
            <a
              href="#terms"
              onClick={(e) => { e.preventDefault(); alert(isFa ? 'شرایط و ضوابط گروه معماری چاج' : 'CHAJ GROUP Terms'); }}
              className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1C1C] hover:text-[#8C8C8C] transition-colors"
            >
              {isFa ? 'شرایط استفاده' : 'Terms'}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="md:col-span-12 pt-8 mt-4 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8C8C]">
            © 2024 CHAJ GROUP. {isFa ? 'تمامی حقوق محفوظ است.' : 'ALL RIGHTS RESERVED.'}
          </p>

          <button
            id="scrollToTop"
            onClick={scrollToTop}
            className="flex items-center gap-2 group font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#1C1C1C] hover:text-[#8C8C8C] transition-colors cursor-pointer py-1"
          >
            <span>{isFa ? 'بازگشت به بالا' : 'BACK TO TOP'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#1C1C1C] group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </footer>
  );
};
