import React from 'react';
import { Project, Language } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectNavigationProps {
  prevProject?: Project;
  nextProject?: Project;
  language: Language;
  onSelectProject: (projectId: string) => void;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  prevProject,
  nextProject,
  language,
  onSelectProject
}) => {
  const isFa = language === 'FA';

  return (
    <nav id="project-navigation-footer" className="border-t border-black/10 bg-[#F4F1EE]">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[16rem]">
        {/* Previous Project Card */}
        {prevProject ? (
          <button
            onClick={() => onSelectProject(prevProject.id)}
            className="group relative flex items-center justify-between p-8 sm:p-12 md:p-16 border-b md:border-b-0 md:border-r border-black/10 hover:bg-[#1C1C1C] transition-colors duration-300 text-left cursor-pointer w-full"
          >
            <div className="flex flex-col z-10">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] group-hover:text-white/60 transition-colors">
                {isFa ? 'پروژه قبلی' : 'PREVIOUS PROJECT'}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-light italic text-[#1C1C1C] group-hover:text-white transition-colors mt-2 font-serif">
                {isFa ? prevProject.titleFa : prevProject.title}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] group-hover:text-white/40 transition-colors mt-1">
                {prevProject.location} • {prevProject.year}
              </span>
            </div>

            <div className="w-10 h-10 border border-black/20 group-hover:border-white/40 flex items-center justify-center shrink-0 z-10 group-hover:-translate-x-2 transition-all duration-300">
              <ArrowLeft className="w-5 h-5 text-[#1C1C1C] group-hover:text-white transition-colors" />
            </div>
          </button>
        ) : (
          <div className="hidden md:block border-r border-black/10 bg-[#E8E4E0]/40" />
        )}

        {/* Next Project Card */}
        {nextProject ? (
          <button
            onClick={() => onSelectProject(nextProject.id)}
            className="group relative flex items-center justify-between p-8 sm:p-12 md:p-16 hover:bg-[#1C1C1C] transition-colors duration-300 text-right cursor-pointer w-full flex-row-reverse"
          >
            <div className="flex flex-col z-10 text-right">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] group-hover:text-white/60 transition-colors">
                {isFa ? 'پروژه بعدی' : 'NEXT PROJECT'}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-light italic text-[#1C1C1C] group-hover:text-white transition-colors mt-2 font-serif">
                {isFa ? nextProject.titleFa : nextProject.title}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] group-hover:text-white/40 transition-colors mt-1">
                {nextProject.location} • {nextProject.year}
              </span>
            </div>

            <div className="w-10 h-10 border border-black/20 group-hover:border-white/40 flex items-center justify-center shrink-0 z-10 group-hover:translate-x-2 transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-[#1C1C1C] group-hover:text-white transition-colors" />
            </div>
          </button>
        ) : (
          <div className="hidden md:block bg-[#E8E4E0]/40" />
        )}
      </div>
    </nav>
  );
};
