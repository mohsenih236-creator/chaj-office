import React, { useState } from 'react';
import { ExecutionMedia, Language } from './src/types';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

interface ExecutionGalleryProps {
  photos: ExecutionMedia[];
  language: Language;
}

const ExecutionGallery: React.FC<ExecutionGalleryProps> = ({
  photos,
  language,
}) => {
  const isFa = language === 'FA';

  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);

  if (!photos || photos.length === 0) {
    return null;
  }

  const getImages = (stage: ExecutionMedia): string[] => {
    return [
      stage.imageUrl,
      ...(stage.galleryImages || []),
    ];
  };

  const openGallery = (stageIndex: number) => {
    setActiveStage(stageIndex);
    setActiveImage(0);
  };

  const closeGallery = () => {
    setActiveStage(null);
    setActiveImage(0);
  };

  const nextImage = () => {
    if (activeStage === null) return;

    const images = getImages(photos[activeStage]);

    setActiveImage((current) =>
      current < images.length - 1 ? current + 1 : 0
    );
  };

  const previousImage = () => {
    if (activeStage === null) return;

    const images = getImages(photos[activeStage]);

    setActiveImage((current) =>
      current > 0 ? current - 1 : images.length - 1
    );
  };

  const activeStageData =
    activeStage !== null ? photos[activeStage] : null;

  const activeImages =
    activeStageData ? getImages(activeStageData) : [];

  return (
    <>
      <section
        id="execution-gallery"
        className="w-full bg-[#F4F1EE] py-24 md:py-32"
      >
        <div className="px-6 md:px-16">

          {/* Section Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">

            <div className="md:col-span-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8C8C]">
                {isFa ? 'روند اجرا' : 'EXECUTION PHASE'}
              </span>
            </div>

            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1C1C1C]">
                {isFa
                  ? 'مراحل اجرای پروژه'
                  : 'Project Execution'}
              </h2>
            </div>

          </div>


          {/* Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">

            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C8C8C]">
                {isFa ? 'روند ساخت' : 'CONSTRUCTION PROCESS'}
              </span>
            </div>

            <div className="md:col-span-6">
              <p className="text-base md:text-lg leading-relaxed text-[#4A4A4A]">
                {isFa
                  ? 'نگاهی به روند اجرای پروژه از آغاز تا تکمیل.'
                  : 'A look at the construction process from start to completion.'}
              </p>
            </div>

          </div>


          {/* Execution Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">

            {photos.map((stage, stageIndex) => {

              const images = getImages(stage);

              return (
                <article
                  key={stage.id}
                  className="group cursor-pointer"
                  onClick={() => openGallery(stageIndex)}
                >

                  {/* Image */}
                  <div className="relative overflow-hidden bg-[#EAE7E3] aspect-[4/3]">

                    {stage.type === 'video' ? (
                      <div className="relative w-full h-full">

                        <video
                          src={stage.imageUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#F4F1EE]/90 flex items-center justify-center">
                            <Play className="w-5 h-5 fill-current text-[#1C1C1C] ml-1" />
                          </div>
                        </div>

                      </div>
                    ) : (
                      <img
                        src={stage.imageUrl}
                        alt={isFa ? stage.titleFa : stage.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}

                    {/* Image Count */}
                    {images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-[#1C1C1C]/80 text-[#F4F1EE] px-3 py-1.5 text-[10px] tracking-[0.15em]">
                        {images.length} {isFa ? 'تصویر' : 'IMAGES'}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                  </div>


                  {/* Stage Information */}
                  <div className="pt-5 flex justify-between gap-6">

                    <div>

                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] mb-2">
                        {String(stageIndex + 1).padStart(2, '0')}
                      </div>

                      <h3 className="text-xl md:text-2xl font-serif text-[#1C1C1C]">
                        {isFa ? stage.titleFa : stage.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#6A6A6A] max-w-xl">
                        {isFa ? stage.captionFa : stage.caption}
                      </p>

                    </div>

                    {images.length > 1 && (
                      <div className="flex-shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#8C8C8C] pt-1">
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


      {/* Fullscreen Gallery */}
      {activeStageData && (
        <div
          className="fixed inset-0 z-[100] bg-[#111]/95 flex items-center justify-center p-4 md:p-10"
          onClick={closeGallery}
        >

          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeGallery();
            }}
            className="absolute top-5 right-5 z-20 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>


          {/* Previous */}
          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}


          {/* Main Image */}
          <div
            className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex-1 w-full flex items-center justify-center min-h-0">

              {activeStageData.type === 'video' &&
              activeImage === 0 ? (
                <video
                  src={activeImages[activeImage]}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] object-contain"
                />
              ) : (
                <img
                  src={activeImages[activeImage]}
                  alt={
                    isFa
                      ? activeStageData.titleFa
                      : activeStageData.title
                  }
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}

            </div>


            {/* Gallery Information */}
            <div className="w-full max-w-5xl flex items-end justify-between gap-6 pt-5 text-white">

              <div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  {String(activeStage + 1).padStart(2, '0')}
                  {' / '}
                  {String(photos.length).padStart(2, '0')}
                </div>

                <h3 className="text-xl md:text-2xl font-serif">
                  {isFa
                    ? activeStageData.titleFa
                    : activeStageData.title}
                </h3>

                <p className="text-sm text-white/60 mt-2">
                  {isFa
                    ? activeStageData.captionFa
                    : activeStageData.caption}
                </p>

              </div>


              <div className="text-sm text-white/60 whitespace-nowrap">
                {activeImage + 1} / {activeImages.length}
              </div>

            </div>


            {/* Thumbnails */}
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
                      {activeStageData.type === 'video' &&
                      index === 0 ? (
                        <video
                          src={image}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}

                </div>
              </div>
            )}

          </div>


          {/* Next */}
          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 z-20 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
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
