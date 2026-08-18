import React from 'react';
import { StudioInfo, Language } from '../types';
import { Award, MapPin } from 'lucide-react';

interface AboutViewProps {
  studioInfo: StudioInfo;
  language: Language;
  openContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  studioInfo,
  language,
  openContact,
}) => {
  const isFa = language === 'FA';

  const awards = [];

  return (
    <div
      className="pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto animate-fade-in"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      {/* =========================================================
          STUDIO HEADER + LOCATION MAP
         ========================================================= */}

      <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="max-w-2xl">
          <span className="block mb-4 text-lg sm:text-xl font-medium tracking-[0.08em] text-[#6F6F6F] leading-relaxed">
            {isFa
              ? 'درباره گروه معماری چاج'
              : 'About Chaj Architectural Group'}
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-[#1C1C1C] mb-8 leading-[1.5]">
            {isFa ? studioInfo.taglineFa : studioInfo.taglineEn}
          </h1>

          <p className="text-lg sm:text-xl text-[#3F3F3F] leading-[2] font-light">
            {isFa ? studioInfo.aboutFa : studioInfo.aboutEn}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {studioInfo.offices.map((office) => {
            const hasCoords =
              typeof office.latitude === 'number' &&
              typeof office.longitude === 'number';

            const mapSrc = hasCoords
              ? `https://www.google.com/maps?q=${office.latitude},${office.longitude}&z=17&output=embed`
              : `https://www.google.com/maps?q=${encodeURIComponent(
                  isFa ? office.addressFa : office.addressEn
                )}&output=embed`;

            return (
              <div
                key={office.cityEn}
                className="flex flex-col border border-black/10 bg-[#F4F1EE]"
              >
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

                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#1C1C1C] shrink-0" />

                    <h3 className="text-lg sm:text-xl font-medium text-[#1C1C1C] leading-relaxed">
                      {isFa ? office.cityFa : office.cityEn}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#4A4A4A] leading-[1.9]">
                    {isFa ? office.addressFa : office.addressEn}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm tracking-[0.08em] text-[#6F6F6F] font-medium">
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


      {/* =========================================================
          MEANING OF THE NAME
         ========================================================= */}

      <div className="mb-16 border-t border-black/10 pt-16">
        <h2 className="text-xl sm:text-2xl font-medium text-[#1C1C1C] mb-6 leading-[1.7]">
          {isFa ? 'معنای نام «چاج»' : 'THE MEANING OF "CHAJ"'}
        </h2>

        <p className="max-w-4xl text-lg sm:text-xl text-[#3F3F3F] leading-[2] font-light">
          {isFa
            ? '«چاج» در زبان مازنی به لبه‌ی سقف شیروانی و محل اتصال آن با دیوار گفته می‌شود؛ جزئی کوچک اما هویت‌بخش که مرز میان معماری، آسمان و طبیعت را تعریف می‌کند.'
            : '"Chaj" in Mazani refers to the edge of a pitched roof where it meets the wall—a subtle yet defining detail that shapes the boundary between architecture, sky, and nature.'}
        </p>
      </div>


      {/* =========================================================
          STUDIO PRINCIPALS
         ========================================================= */}

      <div className="my-20 border-t border-black/10 pt-16">
        <h2 className="text-xl sm:text-2xl font-medium text-[#1C1C1C] mb-8 leading-[1.7]">
          {isFa ? 'معماران ارشد و بنیان‌گذاران' : 'STUDIO PRINCIPALS'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {studioInfo.principals.map((p) => (
            <div
              key={p.name}
              className="flex flex-col sm:flex-row gap-6 items-start bg-[#F4F1EE] p-6 sm:p-7 border border-black/10"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-none shrink-0"
              />

              <div className="flex flex-col flex-1">
                <h3 className="text-2xl sm:text-3xl font-light text-[#1C1C1C] leading-[1.4] mb-1">
                  {p.name}
                </h3>

                <span className="text-sm sm:text-base tracking-[0.08em] font-medium text-[#6F6F6F] mt-1 mb-3 leading-relaxed">
                  {isFa ? p.roleFa : p.role}
                </span>

                <p className="text-sm sm:text-base text-[#4A4A4A] leading-[1.9]">
                  {isFa ? p.bioFa : p.bioEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* =========================================================
          AWARDS & RECOGNITION
         ========================================================= */}

      <div className="my-20 border-t border-black/10 pt-16">
        <h2 className="text-xl sm:text-2xl font-medium text-[#1C1C1C] mb-8 leading-[1.7]">
          {isFa ? 'افتخارات و جوایز' : 'AWARDS & RECOGNITION'}
        </h2>

        <div className="grid grid-cols-1 divide-y divide-black/10 border-t border-b border-black/10">
          {awards.map((award) => (
            <div
              key={award.title}
              className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <Award className="w-5 h-5 text-[#1C1C1C] shrink-0" />

                <div>
                  <h4 className="text-base sm:text-lg font-medium text-[#1C1C1C] leading-relaxed">
                    {isFa ? award.titleFa : award.title}
                  </h4>

                  <p className="text-xs sm:text-sm tracking-[0.08em] text-[#6F6F6F] mt-1">
                    {award.project}
                  </p>
                </div>
              </div>

              <span className="text-xs sm:text-sm tracking-[0.1em] text-[#6F6F6F] font-medium">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>


      {/* =========================================================
          CONTACT CTA
         ========================================================= */}

      <div className="mt-20 p-8 sm:p-12 bg-[#E8E4E0]/60 border border-black/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-light text-[#1C1C1C] leading-[1.5]">
            {isFa
              ? 'آغاز یک گفتگوی معماری'
              : 'Initiate an Architectural Dialogue'}
          </h3>

          <p className="text-sm sm:text-base text-[#4A4A4A] mt-2 leading-[1.8]">
            {isFa
              ? 'آماده مشاوره و همکاری در پروژه‌های مسکونی، فرهنگی و تجاری خاص.'
              : 'Available for consultations regarding bespoke residential, cultural, and public architecture.'}
          </p>
        </div>

        <button
          onClick={openContact}
          className="px-6 py-3 bg-[#1C1C1C] text-[#F4F1EE] text-sm sm:text-base tracking-[0.12em] font-medium hover:opacity-80 transition-opacity cursor-pointer shrink-0"
        >
          {isFa ? 'ارسال درخواست پروژه' : 'Inquire Project'}
        </button>
      </div>
    </div>
  );
};
