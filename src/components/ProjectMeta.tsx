import React from 'react';
import { Project, Language } from '../types';

interface ProjectMetaProps {
  project: Project;
  language: Language;
}

export const ProjectMeta: React.FC<ProjectMetaProps> = ({ project, language }) => {
  const isFa = language === 'FA';

  const specs = [
    { labelEn: 'TYPE', labelFa: 'نوع پروژه', valEn: project.category, valFa: isFa && project.category === 'Residential' ? 'مسکونی' : project.category },
    { labelEn: 'LOCATION', labelFa: 'موقعیت', valEn: project.location, valFa: project.locationFa },
    { labelEn: 'YEAR', labelFa: 'سال', valEn: project.year, valFa: project.year },
    { labelEn: 'STATUS', labelFa: 'وضعیت', valEn: project.status, valFa: project.statusFa },
    { labelEn: 'AREA', labelFa: 'مساحت', valEn: project.area, valFa: project.areaFa },
    { labelEn: 'ARCHITECTS', labelFa: 'معماران', valEn: project.architects, valFa: project.architectsFa },
    { labelEn: 'PRESENTER', labelFa: 'پرزانتر', valEn: project.presenter, valFa: project.presenterFa },
    { labelEn: 'SOFTWARE', labelFa: 'نرم‌افزارها', valEn: project.software, valFa: project.software }
  ];

  return (
    <section
      id="project-meta-section"
      className="px-6 md:px-16 py-12 md:py-20 border-b border-black/10 bg-[#F4F1EE]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Left Side: High Level Narrative Statement */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between pr-0 md:pr-8">
          <p className="text-xl sm:text-2xl md:text-3xl text-[#1C1C1C] leading-relaxed font-serif font-light italic tracking-tight">
            {isFa ? project.narrativeFa : project.narrativeEn}
          </p>

          <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap gap-4 font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8C8C]">
            <span>CHAJ GROUP Architectural Record</span>
            <span>•</span>
            <span>Ref ID: #{project.id.toUpperCase()}</span>
          </div>
        </div>

        {/* Right Side: Specifications Grid */}
        <div className="md:col-span-5 lg:col-span-4 border-l border-black/20 pl-6 md:pl-8 space-y-4">
          <dl className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
            {specs.map((item) => (
              <React.Fragment key={item.labelEn}>
                <dt className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] self-center">
                  {isFa ? item.labelFa : item.labelEn}
                </dt>
                <dd className="text-sm font-medium text-[#1C1C1C] self-center">
                  {isFa ? item.valFa : item.valEn}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
