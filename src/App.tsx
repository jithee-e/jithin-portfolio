import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, Sparkles, MapPin, Eye, MousePointerClick, 
  HelpCircle, ExternalLink, Github, Mail, Linkedin
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { contactInfo } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [customCursor, setCustomCursor] = useState({ x: 0, y: 0 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [enableCursorEffect, setEnableCursorEffect] = useState(false);

  // Monitor grid scroll sections
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'education', 'certificates', 'projects', 'contact'];
    
    const handleScroll = () => {
      // Back to top button triggers
      setShowScrollTop(window.scrollY > 400);

      const scrollPosition = window.scrollY + 200; // Offset checking

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor coordinate indicators for mouse tracking custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCustomCursor({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOverClickable = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, select, input, textarea, [onClick], [role="button"]');
      setIsHoveringClickable(!!isClickable);
    };

    // Only engage custom cursor if viewport is large desktop (no touch)
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setEnableCursorEffect(true);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOverClickable);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOverClickable);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-stone-50 font-sans selection:bg-blue-100 selection:text-accent-blue overflow-x-hidden booklet-grain">
      
      {/* Dynamic Aesthetic Booklet Grid Backing line coordinates - Swiss Style */}
      <div className="fixed top-0 bottom-0 left-6 md:left-12 lg:left-24 w-[1px] bg-neutral-200/40 pointer-events-none z-30"></div>
      <div className="fixed top-0 bottom-0 right-6 md:right-12 lg:right-24 w-[1px] bg-neutral-200/40 pointer-events-none z-30"></div>

      {/* Modern custom organic mouse cursor */}
      {enableCursorEffect && (
        <motion.div
          className="fixed w-4 h-4 rounded-full pointer-events-none z-50 bg-accent-blue/15 mix-blend-difference hidden lg:block"
          animate={{
            x: customCursor.x - 8,
            y: customCursor.y - 8,
            scale: isHoveringClickable ? 2.5 : 1,
            backgroundColor: isHoveringClickable ? 'rgba(218, 94, 58, 0.4)' : 'rgba(218, 94, 58, 0.15)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.2 }}
        />
      )}

      {/* Sticky Header Navs Compilation */}
      <Navbar activeSection={activeSection} />

      {/* Sections Assemblies */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certificates />
        <Projects />
        <Contact />
      </main>

      {/* Clean Booklet Publisher Footer */}
      <footer className="bg-neutral-100 border-t border-neutral-200/80 py-16 px-6 md:px-12 relative z-20 booklet-grain">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline">
          
          {/* Brand/Identity column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display font-bold text-2xl tracking-tighter text-neutral-900 block hover:text-accent-blue transition-colors">
              Jithin Rajan.
            </span>
            <p className="font-sans text-neutral-500 font-light text-xs leading-relaxed max-w-sm">
              An elegant design-booklet styled personal portfolio detailing standard administrative, healthcare and appointment booking systems, wireframes, and strategic UX case studies.
            </p>
            <div className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
              REVISION // JUNE 2026 RELEASE V1.2
            </div>
          </div>

          {/* Chapters indices map column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-[10px] text-neutral-400 tracking-wider font-bold uppercase border-b border-neutral-200/60 pb-1 max-w-xs">
              DOCUMENT INDEX MAP
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#hero" className="font-mono text-neutral-600 hover:text-accent-blue transition-colors">01 // INTRO</a>
              <a href="#about" className="font-mono text-neutral-600 hover:text-accent-blue transition-colors">02 // PHILOSOPHY</a>
              <a href="#skills" className="font-mono text-neutral-600 hover:text-accent-blue transition-colors">03 // CAPABILITIES</a>
              <a href="#education" className="font-mono text-neutral-600 hover:text-accent-blue transition-colors">04 // TIMELINE</a>
              <a href="#certificates" className="font-mono text-neutral-600 hover:text-accent-blue transition-colors">05 // CERTIFICATIONS</a>
              <a href="#projects" className="font-mono text-neutral-600 hover:text-accent-blue transition-colors">06 // CASE ARCHIVE</a>
              <a href="#contact" className="font-mono text-neutral-600 hover:text-accent-blue transition-colors">07 // CONNECT</a>
            </div>
          </div>

          {/* Meta/License statement */}
          <div className="md:col-span-4 space-y-4 text-left md:text-right">
            <div className="flex gap-4 md:justify-end text-neutral-600">
              <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-colors" title="LinkedIn Profile">
                <Linkedin className="w-5 h-5 bg-stone-50 border border-stone-200 p-1.5 rounded-lg hover:scale-105 transition-all w-8 h-8" />
              </a>
              <a href={contactInfo.github} target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-colors" title="GitHub Workspace">
                <Github className="w-5 h-5 bg-stone-50 border border-stone-200 p-1.5 rounded-lg hover:scale-105 transition-all w-8 h-8" />
              </a>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-accent-blue transition-colors" title="Direct Email">
                <Mail className="w-5 h-5 bg-stone-50 border border-stone-200 p-1.5 rounded-lg hover:scale-105 transition-all w-8 h-8" />
              </a>
            </div>
            
            <p className="font-mono text-[10px] text-neutral-400">
              © 2026 JITHIN RAJAN. ALL MANUSCRIPTS PROTECTED.
            </p>
            <p className="font-sans text-[10px] text-neutral-400 font-light">
              Crafted in Kerala. Built with React, Tailwind CSS, & Framer Motion.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Scroll back to peak button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-white border border-stone-300 hover:border-neutral-900 text-neutral-800 hover:text-accent-blue w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:shadow-neutral-300 pointer-events-auto transition-all cursor-pointer"
            title="Scroll To Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
