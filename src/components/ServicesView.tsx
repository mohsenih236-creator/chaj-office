import React from 'react';
import { StudioInfo, Language } from '../types';
import { Building2, Compass, Maximize2, Layers, CheckCircle } from 'lucide-react';

interface ServicesViewProps {
  services: StudioInfo['services'];
  language: Language;
  openContact: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ services, language, openContact }) => {
  const isFa = language === 'FA';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-8 h-8 text-[#1b1c1c]" />;
      case 'Compass': return <Compass className="w-8 h-8 text-[#1b1c1c]" />;
      case 'Maximize2': return <Maximize2 className="w-8 h-8 text-[#1b1c1c]" />;
      case 'Layers': return <Layers className="w-8 h-8 text-[#1b1c1c]" />;
      default: return <Building2 className="w-8 h-8 text-[#1b1c1c]" />;
    }
  };

  const steps = [
    { titleEn: "1. Site & Climatic Research", titleFa: "۱. پژوهش سایت و تحلیل اقلیم", descEn: "Topographic survey, solar trajectory mapping, and local masonry analysis.", descFa: "نقشه‌برداری توپوگرافی، مدل‌سازی مسیر خورشید و آنالیز مصالح بومی." },
    { titleEn: "2. Conceptual Volumetrics", titleFa: "۲. حجم‌پردازی مفهومی", descEn: "Spatial sequencing diagrams, physical scale massing models, and mass/void iterations.", descFa: "دیاگرام‌های توالی فضایی، ماکت‌های حجمی و کاوش فضاهای پر و خالی." },
    { titleEn: "3. Designing executive details and preparing BIM drawings", titleFa: "۳. طراحی جزئیات اجرایی و تهیه نقشه های بیم", descEn: "Designing executive details and preparing BIM drawings and implementing them with the most experienced executive force", descFa: "مدل‌سازی BIM، طراحی جزئیات اجرایی و تهیه نقشه‌های BIM و اجرای آنها با مجرب‌ترین نیروی اجرایی" },
    { titleEn: "4. On-Site Supervision", titleFa: "۴. نظارت دقیق بر اجرا", descEn: "Direct site presence during concrete pours, stone masonry, and timber joinery.", descFa: "حضور مستقیم در کارگاه حین بتن‌ریزی، سنگ‌کاری و نصب اتصالات چوبی." },
  ];

  return (
    <div className="pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="max-w-3xl mb-16">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-2">
          {isFa ? 'خدمات تخصصی دفتر معماری' : 'ARCHITECTURAL SERVICES & CAPABILITIES'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-light italic text-[#1C1C1C] font-serif">
          {isFa ? 'حوزه‌های فعالیت و خدمات' : 'Services & Practice Domain'}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#4A4A4A] italic">
          {isFa
            ? 'از ایده‌پردازی اولیه تا نظارت عالیه در موقعیت‌های خاص اقلیمی و شهری.'
            : 'From initial site phenomenology to meticulous craftsmanship supervision on site.'}
        </p>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {services.map((s) => (
          <div key={s.id} className="p-8 bg-[#F4F1EE] border border-black/10 flex flex-col justify-between hover:border-[#1C1C1C] transition-colors shadow-xs">
            <div>
              <div className="mb-6">{getIcon(s.iconName)}</div>
              <h3 className="text-2xl font-light italic text-[#1C1C1C] mb-3 font-serif">
                {isFa ? s.titleFa : s.titleEn}
              </h3>
              <p className="text-xs text-[#4A4A4A] italic leading-relaxed">
                {isFa ? s.descFa : s.descEn}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-black/10 flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">
              <CheckCircle className="w-4 h-4 text-[#1C1C1C]" />
              <span>{isFa ? 'مشاوره و اجرای تخصصی' : 'Full Professional Delivery'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Process */}
      <div className="border-t border-black/10 pt-16">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-8">
          {isFa ? 'فرآیند طراحی و تولید اثر' : 'DESIGN METHODOLOGY & WORKFLOW'}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.titleEn} className="p-6 bg-[#E8E4E0]/60 border border-black/10 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-serif italic text-[#1C1C1C] mb-2">
                  {isFa ? st.titleFa : st.titleEn}
                </h4>
                <p className="text-xs text-[#4A4A4A] italic leading-relaxed">
                  {isFa ? st.descFa : st.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
