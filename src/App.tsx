import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams
} from 'react-router-dom';
import { projects, studioInfo } from './data/projects';
import { Language } from './types';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { ProjectHero } from './components/ProjectHero';
import { ProjectMeta } from './components/ProjectMeta';
import { EditorialSections } from './components/EditorialSections';
import { SpatialLogicBlueprints } from './components/SpatialLogicBlueprints';
import { ExecutionGallery } from './components/ExecutionGallery';
import { ProjectNavigation } from './components/ProjectNavigation';
import { ProjectsList } from './components/ProjectsList';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { ContactModal } from './components/ContactModal';
import { LightboxModal, LightboxImage } from './components/LightboxModal';
import { Footer } from './components/Footer';

// Turns a project's internal id ("SHIRVANI VILLA") into a clean URL slug
// ("shirvani-villa"). Keeping this as a pure function (instead of adding a
// field to every project) means old data keeps working automatically.
const slugify = (id: string) =>
  id.trim().toLowerCase().replace(/\s+/g, '-');

const findProjectBySlug = (slug: string | undefined) =>
  projects.find((p) => slugify(p.id) === slug);

interface SharedState {
  language: Language;
  setLanguage: (lang: Language) => void;
  contactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
  lightbox: {
    isOpen: boolean;
    images: LightboxImage[];
    currentIndex: number;
  };
  onOpenImage: (url: string, caption: string) => void;
  onOpenGallery: (images: LightboxImage[], startIndex?: number) => void;
}

// New: the landing page shown at "/" — a minimal menu of Projects / About /
// Services / Contact, instead of dropping the visitor straight into a project.
function HomePage({ language, setContactModalOpen }: SharedState) {
  const navigate = useNavigate();
  return (
    <Home
      language={language}
      projects={projects}
      studioInfo={studioInfo}
      onProjects={() => {
        navigate('/projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onAbout={() => {
        navigate('/about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onServices={() => {
        navigate('/services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onContact={() => setContactModalOpen(true)}
    />
  );
}

function ProjectDetailPage({ language, onOpenImage, onOpenGallery }: SharedState) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = findProjectBySlug(slug);

  // Unknown slug -> send back to the projects list instead of a blank page.
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const prevProject = projects.find((p) => p.id === project.prevProjectId);
  const nextProject = projects.find((p) => p.id === project.nextProjectId);

  const handleSelectProject = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      navigate(`/projects/${slugify(target.id)}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in">
      <ProjectHero project={project} language={language} onOpenImage={onOpenImage} />
      <ProjectMeta project={project} language={language} />
      <EditorialSections
        project={project}
        language={language}
        onOpenImage={onOpenImage}
        onOpenGallery={onOpenGallery}
      />
      <SpatialLogicBlueprints
        project={project}
        language={language}
        onOpenDrawing={onOpenImage}
      />
      <ExecutionGallery project={project} language={language} onOpenImage={onOpenImage} />
      <ProjectNavigation
        prevProject={prevProject}
        nextProject={nextProject}
        language={language}
        onSelectProject={handleSelectProject}
      />
    </div>
  );
}

function ProjectsListPage({ language }: SharedState) {
  const navigate = useNavigate();
  const handleSelectProject = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      navigate(`/projects/${slugify(target.id)}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <ProjectsList projects={projects} language={language} onSelectProject={handleSelectProject} />
  );
}

function AboutPage({ language, setContactModalOpen }: SharedState) {
  return (
    <AboutView
      studioInfo={studioInfo}
      language={language}
      openContact={() => setContactModalOpen(true)}
    />
  );
}

function ServicesPage({ language, setContactModalOpen }: SharedState) {
  return (
    <ServicesView
      services={studioInfo.services}
      language={language}
      openContact={() => setContactModalOpen(true)}
    />
  );
}

function AppShell() {
  const navigate = useNavigate();
  const [language, setLanguage] = React.useState<Language>('EN');
  const [contactModalOpen, setContactModalOpen] = React.useState<boolean>(false);

  const [lightbox, setLightbox] = React.useState<{
    isOpen: boolean;
    images: LightboxImage[];
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  useEffect(() => {
    document.documentElement.dir = language === 'FA' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'FA' ? 'fa' : 'en';
  }, [language]);

  const handleOpenImage = (url: string, caption: string) => {
    setLightbox({ isOpen: true, images: [{ url, caption }], currentIndex: 0 });
  };

  const handleOpenGallery = (images: LightboxImage[], startIndex: number = 0) => {
    if (!images || images.length === 0) return;
    setLightbox({ isOpen: true, images, currentIndex: startIndex });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNextImage = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const handlePrevImage = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const shared: SharedState = {
    language,
    setLanguage,
    contactModalOpen,
    setContactModalOpen,
    lightbox,
    onOpenImage: handleOpenImage,
    onOpenGallery: handleOpenGallery
  };

  // Maps the current URL to Header's old "active tab" concept, so the header
  // still highlights the right nav item even though routing now drives the page.
  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4F1EE] text-[#1C1C1C] font-sans selection:bg-[#1C1C1C] selection:text-[#F4F1EE]">
      <Header
        activeView={
          window.location.pathname.startsWith('/projects/')
            ? 'project-detail'
            : window.location.pathname.startsWith('/projects')
            ? 'projects-list'
            : window.location.pathname.startsWith('/about')
            ? 'about'
            : window.location.pathname.startsWith('/services')
            ? 'services'
            : 'home'
        }
        setActiveView={(view) => {
          if (view === 'home') goTo('/');
          else if (view === 'project-detail') goTo(`/projects/${slugify(projects[0].id)}`);
          else if (view === 'projects-list') goTo('/projects');
          else if (view === 'about') goTo('/about');
          else if (view === 'services') goTo('/services');
        }}
        language={language}
        setLanguage={setLanguage}
        openContact={() => setContactModalOpen(true)}
      />

      <main className="w-full">
        <Routes>
          <Route path="/" element={<HomePage {...shared} />} />
          <Route path="/projects" element={<ProjectsListPage {...shared} />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage {...shared} />} />
          <Route path="/about" element={<AboutPage {...shared} />} />
          <Route path="/services" element={<ServicesPage {...shared} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer hidden on the minimal home landing page */}
      {window.location.pathname !== '/' && (
        <Footer language={language} openContact={() => setContactModalOpen(true)} />
      )}

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        studioInfo={studioInfo}
        language={language}
      />

      <LightboxModal
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        onClose={handleCloseLightbox}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        language={language}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
