import React from 'react';
import { StudioInfo, Language } from '../types';
import { Award, BookOpen, Compass, ShieldCheck } from 'lucide-react';

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
      {/* Studio Header */}
      <div className="max-w-4xl mb-16">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-2">
          {isFa ? 'درباره دفتر معماری چاج' : 'STUDIO PROFILE & PHILOSOPHY'}
        </span>
        <h1 className="text-4xl sm:text-6xl font-light italic text-[#1C1C1C] mb-8 font-serif leading-tight">
          {isFa ? studioInfo.taglineFa : studioInfo.taglineEn}
        </h1>
        <p className="text-lg sm:text-xl text-[#4A4A4A] leading-relaxed font-light italic">
          {isFa ? studioInfo.aboutFa : studioInfo.aboutEn}
        </p>
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
