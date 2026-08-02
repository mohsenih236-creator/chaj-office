import React, { useState } from 'react';
import { Project, Language, MaterialDetail } from '../types';
import { Maximize2, Layers, Info } from 'lucide-react';
import { LightboxImage } from './LightboxModal';

interface EditorialSectionsProps {
  project: Project;
  language: Language;
  onOpenImage: (url: string, caption: string) => void;
  onOpenGallery: (images: LightboxImage[], startIndex?: number) => void;
}

export const EditorialSections: React.FC<EditorialSectionsProps> = ({
  project,
  language,
  onOpenImage,
  onOpenGallery
}) => {
  const isFa = language === 'FA';
  const [activeMaterialTab, setActiveMaterialTab] = useState<string | null>(null);

  const detail1 = project.details[0];
  const detail2 = project.details[1];

  // Builds the full list of images for a detail item: its main imageUrl first,
  // followed by any extra galleryImages defined for it.
  const buildGalleryFor = (detail: MaterialDetail): LightboxImage[] => {
    const caption = isFa ? detail.titleFa : detail.title;
    const urls = [detail.imageUrl, ...(detail.galleryImages || [])];
    return urls.map((url) => ({ url, caption }));
  };

  return (
    <div className="bg-[#F4F1EE]">
      {/* Section 1: "Light as Material" */}
      <section id="light-as-material-section" className="px-6 md:px-16 py-16 md:py-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Portrait Image */}
          <div className="md:col-span-7 relative group">
            <div
              className="w-full aspect-[4/5] bg-cover bg-center overflow-hidden cursor-pointer relative shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xs"
              style={{ backgroundImage: `url('${project.lightImage}')` }}
              onClick={() =>
                onOpenImage(
                  project.lightImage,
                  isFa ? project.lightSectionTitleFa : project.lightSectionTitleEn
                )
              }
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1C1C]/90 text-white px-4 py-2 font-sans text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {isFa ? 'بزرگ‌نمایی' : 'Inspect Light Stream'}
                </span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="md:col-span-5 md:pl-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] mb-3 block">
              {isFa ? 'رویکرد نورپردازی' : 'LIGHTING PHENOMENOLOGY'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light italic text-[#1C1C1C] mb-6 tracking-tight font-serif">
              {isFa ? project.lightSectionTitleFa : project.lightSectionTitleEn}
            </h2>
            <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed font-normal">
              {isFa ? project.lightNarrativeFa : project.lightNarrativeEn}
            </p>

            <div className="mt-8 p-4 border-l-2 border-[#1C1C1C] bg-[#E8E4E0]/60 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#1C1C1C] shrink-0 mt-0.5" />
              <p className="text-xs text-[#4A4A4A] italic leading-normal">
                {isFa
                  ? 'گشودگی‌های سقفی به نحوی محاسبه شده‌اند که زیباترین الگوی سایه‌روشن را در نیمروز تابستان ایجاد کنند.'
                  : 'Zenith skylights calculated precisely to project shadow angles at 42° during summer solstice afternoon hours.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Asymmetric Material Detail Pair */}
      {project.details.length > 0 && (
        <section id="material-details-section" className="px-6 md:px-16 py-12 md:py-20 border-t border-black/10 bg-[#E8E4E0]/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-1">
                  {isFa ? 'مطالعه متریال و بافت' : 'TACTILE TECTONICS'}
                </span>
                <h3 className="text-2xl md:text-3xl font-light italic text-[#1C1C1C] font-serif">
                  {isFa ? 'تلاقی متریال‌ها و حیاط داخلی' : 'Material Intersection & Courtyard'}
                </h3>
              </div>

              <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C]">
                <Layers className="w-4 h-4 text-[#1C1C1C]" />
                <span>{isFa ? 'برای مشاهده جزئیات روی تصاویر کلیک کنید' : 'Click photos for material breakdown'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Detail: Square Aspect Ratio */}
              {detail1 && (
                <div className="md:col-span-5 flex flex-col">
                  <div
                    className="w-full aspect-square bg-[#E8E4E0] bg-cover bg-center overflow-hidden cursor-pointer group relative border border-black/5 shadow-xs hover:shadow-md transition-shadow duration-300"
                    style={{ backgroundImage: `url('${detail1.imageUrl}')` }}
                    onClick={() => onOpenGallery(buildGalleryFor(detail1))}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1C1C] text-[#F4F1EE] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em]">
                        {isFa ? 'مشاهده بافت' : 'Inspect Texture'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#1C1C1C] uppercase">
                      {isFa ? detail1.titleFa : detail1.title}
                    </p>
                    <p className="text-xs text-[#4A4A4A] italic mt-1 leading-relaxed">
                      {isFa ? detail1.captionFa : detail1.caption}
                    </p>
                  </div>
                </div>
              )}

              {/* Right Detail: Wide 16:9 Aspect Ratio Offset Down */}
              {detail2 && (
                <div className="md:col-span-7 md:mt-16 flex flex-col">
                  <div
                    className="w-full aspect-[16/9] bg-[#E8E4E0] bg-cover bg-center overflow-hidden cursor-pointer group relative border border-black/5 shadow-xs hover:shadow-md transition-shadow duration-300"
                    style={{ backgroundImage: `url('${detail2.imageUrl}')` }}
                    onClick={() => onOpenGallery(buildGalleryFor(detail2))}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1C1C] text-[#F4F1EE] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em]">
                        {isFa ? 'مشاهده حیاط' : 'Inspect Courtyard'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#1C1C1C] uppercase">
                      {isFa ? detail2.titleFa : detail2.title}
                    </p>
                    <p className="text-xs text-[#4A4A4A] italic mt-1 leading-relaxed">
                      {isFa ? detail2.captionFa : detail2.caption}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

