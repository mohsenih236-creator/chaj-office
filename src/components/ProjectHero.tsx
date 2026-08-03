import React, { useEffect, useState } from 'react';
import { Project, Language } from '../types';
import { Maximize2, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
interface ProjectHeroProps {
  project: Project;
  language: Language;
  onOpenImage: (url: string, caption: string) => void;
}
export const ProjectHero: React.FC<ProjectHeroProps> = ({ project, language, onOpenImage }) => {
  const isFa = language === 'FA';
  // Use heroImages if provided and non-empty, otherwise fall back to the single heroImage.
  const images = project.heroImages && project.heroImages.length > 0
    ? project.heroImages
    : [project.heroImage];
  const [activeIndex, setActiveIndex] = useState(0);
  // Reset back to the first image whenever the project changes.
  useEffect(() => {
    setActiveIndex(0);
  }, [project.id]);
  // Auto-advance the slider every 6 seconds when there is more than one image.
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, project.id]);
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };
  const currentImage = images[activeIndex];
  const scrollToContent = () => {
    const metaSection = document.getElementById('project-meta-section');
    if (metaSection) {
      metaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="project-hero-section" className="relative w-full h-[85vh] min-h-[600px] max-h-[920px] overflow-hidden bg-black group">
      {/* Background Image Slider */}
      {images.map((img, idx) => (
        <div
          key={img + idx}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out cursor-pointer ${
            idx === activeIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url('${img}')` }}
          onClick={() => onOpenImage(currentImage, isFa ? project.titleFa : project.title)}
        >
          <div className="sr-only">{project.title} Hero Architectural Photograph {idx + 1}</div>
        </div>
      ))}
      {/* Prev / Next Arrows (only when multiple images) */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="pointer-events-auto absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[2] p-2.5 bg-[#1C1C1C]/60 hover:bg-[#1C1C1C]/90 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer"
            title={isFa ? 'تصویر قبلی' : 'Previous image'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className="pointer-events-auto absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[2] p-2.5 bg-[#1C1C1C]/60 hover:bg-[#1C1C1C]/90 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer"
            title={isFa ? 'تصویر بعدی' : 'Next image'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16">
        {/* Top Tag / Breadcrumb */}
        <div className="flex justify-between items-start pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1C1C]/60 backdrop-blur-md border border-white/15 text-white font-sans text-[10px] uppercase tracking-[0.25em] font-semibold">
            <span>Portfolio</span>
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            <span>{project.year}</span>
          </div>
          <button
            onClick={() => onOpenImage(currentImage, isFa ? project.titleFa : project.title)}
            className="pointer-events-auto p-2.5 bg-[#1C1C1C]/60 hover:bg-[#1C1C1C]/90 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer group/btn"
            title={isFa ? 'مشاهده تصویر کامل' : 'Expand Hero Image'}
          >
            <Maximize2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
        {/* Bottom Hero Title, Dots & Scroll Prompt */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic tracking-tighter text-white leading-[0.95] font-serif">
              {isFa ? project.titleFa : project.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 font-light italic max-w-2xl">
              {isFa ? project.subtitleFa : project.subtitle}
            </p>
            {/* Dot Indicators (only when multiple images) */}
            {images.length > 1 && (
              <div className="pointer-events-auto flex items-center gap-2 mt-6">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    title={isFa ? `تصویر ${idx + 1}` : `Image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Scroll Down Button */}
          <button
            onClick={scrollToContent}
            className="pointer-events-auto self-start md:self-end flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer group/scroll py-2"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] font-semibold">
              {isFa ? 'پیمایش به پایین' : 'Scroll down'}
            </span>
            <div className="w-8 h-8 border border-white/30 flex items-center justify-center group-hover/scroll:border-white transition-colors">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

