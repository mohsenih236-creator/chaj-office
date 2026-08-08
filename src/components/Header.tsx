import React, { useState, useEffect } from 'react';
import { ViewMode, Language } from '../types';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';

interface HeaderProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  openContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  language,
  setLanguage,
  openContact
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: {
    labelEn: string;
    labelFa: string;
    view: ViewMode | 'contact';
  }[] = [
    {
      labelEn: 'Projects',
      labelFa: 'پروژه‌ها',
      view: 'projects-list'
    },
    {
      labelEn: 'About',
      labelFa: 'درباره ما',
      view: 'about'
    },
    {
      labelEn: 'Services',
      labelFa: 'خدمات',
      view: 'services'
    },
    {
      labelEn: 'Contact',
      labelFa: 'تماس',
      view: 'contact'
    },
  ];

  const handleNavClick = (targetView: ViewMode | 'contact') => {
    if (targetView === 'contact') {
      openContact();
    } else {
      setActiveView(targetView);
    }

    setMobileMenuOpen(false);
  };

  const isFa = language === 'FA';

  // فقط منوی Header در صفحه Home مخفی می‌شود
  // خود Header، لوگو و زبان همچنان باقی می‌مانند.
  const showNavigation = activeView !== 'home';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 px-6 md:px-16 flex items-center justify-between border-b ${
        scrolled
          ? 'bg-[#F4F1EE]/90 backdrop-blur-md border-black/10 shadow-xs'
          : 'bg-[#F4F1EE]/95 backdrop-blur-sm border-black/10'
      }`}
    >

      {/* Brand Logo */}
      <button
        id="header-brand-logo"
        onClick={() => {
          setActiveView('home');
          setMobileMenuOpen(false);
        }}
        className="group flex flex-row sm:flex-row sm:items-end gap-2 text-left cursor-pointer focus:outline-none"
      >
        <span className="font-serif text-2xl text-[#1C1C1C]">
          CHAJ Group
        </span>

        <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C8C8C] border border-black/10 px-2 py-1">
          {isFa ? 'گروه معماری' : 'ARCH & RESEARCH'}
        </span>
      </button>

      {/* Desktop Navigation */}
      {showNavigation && (
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center gap-8 lg:gap-10"
        >
          {navItems.map((item) => {
            const isActive =
              item.view !== 'contact' &&
              activeView === item.view;

            return (
              <button
                key={item.labelEn}
                id={`nav-item-${item.labelEn.toLowerCase()}`}
                onClick={() => handleNavClick(item.view)}
                className={`text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#1C1C1C] font-bold border-b border-[#1C1C1C] pb-0.5'
                    : 'text-[#8C8C8C] hover:text-[#1C1C1C] font-medium'
                }`}
              >
                {isFa ? item.labelFa : item.labelEn}
              </button>
            );
          })}
        </nav>
      )}

      {/* Language Switcher & Controls */}
      <div className="flex items-center gap-4">

        {/* Language Toggle */}
        <button
          id="language-toggle-btn"
          onClick={() =>
            setLanguage(language === 'EN' ? 'FA' : 'EN')
          }
          className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-black/15 hover:bg-[#1C1C1C] hover:text-[#F4F1EE] transition-all duration-200 cursor-pointer"
          title={
            isFa
              ? 'تغییر زبان به انگلیسی'
              : 'Switch to Persian'
          }
        >
          <Globe className="w-3.5 h-3.5" />

          <span>
            {language === 'EN' ? 'EN / FA' : 'FA / EN'}
          </span>
        </button>

        {/* Mobile Menu Button */}
        {showNavigation && (
          <button
            id="mobile-menu-trigger"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="md:hidden p-2 text-[#1C1C1C] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {showNavigation && mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden fixed inset-x-0 top-20 bg-[#F4F1EE] border-b border-black/10 shadow-xl px-6 py-8 flex flex-col gap-6 animate-fade-in"
        >
          {navItems.map((item) => (
            <button
              key={item.labelEn}
              onClick={() => handleNavClick(item.view)}
              className="text-left text-lg font-serif italic text-[#1C1C1C] hover:text-black py-2 border-b border-black/10 flex justify-between items-center"
            >
              <span>
                {isFa ? item.labelFa : item.labelEn}
              </span>

              <ArrowUpRight className="w-4 h-4 text-[#8C8C8C]" />
            </button>
          ))}

          <div className="pt-2 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-sans text-[#8C8C8C]">
            <span>
              {isFa
                ? 'گروه معماری چاج-مازندران/ بابلسر'
                : 'CHAJ GROUP — Mazandaran / Babolsar'}
            </span>

            <span className="font-mono">
              2024
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
