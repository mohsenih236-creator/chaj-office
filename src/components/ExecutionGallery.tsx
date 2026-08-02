import React from 'react';
import { Project, Language } from '../types';
import { HardHat, Maximize2, Play } from 'lucide-react';

interface ExecutionGalleryProps {
  project: Project;
  language: Language;
  onOpenImage: (url: string, caption: string) => void;
}

export const ExecutionGallery: React.FC<ExecutionGalleryProps> = ({
  project,
  language,
  onOpenImage
}) => {
  const isFa = language === 'FA';

  // If this project has no execution media yet, don't render the section at all.
  if (!project.executionPhotos || project.executionPhotos.length === 0) {
    return null;
  }

  const titleEn = project.executionSectionTitleEn || 'Execution Phase';
  const titleFa = project.executionSectionTitleFa || 'مراحل اجرا';
  const narrativeEn = project.executionNarrativeEn || '';
  const narrativeFa = project.executionNarrativeFa || '';

  return (
    <section
      id="execution-gallery-section"
      className="px-6 md:px-16 py-16 md:py-28 border-t border-black/10 bg-[#F4F1EE]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] mb-2 flex items-center justify-center gap-2">
            <HardHat className="w-3.5 h-3.5" />
            {isFa ? 'روند ساخت و اجرای پروژه' : 'CONSTRUCTION & SITE PROGRESS'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light italic text-[#1C1C1C] mb-6 font-serif">
            {isFa ? titleFa : titleEn}
          </h2>
          {(narrativeEn || narrativeFa) && (
            <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed font-normal">
              {isFa ? narrativeFa : narrativeEn}
            </p>
          )}
        </div>

        {/* Execution Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {project.executionPhotos.map((media) => {
            const isVideo = media.type === 'video';

            return (
              <div key={media.id} className="flex flex-col">
                {isVideo ? (
                  /* Video Player */
                  <div className="w-full aspect-[4/3] bg-black overflow-hidden relative border border-black/5 shadow-xs">
                    <video
                      src={media.imageUrl}
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C1C1C]/80 text-white px-2 py-1 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-sans pointer-events-none">
                      <Play className="w-3 h-3" />
                      {isFa ? 'ویدیو' : 'Video'}
                    </div>
                  </div>
                ) : (
                  /* Photo */
                  <div
                    className="w-full aspect-[4/3] bg-[#E8E4E0] bg-cover bg-center overflow-hidden cursor-pointer group relative border border-black/5 shadow-xs hover:shadow-md transition-shadow duration-300"
                    style={{ backgroundImage: `url('${media.imageUrl}')` }}
                    onClick={() =>
                      onOpenImage(media.imageUrl, isFa ? media.titleFa : media.title)
                    }
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1C1C] text-[#F4F1EE] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5" />
                        {isFa ? 'مشاهده' : 'View'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <p className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#1C1C1C] uppercase">
                    {isFa ? media.titleFa : media.title}
                  </p>
                  {(media.caption || media.captionFa) && (
                    <p className="text-xs text-[#4A4A4A] italic mt-1 leading-relaxed">
                      {isFa ? media.captionFa : media.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

