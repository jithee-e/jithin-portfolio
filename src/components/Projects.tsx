import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, Info, Eye, X, Check, Calendar, User, Briefcase, 
  Sparkles, Layers, ListTodo, Activity, Monitor, AlertCircle, HelpCircle, 
  ExternalLink, Github
} from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['all', 'Web Dashboard', 'Mobile Application', 'Creative Web Design', 'Product Strategy & UX Research'];

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-stone-50 border-b border-neutral-200/60 booklet-grain relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Page Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-blue">PAGE 06</span>
          <span className="h-[1px] w-8 bg-neutral-300"></span>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">CASE STUDIES</span>
        </div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-neutral-900 leading-tight tracking-tight">
              Selected Works
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-neutral-500 text-sm md:text-base leading-relaxed">
              Explore deep case records covering clinical software, reservation applications, and interactive booklets. Tap any case to audit the design process, mockups, and strategic guidelines.
            </p>
          </div>
        </div>

        {/* Showcase category filter menu */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-neutral-200/50 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all border ${
                activeCategory === cat
                  ? 'bg-accent-blue border-accent-blue text-white font-medium shadow-sm shadow-blue-500/10'
                  : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects 3D-Like Grid Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Deep Booklet Drawer (Slide-out Overlay) */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ==========================================================
   INTERACTIVE 3D TILT DESIGN CARD COMPONENT
   ========================================================== */
interface CardProps {
  key?: string | number;
  project: Project;
  index: number;
  onOpenDetails: () => void;
}

function ProjectCard({ project, index, onOpenDetails }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track 3D tilt coordinates based on cursor positioning
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Standard 3D card calculations
  const rotateX = coords.y * -16; // tilt limit on Y axis
  const rotateY = coords.x * 16;  // tilt limit on X axis
  const shadowX = coords.x * -20;
  const shadowY = coords.y * -20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-[1000px] flex flex-col h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onOpenDetails}
        className="group relative bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between h-full cursor-pointer transition-all duration-300 select-none overflow-hidden"
        style={{
          transform: (isHovered && typeof window !== 'undefined' && window.innerWidth >= 768) 
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          boxShadow: isHovered
            ? `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 52, 255, 0.04)`
            : '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Main Artwork area */}
        <div 
          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50 mb-5"
          style={{ transform: 'translateZ(30px)' }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out scale-102 group-hover:scale-108"
            referrerPolicy="no-referrer"
          />

          {/* Hover visual scanlines & vignette overlays */}
          <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-colors duration-400"></div>
          
          {/* Accent Action floating icon button */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-neutral-200 hover:bg-white text-neutral-900 group-hover:bg-accent-blue group-hover:border-accent-blue group-hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform scale-90 group-hover:scale-100 group-hover:rotate-[360deg]">
            <ArrowUpRight className="w-5 h-5" />
          </div>

          <div className="absolute top-3 left-3 bg-neutral-900/85 backdrop-blur-sm px-2.5 py-1 rounded-md text-[9px] font-mono font-medium tracking-widest text-white uppercase">
            {project.category}
          </div>
        </div>

        {/* Description details */}
        <div className="flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(20px)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] text-accent-blue font-bold tracking-widest uppercase">CASE FILE #{index + 1}</span>
              <span className="w-1 h-[1px] bg-neutral-300"></span>
              <span className="font-mono text-[9px] text-neutral-400 font-medium">{project.year} // {project.role.toUpperCase()}</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-neutral-900 leading-tight group-hover:text-accent-blue transition-colors">
              {project.title}
            </h3>
            
            <p className="font-sans text-neutral-500 text-xs md:text-sm leading-relaxed font-light mt-2 mb-4 group-hover:text-neutral-700 transition-colors">
              {project.subtitle}
            </p>
          </div>

          {/* Card footer metrics / tags */}
          <div className="mt-auto border-t border-stone-100 pt-3">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="font-mono text-[9px] text-neutral-500 bg-neutral-100 border border-neutral-200/50 px-2 py-0.5 rounded-md">
                  #{tag.toUpperCase()}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="font-mono text-[9px] text-neutral-400 px-1 py-0.5">
                  +{project.tags.length - 3} MORE
                </span>
              )}
            </div>

            {/* Bottom Accent Button */}
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-accent-blue group-hover:text-neutral-900 transition-colors">
              <span className="tracking-wide">VIEW CASE STUDY</span>
              <move-arrow className="inline-block translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</move-arrow>
            </div>
          </div>
        </div>

        {/* Decorative micro corners */}
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-stone-300 pointer-events-none group-hover:border-neutral-500 transition-colors"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-stone-300 pointer-events-none group-hover:border-neutral-500 transition-colors"></div>
      </div>
    </motion.div>
  );
}

/* ==========================================================
   CASE STUDY DETAIL SLIDE-OUT PANEL COMPONENT
   ========================================================== */
interface DrawerProps {
  project: Project;
  onClose: () => void;
}

function CaseStudyDrawer({ project, onClose }: DrawerProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop shadow screen overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs cursor-pointer"
      />

      {/* Slide-out Sheet Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col border-l border-neutral-200 relative booklet-grain overflow-hidden"
      >
        {/* Detail Panel Top Fixed Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-accent-blue tracking-widest font-bold">CASE MANUAL</span>
            <span className="text-neutral-300 text-xs">/</span>
            <span className="font-mono text-[10px] text-neutral-500 font-medium uppercase">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 border border-neutral-200/50 rounded-lg transition-all"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Information Deck */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Bold Header */}
          <div>
            <h1 className="font-display font-semibold text-3xl md:text-5xl text-neutral-950 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="font-display text-neutral-600 text-sm md:text-base leading-relaxed font-light mt-2 max-w-2xl border-b border-stone-100 pb-4">
              {project.subtitle}
            </p>
          </div>

          {/* Case Poster Portrait Area */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Metadata Parameters Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <User className="w-3 h-3 text-accent-blue" /> ASSIGNED ROLE
              </span>
              <p className="font-sans text-xs font-semibold text-neutral-800">{project.role}</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-accent-blue" /> ASSIGNED CLIENT
              </span>
              <p className="font-sans text-xs font-semibold text-neutral-800">{project.client || 'Personal Venture'}</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-accent-blue" /> ENGAGEMENT YEAR
              </span>
              <p className="font-sans text-xs font-semibold text-neutral-800">{project.year}</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <Activity className="w-3 h-3 text-accent-blue" /> ASSIGNED TECH
              </span>
              <p className="font-sans text-xs font-semibold text-neutral-800">{project.tags[0]} + {project.tags[1]}</p>
            </div>
          </div>

          {/* Impact Statement / Performance Metrics */}
          {project.metrics && (
            <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-xl flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-accent-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-[10px] text-accent-blue tracking-widest font-bold uppercase">OUTCOME ACCURACY & IMPACT</h4>
                <p className="font-display font-medium text-neutral-800 text-sm md:text-base mt-1">
                  {project.metrics}
                </p>
              </div>
            </div>
          )}

          {/* Project Summary Deep Dive */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-neutral-900 tracking-wider uppercase border-b border-neutral-100 pb-2">
              EXECUTIVE CONTEXT & ARCHETYPE
            </h3>
            <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Step-by-Step UX Case Study Process Stratas */}
          {project.process && (
            <div className="space-y-6">
              <h3 className="font-mono text-xs font-bold text-neutral-900 tracking-wider uppercase border-b border-neutral-100 pb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent-blue" /> STRATEGIC STEPS & LOGICAL STAGES
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.process.map((step) => (
                  <div key={step.step} className="border border-stone-200/80 p-5 rounded-xl bg-white/70 relative">
                    <span className="absolute -top-3 right-4 font-mono text-2xl font-bold text-neutral-100 italic select-none">
                      {step.step}
                    </span>
                    <h4 className="font-display font-bold text-neutral-900 text-sm mb-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutral-100/60 max-w-fit">
                      <span className="font-mono text-[9px] text-accent-blue font-bold tracking-widest">{step.step} //</span>
                      <span className="text-[11px] font-sans font-medium">{step.title}</span>
                    </h4>
                    <p className="font-sans text-neutral-500 text-xs leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Deliverables Checkbox Tree */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-neutral-900 tracking-wider uppercase border-b border-neutral-100 pb-2 flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-accent-blue" /> PROJECT DELIVERABLES CHECKLIST
            </h3>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-3 text-xs text-neutral-600 font-light bg-neutral-50/50 p-2.5 rounded-lg border border-neutral-100">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-accent-blue flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup Screen Ledgers */}
          {project.screens && (
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-neutral-900 tracking-wider uppercase border-b border-neutral-100 pb-2 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-accent-blue" /> DIGITAL ARCHITECTURE PAGES
              </h3>
              
              <ul className="space-y-2">
                {project.screens.map((screen, sidx) => (
                  <li key={screen} className="flex items-center gap-2 text-xs font-mono text-neutral-500 bg-[#FCFDFC] p-2.5 rounded-lg border border-neutral-200/50">
                    <span className="text-accent-blue font-bold">{sidx < 9 ? `0${sidx + 1}` : sidx + 1} //</span>
                    <span>{screen.toUpperCase()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Floating Warning - Local Sandbox Info */}
          <div className="text-[11px] font-mono text-neutral-400 bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-neutral-600 uppercase">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Sandboxed Interface
            </p>
            <p className="leading-relaxed">
              These details simulate Jithin's offline case study portfolios. To interact with live Figma designs or view git code repositories, refer to the global links in Jithin's official metadata contacts below.
            </p>
          </div>
        </div>

        {/* Action Bottom Tray */}
        <div className="p-6 bg-stone-50 border-t border-neutral-200 flex flex-wrap gap-3">
          {project.githubLink ? (
            <button
              onClick={() => {
                window.open(project.githubLink, '_blank', 'noreferrer');
              }}
              className="flex-1 min-w-[140px] bg-neutral-900 text-white hover:bg-neutral-800 font-mono text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              VIEW REPO
              <Github className="w-4 h-4" />
            </button>
          ) : null}

          {project.liveLink ? (
            <button
              onClick={() => {
                window.open(project.liveLink, '_blank', 'noreferrer');
              }}
              className="flex-1 min-w-[180px] bg-accent-blue text-white hover:bg-accent-blue-hover font-mono text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              LAUNCH LIVE PROTOTYPE
              <ExternalLink className="w-4 h-4" />
            </button>
          ) : null}
          
          <button
            onClick={onClose}
            className="bg-white border border-stone-200 hover:border-neutral-900 text-neutral-700 font-mono text-xs font-bold py-3 px-4 rounded-xl transition-all"
          >
            DISMISS
          </button>
        </div>
      </motion.div>
    </div>
  );
}
