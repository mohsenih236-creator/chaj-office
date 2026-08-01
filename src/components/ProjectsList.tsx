import React, { useState } from 'react';
import { Project, Language, ProjectCategory } from '../types';
import { Search, Filter, ArrowUpRight } from 'lucide-react';

interface ProjectsListProps {
  projects: Project[];
  language: Language;
  onSelectProject: (projectId: string) => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  language,
  onSelectProject
}) => {
  const isFa = language === 'FA';
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = ['All', 'Residential', 'Cultural', 'Concept'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleFa.includes(searchQuery) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locationFa.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto animate-fade-in">
      {/* Header & Filter Bar */}
      <div className="mb-12 border-b border-black/10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-1">
              {isFa ? 'آرشیو آثار معماری' : 'ARCHITECTURAL PORTFOLIO'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-light italic text-[#1C1C1C] font-serif">
              {isFa ? 'تمامی پروژه‌ها' : 'All Projects'}
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#8C8C8C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isFa ? 'جستجو در پروژه‌ها...' : 'Search projects or location...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4F1EE] border border-black/15 pl-9 pr-4 py-2 font-sans text-xs focus:outline-none focus:border-[#1C1C1C]"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#1C1C1C] text-[#F4F1EE]'
                  : 'bg-[#F4F1EE] text-[#8C8C8C] hover:text-[#1C1C1C] border border-black/15'
              }`}
            >
              {isFa
                ? cat === 'All'
                  ? 'همه'
                  : cat === 'Residential'
                  ? 'مسکونی'
                  : cat === 'Cultural'
                  ? 'فرهنگی'
                  : 'مفهومی'
                : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className="group cursor-pointer flex flex-col bg-[#F4F1EE] border border-black/10 hover:border-[#1C1C1C] transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                <img
                  src={p.heroImage}
                  alt={isFa ? p.titleFa : p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#1C1C1C]/80 text-white font-sans text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 backdrop-blur-md">
                  {p.year}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-xl font-light italic text-[#1C1C1C] group-hover:text-black font-serif">
                      {isFa ? p.titleFa : p.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#8C8C8C] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] mb-4">
                    {isFa ? p.locationFa : p.location} • {p.area}
                  </p>
                  <p className="text-xs text-[#4A4A4A] italic line-clamp-2 leading-relaxed">
                    {isFa ? p.narrativeFa : p.narrativeEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10 flex justify-between items-center font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#8C8C8C]">
                  <span>{p.category}</span>
                  <span className="text-[#1C1C1C] group-hover:underline">
                    {isFa ? 'مشاهده جزئیات' : 'Explore Detail'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#5e5e5d]">
          <p>{isFa ? 'هیچ پروژه‌ای با این مشخصات یافت نشد.' : 'No projects found matching your criteria.'}</p>
        </div>
      )}
    </div>
  );
};
