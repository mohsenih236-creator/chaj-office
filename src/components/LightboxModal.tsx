import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';

export interface LightboxImage {
  url: string;
  caption: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  language: Language;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  language
}) => {
  const isFa = language === 'FA';
  const [zoom, setZoom] = useState(1);

  // Reset zoom whenever a different image is shown
  useEffect(() => {
    setZoom(1);
  }, [currentIndex, isOpen]);

  if (!isOpen || !images || images.length === 0) return null;

  const current = images[currentIndex];
  if (!current) return null;

  const hasMultiple = images.length > 1;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.7));
  const handleReset = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-fade-in p-4 sm:p-6">
      {/* Top Bar Controls */}
      <div className="flex justify-between items-center z-10">
        <div className="text-white/80 font-sans text-[10px] uppercase tracking-[0.25em]">
          CHAJ GROUP • INSPECTOR VIEW
          {hasMultiple && (
            <span className="ml-3 text-white/50">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/10 border border-white/20 px-2 py-1 gap-1 text-white text-xs">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:text-white/70 cursor-pointer"
              title={isFa ? 'کاهش زوم' : 'Zoom Out'}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-sans text-[10px] px-1">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:text-white/70 cursor-pointer"
              title={isFa ? 'افزایش زوم' : 'Zoom In'}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1 hover:text-white/70 cursor-pointer ml-1 border-l border-white/20 pl-2"
              title={isFa ? 'تنظیم مجدد' : 'Reset Scale'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={isFa ? 'بستن' : 'Close Lightbox'}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Image Container with Drag/Zoom + Prev/Next Navigation */}
      <div className="flex-1 flex items-center justify-center overflow-auto py-4 my-2 relative">
        {hasMultiple && (
          <button
            onClick={onPrev}
            className="absolute left-0 sm:left-4 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={isFa ? 'قبلی' : 'Previous'}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={current.url}
          alt={current.caption}
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease-out' }}
          className="max-h-[80vh] max-w-full object-contain cursor-grab active:cursor-grabbing select-none"
        />

        {hasMultiple && (
          <button
            onClick={onNext}
            className="absolute right-0 sm:right-4 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={isFa ? 'بعدی' : 'Next'}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption Bar */}
      <div className="bg-black/60 border border-white/10 p-4 max-w-3xl mx-auto w-full text-center text-white/90 text-xs sm:text-sm tracking-wide z-10 backdrop-blur-md">
        {current.caption}
      </div>
    </div>
  );
};

