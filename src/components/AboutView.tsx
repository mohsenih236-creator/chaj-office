import React from 'react';
import { StudioInfo, Language } from '../types';
import { Award, BookOpen, Compass, ShieldCheck, MapPin } from 'lucide-react';

interface AboutViewProps {
  studioInfo: StudioInfo;
  language: Language;
  openContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ studioInfo, language, openContact }) => {
  const isFa = language === 'FA';

  const awards = [

  ];

  return (
    <div className="pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto animate-fade-in">
      {/* Studio Header + Location Map (side by side) */}
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="max-w-2xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-2">
            {isFa ? 'درباره گروه معماری چاج' : 'STUDIO PROFILE & PHILOSOPHY'}
          </span>
          <h1 className="text-4xl sm:text-6xl font-light italic text-[#1C1C1C] mb-8 font-serif leading-tight">
            {isFa ? studioInfo.taglineFa : studioInfo.taglineEn}
          </h1>
          <p className="text-lg sm:text-xl text-[#4A4A4A] leading-relaxed font-light italic">
            {isFa ? studioInfo.aboutFa : studioInfo.aboutEn}
          </p>
        </div>

        {/* Location map(s), shown next to the intro text */}
        <div className="flex flex-col gap-6">
          {studioInfo.offices.map((office) => {
            const hasCoords =
              typeof office.latitude === 'number' && typeof office.longitude === 'number';
            const mapSrc = hasCoords
              ? `https://www.google.com/maps?q=${office.latitude},${office.longitude}&z=17&output=embed`
              : `https://www.google.com/maps?q=${encodeURIComponent(
                  isFa ? office.addressFa : office.addressEn
                )}&output=embed`;
            return (
              <div key={office.cityEn} className="flex flex-col border border-black/10 bg-[#F4F1EE]">
                <div className="w-full h-64 sm:h-80">
                  <iframe
                    src={mapSrc}
                    title={isFa ? office.cityFa : office.cityEn}
                    className="w-full h-full grayscale-[20%]"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                    <h3 className="text-base font-light italic text-[#1C1C1C] font-serif">
                      {isFa ? office.cityFa : office.cityEn}
                    </h3>
                  </div>
                  <p className="text-xs text-[#4A4A4A] italic leading-relaxed">
                    {isFa ? office.addressFa : office.addressEn}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] font-bold">
                    <span>{office.phone}</span>
                    <span className="hidden sm:inline">/</span>
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Principals Section */}
      <div className="my-20 border-t border-black/10 pt-16">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-8">
          {isFa ? 'معماران ارشد و بنیان‌گذاران' : 'STUDIO PRINCIPALS'}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {studioInfo.principals.map((p) => (
            <div key={p.name} className="flex flex-col sm:flex-row gap-6 items-start bg-[#F4F1EE] p-6 border border-black/10">
              <img
                src={p.image}
                alt={p.name}
                className="w-28 h-28 object-cover rounded-none shrink-0"
              />
              <div className="flex flex-col">
                <h3 className="text-2xl font-light italic text-[#1C1C1C] font-serif">{p.name}</h3>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C] mt-0.5 mb-3">
                  {isFa ? p.roleFa : p.role}
                </span>
                <p className="text-xs text-[#4A4A4A] italic leading-relaxed">
                  {isFa ? p.bioFa : p.bioEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="my-20 border-t border-black/10 pt-16">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-8">
          {isFa ? 'افتخارات و جوایز' : 'AWARDS & RECOGNITION'}
        </span>
        <div className="grid grid-cols-1 divide-y divide-black/10 border-t border-b border-black/10">
          {awards.map((award) => (
            <div key={award.title} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Award className="w-5 h-5 text-[#1C1C1C]" />
                <div>
                  <h4 className="text-base font-serif italic text-[#1C1C1C]">
                    {isFa ? award.titleFa : award.title}
                  </h4>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C]">{award.project}</p>
                </div>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] font-bold">{award.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Prompt CTA */}
      <div className="mt-20 p-8 sm:p-12 bg-[#E8E4E0]/60 border border-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-light italic text-[#1C1C1C] font-serif">
            {isFa ? 'آغاز یک گفتگوی معماری' : 'Initiate an Architectural Dialogue'}
          </h3>
          <p className="text-xs text-[#4A4A4A] italic mt-1">
            {isFa
              ? 'آماده مشاوره و همکاری در پروژه‌های مسکونی، فرهنگی و تجاری خاص.'
              : 'Available for consultations regarding bespoke residential, cultural, and public architecture.'}
          </p>
        </div>
        <button
          onClick={openContact}
          className="px-6 py-3 bg-[#1C1C1C] text-[#F4F1EE] font-sans text-[10px] uppercase tracking-[0.25em] font-bold hover:opacity-80 transition-opacity cursor-pointer shrink-0"
        >
          {isFa ? 'ارسال درخواست پروژه' : 'Inquire Project'}
        </button>
      </div>
    </div>
  );
};

