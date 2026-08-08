import React, { useState } from 'react';
import { Project, Language } from '../types';
import {
  HardHat,
  Maximize2,
  Play,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

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

  const [activeMedia, setActiveMedia] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (!project.executionPhotos || project.executionPhotos.length === 0) {
    return null;
  }

  const titleEn =
    project.executionSectionTitleEn || 'Execution Phase';

  const titleFa =
    project.executionSectionTitleFa || 'مراحل اجرا';

  const narrativeEn =
    project.executionNarrativeEn || '';

  const narrativeFa =
    project.executionNarrativeFa || '';

  /*
   * Return all images belonging to one execution stage.
   *
   * imageUrl is always the first image.
   * galleryImages are additional images.
   */
  const getImages = (media: typeof project.executionPhotos[number]) => {
    return [
      media.imageUrl,
      ...(media.galleryImages || [])
    ];
  };

  const openGallery = (mediaIndex: number) => {
    setActiveMedia(mediaIndex);
    setActiveImage(0);
  };

  const closeGallery = () => {
    setActiveMedia(null);
    setActiveImage(0);
  };

  const nextImage = () => {
    if (activeMedia === null) return;

    const media = project.executionPhotos![activeMedia];
    const images = getImages(media);

    setActiveImage((current) =>
      current < images.length - 1 ? current + 1 : 0
    );
  };

  const previousImage = () => {
    if (activeMedia === null) return;

    const media = project.executionPhotos![activeMedia];
    const images = getImages(media);

    setActiveImage((current) =>
      current > 0 ? current - 1 : images.length - 1
    );
  };

  const activeMediaData =
    activeMedia !== null
      ? project.executionPhotos[activeMedia]
      : null;

  const activeImages =
    activeMediaData
      ? getImages(activeMediaData)
      : [];

  return (
    <>
      <section
        id="execution-gallery"
        className="w-full bg-[#F4F1EE] py-24 md:py-32"
      >
        <div className="px-6 md:px-16">

          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

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
                {isFa ? titleFa : titleEn}
              </h2>

            </div>

          </div>


          {/* ================================================== */}
          {/* NARRATIVE */}
          {/* ================================================== */}

          {(narrativeEn || narrativeFa) && (

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
                    ? narrativeFa
                    : narrativeEn}
                </p>

              </div>

            </div>

          )}


          {/* ================================================== */}
          {/* EXECUTION MEDIA GRID */}
          {/* ================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {project.executionPhotos.map((media, mediaIndex) => {

              const images = getImages(media);
              const isVideo = media.type === 'video';

              return (

                <div
                  key={media.id}
                  className="flex flex-col"
                >

                  {/* ================================================== */}
                  {/* MAIN MEDIA */}
                  {/* ================================================== */}

                  {isVideo ? (

                    <div className="w-full aspect-[4/3] bg-black overflow-hidden relative border border-black/5 shadow-xs">

                      <video
                        src={media.imageUrl}
                        controls
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />

                      <div className="absolute top-3 left-3 bg-[#1C1C1C]/80 text-white px-2 py-1 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-sans pointer-events-none">

                        <Play className="w-3 h-3" />

                        {isFa
                          ? 'ویدیو'
                          : 'Video'}

                      </div>

                    </div>

                  ) : (

                    <div
                      className="w-full aspect-[4/3] bg-[#E8E4E0] bg-cover bg-center overflow-hidden cursor-pointer group relative border border-black/5 shadow-xs hover:shadow-md transition-shadow duration-300"
                      style={{
                        backgroundImage: `url('${media.imageUrl}')`
                      }}
                      onClick={() => openGallery(mediaIndex)}
                    >

                      {/* Hover Overlay */}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">

                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1C1C] text-[#F4F1EE] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">

                          <Maximize2 className="w-3.5 h-3.5" />

                          {isFa
                            ? 'مشاهده'
                            : 'View'}

                        </span>

                      </div>


                      {/* IMAGE COUNT */}

                      {images.length > 1 && (

                        <div className="absolute top-3 right-3 bg-[#1C1C1C]/80 text-white px-2.5 py-1 text-[9px] uppercase tracking-[0.15em]">

                          {images.length}{' '}

                          {isFa
                            ? 'تصویر'
                            : 'IMAGES'}

                        </div>

                      )}

                    </div>

                  )}


                  {/* ================================================== */}
                  {/* TITLE / CAPTION */}
                  {/* ================================================== */}

                  <div className="mt-3">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#1C1C1C] uppercase">

                          {isFa
                            ? media.titleFa
                            : media.title}

                        </p>

                        {(media.caption || media.captionFa) && (

                          <p className="text-xs text-[#4A4A4A] italic mt-1 leading-relaxed">

                            {isFa
                              ? media.captionFa
                              : media.caption}

                          </p>

                        )}

                      </div>


                      {/* ADDITIONAL IMAGE COUNT */}

                      {images.length > 1 && (

                        <span className="flex-shrink-0 text-[10px] text-[#8C8C8C] uppercase tracking-[0.15em]">

                          +{images.length - 1}

                        </span>

                      )}

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        </div>
      </section>


      {/* ====================================================== */}
      {/* FULLSCREEN GALLERY */}
      {/* ====================================================== */}

      {activeMediaData && (

        <div
          className="fixed inset-0 z-[100] bg-[#111]/95 flex items-center justify-center p-4 md:p-10"
          onClick={closeGallery}
        >

          {/* ================================================== */}
          {/* CLOSE */}
          {/* ================================================== */}

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


          {/* ================================================== */}
          {/* PREVIOUS */}
          {/* ================================================== */}

          {activeImages.length > 1 && (

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 md:left-8 z-30 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >

              <ChevronLeft className="w-8 h-8" />

            </button>

          )}


          {/* ================================================== */}
          {/* MAIN GALLERY */}
          {/* ================================================== */}

          <div
            className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MAIN IMAGE */}

            <div className="flex-1 w-full flex items-center justify-center min-h-0">

              {activeMediaData.type === 'video' &&
              activeImage === 0 ? (

                <video
                  src={activeImages[activeImage]}
                  controls
                  autoPlay
                  className="max-w-full max-h-[75vh] object-contain"
                />

              ) : (

                <img
                  src={activeImages[activeImage]}
                  alt={
                    isFa
                      ? activeMediaData.titleFa
                      : activeMediaData.title
                  }
                  className="max-w-full max-h-[75vh] object-contain"
                />

              )}

            </div>


            {/* ================================================== */}
            {/* INFO */}
            {/* ================================================== */}

            <div className="w-full max-w-5xl flex items-end justify-between gap-6 pt-5 text-white">

              <div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">

                  {String(activeMedia + 1).padStart(2, '0')}
                  {' / '}
                  {String(project.executionPhotos.length).padStart(2, '0')}

                </div>

                <h3 className="text-xl md:text-2xl font-serif">

                  {isFa
                    ? activeMediaData.titleFa
                    : activeMediaData.title}

                </h3>

                <p className="text-sm text-white/60 mt-2">

                  {isFa
                    ? activeMediaData.captionFa
                    : activeMediaData.caption}

                </p>

              </div>


              {/* IMAGE NUMBER */}

              <div className="text-sm text-white/60 whitespace-nowrap">

                {activeImage + 1}
                {' / '}
                {activeImages.length}

              </div>

            </div>


            {/* ================================================== */}
            {/* THUMBNAILS */}
            {/* ================================================== */}

            {activeImages.length > 1 && (

              <div className="w-full max-w-5xl overflow-x-auto mt-5 pb-2">

                <div className="flex gap-2">

                  {activeImages.map((image, index) => (

                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`relative flex-shrink-0 w-20 h-14 overflow-hidden border transition-all ${
                        activeImage === index
                          ? 'border-white'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >

                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                    </button>

                  ))}

                </div>

              </div>

            )}

          </div>


          {/* ================================================== */}
          {/* NEXT */}
          {/* ================================================== */}

          {activeImages.length > 1 && (

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 z-30 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
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
