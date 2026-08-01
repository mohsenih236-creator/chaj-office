import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  caption: string;
  onClose: () => void;
  language: Language;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  caption,
  onClose,
  language
}) => {
  if (!isOpen || !imageUrl) return null;

  const isFa = language === 'FA';
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.7));
  const handleReset = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-fade-in p-4 sm:p-6">
      {/* Top Bar Controls */}
      <div className="flex justify-between items-center z-10">
        <div className="text-white/80 font-sans text-[10px] uppercase tracking-[0.25em]">
          CHAJ OFFICE • INSPECTOR VIEW
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

      {/* Image Container with Drag/Zoom */}
      <div className="flex-1 flex items-center justify-center overflow-auto py-4 my-2 relative">
        <img
          src={imageUrl}
          alt={caption}
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease-out' }}
          className="max-h-[80vh] max-w-full object-contain cursor-grab active:cursor-grabbing select-none"
        />
      </div>

      {/* Bottom Caption Bar */}
      <div className="bg-black/60 border border-white/10 p-4 max-w-3xl mx-auto w-full text-center text-white/90 text-xs sm:text-sm tracking-wide z-10 backdrop-blur-md">
        {caption}
      </div>
    </div>
  );
};
