import React, { useState, useEffect } from 'react';
import { projects, studioInfo } from './data/projects';
import { ViewMode, Language } from './types';
import { Header } from './components/Header';
import { ProjectHero } from './components/ProjectHero';
import { ProjectMeta } from './components/ProjectMeta';
import { EditorialSections } from './components/EditorialSections';
import { SpatialLogicBlueprints } from './components/SpatialLogicBlueprints';
import { ProjectNavigation } from './components/ProjectNavigation';
import { ProjectsList } from './components/ProjectsList';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { ContactModal } from './components/ContactModal';
import { LightboxModal } from './components/LightboxModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('project-detail');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('the-monolith-house');
  const [language, setLanguage] = useState<Language>('EN');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; url: string; caption: string }>({
    isOpen: false,
    url: '',
    caption: ''
  });

  // Active Project resolution
  const activeProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const prevProject = projects.find((p) => p.id === activeProject.prevProjectId);
  const nextProject = projects.find((p) => p.id === activeProject.nextProjectId);

  // Set RTL or LTR document direction depending on language
  useEffect(() => {
    document.documentElement.dir = language === 'FA' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'FA' ? 'fa' : 'en';
  }, [language]);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveView('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenImage = (url: string, caption: string) => {
    setLightbox({ isOpen: true, url, caption });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className={`min-h-screen bg-[#F4F1EE] text-[#1C1C1C] font-sans selection:bg-[#1C1C1C] selection:text-[#F4F1EE]`}>
      {/* Top Fixed Header Navigation */}
      <Header
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        openContact={() => setContactModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {activeView === 'project-detail' && (
          <div className="animate-fade-in">
            {/* Project Hero Section */}
            <ProjectHero
              project={activeProject}
              language={language}
              onOpenImage={handleOpenImage}
            />

            {/* Project Specifications & Narrative */}
            <ProjectMeta project={activeProject} language={language} />

            {/* Editorial Sections ("Light as Material", Material Pairs) */}
            <EditorialSections
              project={activeProject}
              language={language}
              onOpenImage={handleOpenImage}
            />

            {/* Spatial Logic & Interactive Blueprints */}
            <SpatialLogicBlueprints
              project={activeProject}
              language={language}
              onOpenDrawing={handleOpenImage}
            />

            {/* Previous / Next Project Navigation Footer */}
            <ProjectNavigation
              prevProject={prevProject}
              nextProject={nextProject}
              language={language}
              onSelectProject={handleSelectProject}
            />
          </div>
        )}

        {/* All Projects Archive View */}
        {activeView === 'projects-list' && (
          <ProjectsList
            projects={projects}
            language={language}
            onSelectProject={handleSelectProject}
          />
        )}

        {/* Studio About View */}
        {activeView === 'about' && (
          <AboutView
            studioInfo={studioInfo}
            language={language}
            openContact={() => setContactModalOpen(true)}
          />
        )}

        {/* Studio Services View */}
        {activeView === 'services' && (
          <ServicesView
            services={studioInfo.services}
            language={language}
            openContact={() => setContactModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        openContact={() => setContactModalOpen(true)}
      />

      {/* Contact Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        studioInfo={studioInfo}
        language={language}
      />

      {/* Full-screen Lightbox Inspector Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.url}
        caption={lightbox.caption}
        onClose={handleCloseLightbox}
        language={language}
      />
    </div>
  );
}
