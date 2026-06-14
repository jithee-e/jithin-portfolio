import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, CornerDownRight } from 'lucide-react';
import { contactInfo } from '../data';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Introduction', href: '#hero', idx: '01' },
    { label: 'Philosophy', href: '#about', idx: '02' },
    { label: 'Capabilities', href: '#skills', idx: '03' },
    { label: 'Timeline', href: '#education', idx: '04' },
    { label: 'Certifications', href: '#certificates', idx: '05' },
    { label: 'Case Studies', href: '#projects', idx: '06' },
    { label: 'Contact', href: '#contact', idx: '07' },
  ];

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getSectionTitle = (id: string) => {
    switch (id) {
      case 'hero': return '01 / INTRO';
      case 'about': return '02 / PHILOSOPHY';
      case 'skills': return '03 / CAPABILITIES';
      case 'education': return '04 / TIMELINE';
      case 'certificates': return '05 / CERTIFICATIONS';
      case 'projects': return '06 / CASE STUDIES';
      case 'contact': return '07 / CONNECT';
      default: return 'INDEX';
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-neutral-200/80 shadow-sm py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="group flex flex-col items-start justify-center"
            id="brand-logo-link"
          >
            <span className="font-display font-bold text-xl tracking-tight text-neutral-900 group-hover:text-accent-blue transition-colors leading-none" id="brand-logo-title">
              Jithin.
            </span>
            <span className="font-mono text-[9px] tracking-widest text-neutral-400 mt-1 uppercase leading-none" id="brand-logo-subtitle">
              UI/UX Portfolio
            </span>
          </a>

          {/* Center Info - Magazine/Booklet Indication */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-neutral-500 bg-neutral-100/60 border border-neutral-200/40 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></span>
            <span>CURRENT CHAPTER:</span>
            <span className="text-neutral-900 font-medium">{getSectionTitle(activeSection)}</span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleScrollTo(e, item.href)}
                      className="group relative py-1 text-xs font-mono font-medium tracking-wide flex items-baseline gap-1"
                    >
                      <span className="text-[9px] text-neutral-400 group-hover:text-accent-blue transition-colors">
                        {item.idx}
                      </span>
                      <span
                        className={`transition-colors ${
                          isActive
                            ? 'text-accent-blue font-semibold scale-102 font-sans'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="activeBullet"
                          className="absolute -bottom-1 left-3 right-0 h-[2px] bg-accent-blue rounded-full"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Accent CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="bg-accent-blue text-white hover:bg-accent-blue-hover text-xs font-mono px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm shadow-blue-500/10 transition-all font-medium hover:scale-[1.03]"
            >
              HIRE ME
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="bg-accent-blue text-white text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm shadow-blue-500/10 transition-all font-medium"
            >
              HIRE
              <ArrowRight className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Magazine Index Style) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[68px] left-0 w-full bg-white z-40 border-b border-neutral-200/60 shadow-xl py-8 px-6 flex md:hidden flex-col gap-6 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div>
              <p className="font-mono text-[10px] tracking-widest text-neutral-400 mb-3 uppercase">
                CONTENT INDEX
              </p>
              <ul className="flex flex-col gap-3">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.href)}
                        className={`flex items-center gap-3 py-1 text-base font-display font-medium border-b border-neutral-100 transition-colors ${
                          isActive ? 'text-accent-blue border-neutral-200' : 'text-neutral-700 hover:text-neutral-900'
                        }`}
                      >
                        <span className="font-mono text-xs text-neutral-400">{item.idx}</span>
                        {item.label}
                        {isActive && <CornerDownRight className="w-4 h-4 ml-auto text-accent-blue" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex flex-col gap-2">
              <span className="font-mono text-[9px] text-neutral-400 tracking-wider">OFFICIAL CONTACT</span>
              <span className="text-sm font-medium text-neutral-800">{contactInfo.email}</span>
              <span className="text-xs text-neutral-500 font-mono">{contactInfo.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
