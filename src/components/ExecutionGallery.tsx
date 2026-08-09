import React, { useEffect, useState } from 'react';
import { Project, Language } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Maximize2,
} from 'lucide-react';

interface ExecutionGalleryProps {
  project: Project;
  language: Language;
  onOpenImage?: (url: string, caption: string) => void;
}

export const ExecutionGallery: React.FC<ExecutionGalleryProps> = ({
  project,
  language,
}) => {
  const isFa = language === 'FA';

  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);

  /**
   * ---------------------------------------------------------
   * GET ALL IMAGES OF A STAGE
   * ---------------------------------------------------------
   */
  const getImages = (
    stage: NonNullable<Project['executionPhotos']>[number]
  ): string[] => {
    return [
      stage.imageUrl,
      ...(stage.galleryImages || []),
    ].filter(Boolean);
  };

  /**
   * ---------------------------------------------------------
   * OPEN / CLOSE GALLERY
   * ---------------------------------------------------------
   */
  const openGallery = (stageIndex: number) => {
    setActiveStage(stageIndex);
    setActiveImage(0);
  };

  const closeGallery = () => {
    setActiveStage(null);
    setActiveImage(0);
  };

  /**
   * ---------------------------------------------------------
   * NEXT IMAGE
   * ---------------------------------------------------------
   */
  const nextImage = () => {
    if (
      activeStage === null ||
      !project.executionPhotos
    ) {
      return;
    }

    const stage = project.executionPhotos[activeStage];

    if (!stage) {
      return;
    }

    const images = getImages(stage);

    if (images.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current < images.length - 1 ? current + 1 : 0
    );
  };

  /**
   * ---------------------------------------------------------
   * PREVIOUS IMAGE
   * ---------------------------------------------------------
   */
  const previousImage = () => {
    if (
      activeStage === null ||
      !project.executionPhotos
    ) {
      return;
    }

    const stage = project.executionPhotos[activeStage];

    if (!stage) {
      return;
    }

    const images = getImages(stage);

    if (images.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current > 0 ? current - 1 : images.length - 1
    );
  };

  /**
   * ---------------------------------------------------------
   * KEYBOARD CONTROLS + BODY SCROLL LOCK
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (activeStage === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeGallery();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextImage();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousImage();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [activeStage]);

  /**
   * ---------------------------------------------------------
   * NO EXECUTION PHOTOS
   * ---------------------------------------------------------
   */
  if (
    !project.executionPhotos ||
    project.executionPhotos.length === 0
  ) {
    return null;
  }

  /**
   * ---------------------------------------------------------
   * ACTIVE STAGE DATA
   * ---------------------------------------------------------
   */
  const activeStageData =
    activeStage !== null
      ? project.executionPhotos[activeStage]
      : null;

  const activeImages =
    activeStageData
      ? getImages(activeStageData)
      : [];

  /**
   * ---------------------------------------------------------
   * SECTION TEXT
   * ---------------------------------------------------------
   */
  const titleEn =
    project.executionSectionTitleEn ||
    'Execution Phase';

  const titleFa =
    project.executionSectionTitleFa ||
    'مراحل اجرا';

  const narrativeEn =
    project.executionNarrativeEn || '';

  const narrativeFa =
    project.executionNarrativeFa || '';

  return (
    <>
      {/* =====================================================
          EXECUTION SECTION
      ===================================================== */}

      <section
        id="execution-gallery"
        className="relative w-full bg-[#F4F1EE] py-24 md:py-32"
      >
        <div className="px-6 md:px-16">

          {/* HEADER */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">

            <div className="md:col-span-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8C8C]">
                {isFa
                  ? 'روند ساخت و اجرای پروژه'
                  : 'CONSTRUCTION & SITE PROGRESS'}
              </span>
            </div>

            <div className="md:col-span-8">

              <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1C1C1C]">
                {isFa
                  ? titleFa
                  : titleEn}
              </h2>

              {(narrativeEn || narrativeFa) && (
                <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-[#4A4A4A]">
                  {isFa
                    ? narrativeFa
                    : narrativeEn}
                </p>
              )}

            </div>

          </div>

          {/* =================================================
              EXECUTION MEDIA GRID
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {project.executionPhotos.map(
              (media, stageIndex) => {

                const images = getImages(media);

                const isVideo =
                  media.type === 'video';

                return (
                  <article
                    key={media.id}
                    className="group flex flex-col cursor-pointer"
                    onClick={() =>
                      openGallery(stageIndex)
                    }
                  >

                    {/* IMAGE / VIDEO */}

                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E8E4E0] border border-black/5 shadow-xs">

                      {isVideo ? (
                        <div className="relative w-full h-full">

                          <video
                            src={media.imageUrl}
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />

                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                            <div className="w-14 h-14 rounded-full bg-[#F4F1EE]/90 flex items-center justify-center">

                              <Play
                                className="w-5 h-5 fill-current text-[#1C1C1C] ml-1"
                              />

                            </div>

                          </div>

                        </div>
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

                      {/* IMAGE COUNT */}

                      {images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-[#1C1C1C]/80 text-white px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] backdrop-blur-md">
                          {images.length}{' '}
                          {isFa
                            ? 'تصویر'
                            : 'IMAGES'}
                        </div>
                      )}

                      {/* HOVER VIEW */}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center pointer-events-none">

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C1C] text-[#F4F1EE] px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">

                          <Maximize2 className="w-3.5 h-3.5" />

                          {isFa
                            ? 'مشاهده گالری'
                            : 'VIEW GALLERY'}

                        </div>

                      </div>

                    </div>

                    {/* STAGE INFORMATION */}

                    <div className="mt-4 flex justify-between gap-5">

                      <div>

                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] mb-2">
                          {String(
                            stageIndex + 1
                          ).padStart(2, '0')}
                        </div>

                        <h3 className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#1C1C1C] uppercase">
                          {isFa
                            ? media.titleFa
                            : media.title}
                        </h3>

                        {(media.caption ||
                          media.captionFa) && (
                          <p className="text-xs text-[#4A4A4A] italic mt-2 leading-relaxed">
                            {isFa
                              ? media.captionFa
                              : media.caption}
                          </p>
                        )}

                      </div>

                      {images.length > 1 && (
                        <div className="flex-shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#8C8C8C] pt-1">
                          +{images.length - 1}
                        </div>
                      )}

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          FULLSCREEN GALLERY MODAL

          IMPORTANT:
          This element is rendered ONLY when activeStageData
          exists. Therefore it cannot sit invisibly over the
          page while activeStage is null.
      ===================================================== */}

      {activeStageData && activeImages.length > 0 && (
        <div
          className="fixed inset-0 z-[999999] bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={
            isFa
              ? 'گالری تصاویر'
              : 'Image gallery'
          }
          onClick={closeGallery}
        >

          {/* MODAL INNER CONTAINER */}

          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeGallery();
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[1000000] w-12 h-12 flex items-center justify-center text-white bg-black/20 hover:bg-white/10 transition-colors"
              aria-label={
                isFa
                  ? 'بستن'
                  : 'Close gallery'
              }
            >
              <X className="w-7 h-7" />
            </button>

            {/* PREVIOUS BUTTON */}

            {activeImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previousImage();
                }}
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-[1000000] w-12 h-12 flex items-center justify-center text-white bg-black/20 hover:bg-white/10 transition-colors"
                aria-label={
                  isFa
                    ? 'تصویر قبلی'
                    : 'Previous image'
                }
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* NEXT BUTTON */}

            {activeImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-[1000000] w-12 h-12 flex items-center justify-center text-white bg-black/20 hover:bg-white/10 transition-colors"
                aria-label={
                  isFa
                    ? 'تصویر بعدی'
                    : 'Next image'
                }
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* =================================================
                MAIN GALLERY CONTENT
            ================================================= */}

            <div
              className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* MAIN MEDIA */}

              <div className="w-full flex-1 min-h-0 flex items-center justify-center">

                {activeStageData.type === 'video' &&
                activeImage === 0 ? (
                  <video
                    key={activeImages[activeImage]}
                    src={activeImages[activeImage]}
                    controls
                    autoPlay
                    playsInline
                    className="block max-w-full max-h-[68vh] object-contain"
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
                    className="block max-w-full max-h-[68vh] w-auto h-auto object-contain select-none"
                    draggable={false}
                  />
                )}

              </div>

              {/* INFORMATION */}

              <div className="w-full max-w-5xl flex items-end justify-between gap-6 pt-4 text-white flex-shrink-0">

                <div>

                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">

                    {String(
                      (activeStage ?? 0) + 1
                    ).padStart(2, '0')}

                    {' / '}

                    {String(
                      project.executionPhotos.length
                    ).padStart(2, '0')}

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

                {/* CURRENT IMAGE NUMBER */}

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
                <div className="w-full max-w-5xl overflow-x-auto mt-4 pb-2 flex-shrink-0">

                  <div className="flex gap-2">

                    {activeImages.map(
                      (image, imageIndex) => {

                        const isActive =
                          activeImage === imageIndex;

                        const isVideoThumbnail =
                          activeStageData.type === 'video' &&
                          imageIndex === 0;

                        return (
                          <button
                            key={`${image}-${imageIndex}`}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveImage(
                                imageIndex
                              );
                            }}
                            className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 overflow-hidden border transition-all ${
                              isActive
                                ? 'border-white opacity-100'
                                : 'border-white/20 opacity-50 hover:opacity-100'
                            }`}
                            aria-label={
                              isFa
                                ? `تصویر ${imageIndex + 1}`
                                : `Image ${imageIndex + 1}`
                            }
                          >

                            {isVideoThumbnail ? (
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

                            {isActive && (
                              <div className="absolute inset-0 border-2 border-white pointer-events-none" />
                            )}

                          </button>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default ExecutionGallery;
