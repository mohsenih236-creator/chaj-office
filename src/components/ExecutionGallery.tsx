import React, { useState } from 'react';
import { Project, Language } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Play,
} from 'lucide-react';

interface ExecutionGalleryProps {
  project: Project;
  language: Language;
}

export const ExecutionGallery: React.FC<ExecutionGalleryProps> = ({
  project,
  language,
}) => {
  const isFa = language === 'FA';

  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);

  // ------------------------------------------------------------
  // No execution media
  // ------------------------------------------------------------

  if (
    !project.executionPhotos ||
    project.executionPhotos.length === 0
  ) {
    return null;
  }

  const executionPhotos = project.executionPhotos;

  // ------------------------------------------------------------
  // Get all images belonging to one execution stage
  // imageUrl is always image #1
  // ------------------------------------------------------------

  const getStageImages = (stageIndex: number) => {
    const stage = executionPhotos[stageIndex];

    return [
      stage.imageUrl,
      ...(stage.galleryImages || []),
    ];
  };

  // ------------------------------------------------------------
  // Open gallery
  // ------------------------------------------------------------

  const openGallery = (stageIndex: number) => {
    setActiveStage(stageIndex);
    setActiveImage(0);

    // Prevent page scrolling while gallery is open
    document.body.style.overflow = 'hidden';
  };

  // ------------------------------------------------------------
  // Close gallery
  // ------------------------------------------------------------

  const closeGallery = () => {
    setActiveStage(null);
    setActiveImage(0);

    document.body.style.overflow = '';
  };

  // ------------------------------------------------------------
  // Previous image
  // ------------------------------------------------------------

  const previousImage = () => {
    if (activeStage === null) return;

    const images = getStageImages(activeStage);

    setActiveImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  };

  // ------------------------------------------------------------
  // Next image
  // ------------------------------------------------------------

  const nextImage = () => {
    if (activeStage === null) return;

    const images = getStageImages(activeStage);

    setActiveImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    );
  };

  // ------------------------------------------------------------
  // Active stage / images
  // ------------------------------------------------------------

  const activeStageData =
    activeStage !== null
      ? executionPhotos[activeStage]
      : null;

  const activeImages =
    activeStage !== null
      ? getStageImages(activeStage)
      : [];

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  return (
    <>
      {/* ========================================================
          EXECUTION SECTION
      ======================================================== */}

      <section
        id="execution-gallery"
        className="w-full bg-[#F4F1EE] py-24 md:py-32"
      >
        <div className="px-6 md:px-16">

          {/* ----------------------------------------------------
              Header
          ---------------------------------------------------- */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">

            <div className="md:col-span-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8C8C]">
                {isFa
                  ? 'روند ساخت و اجرا'
                  : 'CONSTRUCTION & SITE PROGRESS'}
              </span>
            </div>

            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1C1C1C]">
                {isFa
                  ? project.executionSectionTitleFa ||
                    'مراحل اجرای پروژه'
                  : project.executionSectionTitleEn ||
                    'Project Execution'}
              </h2>
            </div>

          </div>

          {/* ----------------------------------------------------
              Narrative
          ---------------------------------------------------- */}

          {(project.executionNarrativeEn ||
            project.executionNarrativeFa) && (

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">

              <div className="md:col-span-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C8C8C]">
                  {isFa
                    ? 'روند ساخت'
                    : 'CONSTRUCTION PROCESS'}
                </span>
              </div>

              <div className="md:col-span-6">
                <p className="text-base md:text-lg leading-relaxed text-[#4A4A4A]">
                  {isFa
                    ? project.executionNarrativeFa
                    : project.executionNarrativeEn}
                </p>
              </div>

            </div>
          )}

          {/* ====================================================
              EXECUTION MEDIA GRID
          ==================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {executionPhotos.map((media, index) => {

              const images = getStageImages(index);
              const isVideo = media.type === 'video';

              return (
                <article
                  key={media.id}
                  className="group cursor-pointer"
                  onClick={() => openGallery(index)}
                >

                  {/* ------------------------------------------------
                      Image / Video
                  ------------------------------------------------ */}

                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E8E4E0] border border-black/5">

                    {isVideo ? (
                      <>
                        <video
                          src={media.imageUrl}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />

                        {/* Video play icon */}

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                          <div className="w-14 h-14 rounded-full bg-[#F4F1EE]/90 flex items-center justify-center">

                            <Play
                              className="w-5 h-5 text-[#1C1C1C] fill-current ml-1"
                            />

                          </div>

                        </div>
                      </>
                    ) : (
                      <img
                        src={media.imageUrl}
                        alt={
                          isFa
                            ? media.titleFa
                            : media.title
                        }
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}

                    {/* ------------------------------------------------
                        Image count
                    ------------------------------------------------ */}

                    {images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-[#1C1C1C]/80 backdrop-blur-sm text-[#F4F1EE] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em]">
                        {images.length}{' '}
                        {isFa ? 'تصویر' : 'IMAGES'}
                      </div>
                    )}

                    {/* ------------------------------------------------
                        Hover overlay
                    ------------------------------------------------ */}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C1C] text-[#F4F1EE] px-4 py-2 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">

                        <Maximize2 className="w-3.5 h-3.5" />

                        {isFa
                          ? 'مشاهده تصاویر'
                          : 'VIEW IMAGES'}

                      </div>

                    </div>

                  </div>

                  {/* ------------------------------------------------
                      Stage information
                  ------------------------------------------------ */}

                  <div className="pt-4 flex justify-between gap-4">

                    <div className="min-w-0">

                      <div className="text-[9px] uppercase tracking-[0.2em] text-[#8C8C8C] mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <h3 className="text-lg md:text-xl font-serif text-[#1C1C1C]">
                        {isFa
                          ? media.titleFa
                          : media.title}
                      </h3>

                      {(media.caption ||
                        media.captionFa) && (

                        <p className="mt-1.5 text-xs leading-relaxed text-[#6A6A6A]">
                          {isFa
                            ? media.captionFa
                            : media.caption}
                        </p>

                      )}

                    </div>

                    {images.length > 1 && (
                      <div className="flex-shrink-0 text-[9px] uppercase tracking-[0.15em] text-[#8C8C8C] pt-1">
                        +{images.length - 1}
                      </div>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

        </div>
      </section>

      {/* ========================================================
          FULLSCREEN GALLERY
      ======================================================== */}

      {activeStageData && activeStage !== null && (

        <div
          className="fixed inset-0 z-[9999] bg-[#111]/95 flex items-center justify-center"
          onClick={closeGallery}
        >

          {/* ====================================================
              CLOSE BUTTON
          ==================================================== */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeGallery();
            }}
            className="absolute top-5 right-5 z-[10001] w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* ====================================================
              PREVIOUS
          ==================================================== */}

          {activeImages.length > 1 && (

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-[10001] w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

          )}

          {/* ====================================================
              MAIN GALLERY CONTENT
          ==================================================== */}

          <div
            className="relative w-full h-full max-w-[1500px] px-16 md:px-24 py-10 flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >

            {/* ------------------------------------------------
                Main image area
            ------------------------------------------------ */}

            <div className="flex-1 min-h-0 flex items-center justify-center">

              {activeStageData.type === 'video' &&
              activeImage === 0 ? (

                <video
                  key={activeImages[activeImage]}
                  src={activeImages[activeImage]}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[72vh] object-contain"
                />

              ) : (

                <img
                  key={activeImages[activeImage]}
                  src={activeImages[activeImage]}
                  alt={
                    isFa
                      ? activeStageData.titleFa
                      : activeStageData.title
                  }
                  className="max-w-full max-h-[72vh] w-auto h-auto object-contain"
                />

              )}

            </div>

            {/* =================================================
                INFORMATION
            ================================================= */}

            <div className="w-full max-w-5xl mx-auto flex items-end justify-between gap-6 pt-5 text-white">

              <div>

                <div className="text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">

                  {String(activeStage + 1).padStart(2, '0')}
                  {' / '}
                  {String(executionPhotos.length).padStart(2, '0')}

                </div>

                <h3 className="text-xl md:text-2xl font-serif">

                  {isFa
                    ? activeStageData.titleFa
                    : activeStageData.title}

                </h3>

                {(activeStageData.caption ||
                  activeStageData.captionFa) && (

                  <p className="text-sm text-white/60 mt-2">

                    {isFa
                      ? activeStageData.captionFa
                      : activeStageData.caption}

                  </p>

                )}

              </div>

              <div className="text-sm text-white/60 whitespace-nowrap">

                {activeImage + 1}
                {' / '}
                {activeImages.length}

              </div>

            </div>

            {/* =================================================
                THUMBNAILS
            ================================================= */}

            {activeImages.length > 1 && (

              <div className="w-full max-w-5xl mx-auto overflow-x-auto mt-5 pb-2">

                <div className="flex gap-2">

                  {activeImages.map((image, index) => (

                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveImage(index);
                      }}
                      className={`
                        relative
                        flex-shrink-0
                        w-20
                        h-14
                        overflow-hidden
                        border
                        transition-all
                        ${
                          activeImage === index
                            ? 'border-white opacity-100'
                            : 'border-white/20 opacity-50 hover:opacity-100'
                        }
                      `}
                    >

                      {activeStageData.type === 'video' &&
                      index === 0 ? (

                        <video
                          src={image}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />

                      ) : (

                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                      )}

                      {/* Active thumbnail indicator */}

                      {activeImage === index && (
                        <div className="absolute inset-0 border-2 border-white pointer-events-none" />
                      )}

                    </button>

                  ))}

                </div>

              </div>

            )}

          </div>

          {/* ====================================================
              NEXT
          ==================================================== */}

          {activeImages.length > 1 && (

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-[10001] w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

          )}

        </div>

      )}
    </>
  );
};

export default ExecutionGallery;
