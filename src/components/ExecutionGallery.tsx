import React, { useState } from 'react';
import { Project, Language, ExecutionMedia } from '../types';
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
}

export const ExecutionGallery: React.FC<ExecutionGalleryProps> = ({
  project,
  language,
}) => {
  const isFa = language === 'FA';

  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);

  /*
   * If this project has no execution media,
   * don't render the section.
   */
  if (
    !project.executionPhotos ||
    project.executionPhotos.length === 0
  ) {
    return null;
  }

  const executionPhotos = project.executionPhotos;

  const titleEn =
    project.executionSectionTitleEn || 'Execution Phase';

  const titleFa =
    project.executionSectionTitleFa || 'مراحل اجرا';

  const narrativeEn =
    project.executionNarrativeEn || '';

  const narrativeFa =
    project.executionNarrativeFa || '';

  /*
   * Returns all images belonging to one execution stage.
   * imageUrl is always the first image.
   */
  const getImages = (media: ExecutionMedia): string[] => {
    return [
      media.imageUrl,
      ...(media.galleryImages || []),
    ];
  };

  /*
   * Open gallery for a specific execution stage.
   */
  const openGallery = (stageIndex: number) => {
    setActiveStage(stageIndex);
    setActiveImage(0);
    document.body.style.overflow = 'hidden';
  };

  /*
   * Close fullscreen gallery.
   */
  const closeGallery = () => {
    setActiveStage(null);
    setActiveImage(0);
    document.body.style.overflow = '';
  };

  /*
   * Go to next image.
   */
  const nextImage = () => {
    if (activeStage === null) return;

    const images = getImages(
      executionPhotos[activeStage]
    );

    setActiveImage((current) =>
      current < images.length - 1
        ? current + 1
        : 0
    );
  };

  /*
   * Go to previous image.
   */
  const previousImage = () => {
    if (activeStage === null) return;

    const images = getImages(
      executionPhotos[activeStage]
    );

    setActiveImage((current) =>
      current > 0
        ? current - 1
        : images.length - 1
    );
  };

  /*
   * Current active stage.
   */
  const activeStageData =
    activeStage !== null
      ? executionPhotos[activeStage]
      : null;

  /*
   * All images of current active stage.
   */
  const activeImages =
    activeStageData
      ? getImages(activeStageData)
      : [];

  return (
    <>
      {/* =========================================================
          EXECUTION SECTION
      ========================================================= */}

      <section
        id="execution-gallery"
        className="w-full bg-[#F4F1EE] py-24 md:py-32"
      >
        <div className="px-6 md:px-16">

          {/* =====================================================
              HEADER
          ===================================================== */}

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
                {isFa ? titleFa : titleEn}
              </h2>

              {(narrativeEn || narrativeFa) && (
                <p className="mt-6 text-base md:text-lg leading-relaxed text-[#4A4A4A] max-w-3xl">
                  {isFa
                    ? narrativeFa
                    : narrativeEn}
                </p>
              )}

            </div>
          </div>


          {/* =====================================================
              EXECUTION MEDIA GRID
          ===================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">

            {executionPhotos.map(
              (media, stageIndex) => {

                const images = getImages(media);
                const isVideo =
                  media.type === 'video';

                return (
                  <article
                    key={media.id}
                    className="group cursor-pointer"
                    onClick={() =>
                      openGallery(stageIndex)
                    }
                  >

                    {/* =================================================
                        IMAGE / VIDEO
                    ================================================= */}

                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E8E4E0]">

                      {isVideo ? (
                        <div className="relative w-full h-full">

                          <video
                            src={media.imageUrl}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />

                          {/* Video Play Icon */}
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


                      {/* =================================================
                          IMAGE COUNT
                      ================================================= */}

                      {images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-[#1C1C1C]/80 text-[#F4F1EE] px-3 py-1.5 text-[10px] tracking-[0.15em]">
                          {images.length}{' '}
                          {isFa
                            ? 'تصویر'
                            : 'IMAGES'}
                        </div>
                      )}


                      {/* =================================================
                          HOVER OVERLAY
                      ================================================= */}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C1C] text-[#F4F1EE] px-4 py-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">

                          <Maximize2 className="w-3.5 h-3.5" />

                          {isFa
                            ? 'مشاهده تصاویر'
                            : 'VIEW GALLERY'}

                        </div>

                      </div>

                    </div>


                    {/* =================================================
                        STAGE INFORMATION
                    ================================================= */}

                    <div className="pt-5 flex justify-between gap-6">

                      <div>

                        {/* Stage Number */}
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] mb-2">
                          {String(
                            stageIndex + 1
                          ).padStart(2, '0')}
                        </div>


                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-serif text-[#1C1C1C]">
                          {isFa
                            ? media.titleFa
                            : media.title}
                        </h3>


                        {/* Caption */}
                        {(media.caption ||
                          media.captionFa) && (
                          <p className="mt-2 text-sm leading-relaxed text-[#6A6A6A]">
                            {isFa
                              ? media.captionFa
                              : media.caption}
                          </p>
                        )}

                      </div>


                      {/* Additional Image Count */}
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


      {/* =========================================================
          FULLSCREEN GALLERY
      ========================================================= */}

      {activeStageData && activeImages.length > 0 && (

        <div
          className="fixed inset-0 z-[9999] bg-[#111]/95 flex items-center justify-center p-4 md:p-10"
          onClick={closeGallery}
        >

          {/* =====================================================
              CLOSE BUTTON
          ===================================================== */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeGallery();
            }}
            className="absolute top-5 right-5 z-30 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>


          {/* =====================================================
              PREVIOUS BUTTON
          ===================================================== */}

          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}


          {/* =====================================================
              GALLERY CONTENT
          ===================================================== */}

          <div
            className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ===================================================
                MAIN IMAGE
            =================================================== */}

            <div className="flex-1 w-full min-h-0 flex items-center justify-center">

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
                  className="max-w-full max-h-[72vh] object-contain select-none"
                />

              )}

            </div>


            {/* ===================================================
                INFORMATION
            =================================================== */}

            <div className="w-full max-w-5xl flex items-end justify-between gap-6 pt-5 text-white">

              <div>

                {/* Stage Number */}
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  {String(
                    (activeStage ?? 0) + 1
                  ).padStart(2, '0')}

                  {' / '}

                  {String(
                    executionPhotos.length
                  ).padStart(2, '0')}
                </div>


                {/* Stage Title */}
                <h3 className="text-xl md:text-2xl font-serif">
                  {isFa
                    ? activeStageData.titleFa
                    : activeStageData.title}
                </h3>


                {/* Stage Caption */}
                {(activeStageData.caption ||
                  activeStageData.captionFa) && (
                  <p className="text-sm text-white/60 mt-2">
                    {isFa
                      ? activeStageData.captionFa
                      : activeStageData.caption}
                  </p>
                )}

              </div>


              {/* Image Counter */}
              <div className="text-sm text-white/60 whitespace-nowrap">
                {activeImage + 1}
                {' / '}
                {activeImages.length}
              </div>

            </div>


            {/* ===================================================
                THUMBNAILS
            =================================================== */}

            {activeImages.length > 1 && (

              <div className="w-full max-w-5xl overflow-x-auto mt-5 pb-2">

                <div className="flex gap-2">

                  {activeImages.map(
                    (image, index) => {

                      const isActive =
                        activeImage === index;

                      const isVideoThumbnail =
                        activeStageData.type ===
                          'video' &&
                        index === 0;

                      return (

                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() =>
                            setActiveImage(index)
                          }
                          className={`
                            relative
                            flex-shrink-0
                            w-20
                            h-14
                            md:w-24
                            md:h-16
                            overflow-hidden
                            border
                            transition-all
                            duration-200
                            ${
                              isActive
                                ? 'border-white opacity-100'
                                : 'border-white/20 opacity-50 hover:opacity-100'
                            }
                          `}
                        >

                          {isVideoThumbnail ? (

                            <div className="relative w-full h-full bg-black">

                              <video
                                src={image}
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                                preload="metadata"
                              />

                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">

                                <Play className="w-4 h-4 text-white fill-current" />

                              </div>

                            </div>

                          ) : (

                            <img
                              src={image}
                              alt=""
                              className="w-full h-full object-cover"
                            />

                          )}

                        </button>

                      );
                    }
                  )}

                </div>

              </div>

            )}

          </div>


          {/* =====================================================
              NEXT BUTTON
          ===================================================== */}

          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
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
