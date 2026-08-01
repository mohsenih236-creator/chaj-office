import React from 'react';
import { Project, Language } from '../types';
import { Maximize2, ArrowDown } from 'lucide-react';

interface ProjectHeroProps {
  project: Project;
  language: Language;
  onOpenImage: (url: string, caption: string) => void;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project, language, onOpenImage }) => {
  const isFa = language === 'FA';

  const scrollToContent = () => {
    const metaSection = document.getElementById('project-meta-section');
    if (metaSection) {
      metaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="project-hero-section" className="relative w-full h-[85vh] min-h-[600px] max-h-[920px] overflow-hidden bg-black group">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-100 group-hover:scale-[1.02] cursor-pointer"
        style={{ backgroundImage: `url('${project.heroImage}')` }}
        onClick={() => onOpenImage(project.heroImage, isFa ? project.titleFa : project.title)}
      >
        <div className="sr-only">{project.title} Hero Architectural Photograph</div>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16">
        {/* Top Tag / Breadcrumb */}
        <div className="flex justify-between items-start pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1C1C]/60 backdrop-blur-md border border-white/15 text-white font-sans text-[10px] uppercase tracking-[0.25em] font-semibold">
            <span>Portfolio</span>
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={() => onOpenImage(project.heroImage, isFa ? project.titleFa : project.title)}
            className="pointer-events-auto p-2.5 bg-[#1C1C1C]/60 hover:bg-[#1C1C1C]/90 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer group/btn"
            title={isFa ? 'مشاهده تصویر کامل' : 'Expand Hero Image'}
          >
            <Maximize2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

        {/* Bottom Hero Title & Scroll Prompt */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic tracking-tighter text-white leading-[0.95] font-serif">
              {isFa ? project.titleFa : project.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 font-light italic max-w-2xl">
              {isFa ? project.subtitleFa : project.subtitle}
            </p>
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
