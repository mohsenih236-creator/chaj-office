import React, { useState } from 'react';
import { Project, Language, Hotspot } from '../types';
import { Maximize2, Compass, Layers, Crosshair, X, ZoomIn } from 'lucide-react';

interface SpatialLogicBlueprintsProps {
  project: Project;
  language: Language;
  onOpenDrawing: (url: string, title: string) => void;
}

export const SpatialLogicBlueprints: React.FC<SpatialLogicBlueprintsProps> = ({
  project,
  language,
  onOpenDrawing
}) => {
  const isFa = language === 'FA';
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'plan' | 'section'>('all');

  return (
    <section
      id="spatial-logic-section"
      className="bg-[#E8E4E0]/50 px-6 md:px-16 py-16 md:py-28 border-t border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-2">
            {isFa ? 'نقشه‌های فنی و سازمان‌دهی فضایی' : 'TECHNICAL DRAWINGS & BLUEPRINTS'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light italic text-[#1C1C1C] mb-6 font-serif">
            {isFa ? project.spatialSectionTitleFa : project.spatialSectionTitleEn}
          </h2>
          <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed font-normal">
            {isFa ? project.spatialNarrativeFa : project.spatialNarrativeEn}
          </p>
        </div>

        {/* Drawing Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {project.drawings.map((drawing) => (
            <div key={drawing.id} className="flex flex-col">
              {/* Drawing Frame */}
              <div className="relative w-full aspect-square bg-[#F4F1EE] border border-black/10 p-6 sm:p-8 flex items-center justify-center group overflow-hidden shadow-xs">
                {/* Blueprint Image */}
                <img
                  src={drawing.imageUrl}
                  alt={isFa ? drawing.titleFa : drawing.title}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onClick={() => onOpenDrawing(drawing.imageUrl, isFa ? drawing.titleFa : drawing.title)}
                />

                {/* Hotspot Markers Overlay */}
                {drawing.hotspots &&
                  drawing.hotspots.map((hs) => (
                    <button
                      key={hs.id}
                      onClick={() => setSelectedHotspot(hs)}
                      className={`absolute w-6 h-6 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
                        selectedHotspot?.id === hs.id
                          ? 'bg-[#1C1C1C] text-white scale-125 ring-4 ring-black/20 z-20'
                          : 'bg-[#1C1C1C]/80 hover:bg-[#1C1C1C] text-white hover:scale-110 z-10'
                      }`}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      title={isFa ? hs.labelFa : hs.label}
                    >
                      <Crosshair className="w-3.5 h-3.5" />
                    </button>
                  ))}

                {/* Top Action Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => onOpenDrawing(drawing.imageUrl, isFa ? drawing.titleFa : drawing.title)}
                    className="p-2 bg-[#1C1C1C]/80 hover:bg-[#1C1C1C] text-white transition-colors backdrop-blur-md cursor-pointer"
                    title={isFa ? 'مشاهده کامل نقشه' : 'Open High-Res Blueprint'}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Watermark Tag */}
                <div className="absolute bottom-4 left-4 font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C] bg-[#F4F1EE]/95 px-2.5 py-1 border border-black/10">
                  CHAJ OFFICE • SCALE 1:100 • ARCHITECTURAL {drawing.type.toUpperCase()}
                </div>
              </div>

              {/* Drawing Title Label */}
              <div className="mt-4 flex justify-between items-center">
                <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1C1C1C]">
                  {isFa ? drawing.titleFa : drawing.title}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C]">
                  {drawing.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Hotspot Inspector Modal/Card */}
        {selectedHotspot && (
          <div className="mt-8 p-6 bg-white border border-[#1b1c1c] rounded-none shadow-md animate-fade-in relative flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#5e5e5d] uppercase mb-1">
                <Crosshair className="w-3.5 h-3.5 text-[#1b1c1c]" />
                <span>{isFa ? 'تحلیل نقطه کلیدی پلان' : 'Architectural Hotspot Analysis'}</span>
              </div>
              <h4 className="text-xl font-bold text-[#1b1c1c] mb-2 font-serif-heading">
                {isFa ? selectedHotspot.labelFa : selectedHotspot.label}
              </h4>
              <p className="text-sm text-[#444748] leading-relaxed">
                {isFa ? selectedHotspot.descriptionFa : selectedHotspot.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-2 text-[#5e5e5d] hover:text-[#1b1c1c] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
