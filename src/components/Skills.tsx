import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Clipboard, Command, Award, Sparkles, Sliders } from 'lucide-react';
import { skillsData } from '../data';
import { Skill } from '../types';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'tools' | 'soft'>('all');

  const filteredSkills = skillsData.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'core': return 'UI/UX Philosophy';
      case 'tools': return 'Software & Code';
      case 'soft': return 'Foundational Soft skills';
      default: return 'All Capabilities';
    }
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-stone-50 border-b border-neutral-200/60 booklet-grain relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Page Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-blue">PAGE 03</span>
          <span className="h-[1px] w-8 bg-neutral-300"></span>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">CAPABILITIES</span>
        </div>

        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-12">
          <div className="lg:col-span-6">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-neutral-900 leading-tight tracking-tight">
              Design & Software Toolkit
            </h2>
          </div>
          <div className="lg:col-span-6 lg:text-right">
            <p className="font-sans text-neutral-500 text-sm md:text-base leading-relaxed max-w-lg lg:ml-auto">
              A balanced combination of advanced vector mapping tools, frontend web layouts, productivity platforms, and high-alignment soft skills.
            </p>
          </div>
        </div>

        {/* Booklet Selector Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-4 mb-8">
          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mr-4 flex items-center gap-1.5 font-bold">
            <Sliders className="w-3.5 h-3.5 text-accent-blue" /> FILTER BY MATRIX:
          </span>
          {(['all', 'core', 'tools', 'soft'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all border ${
                activeCategory === cat
                  ? 'bg-neutral-900 border-neutral-900 text-white font-medium shadow-sm'
                  : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
              }`}
            >
              {cat.toUpperCase()} {cat !== 'all' ? `// ${getCategoryLabel(cat)}` : ''}
            </button>
          ))}
        </div>

        {/* Dynamic Skills Booklet Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: Skill, idx) => {
              // Custom detailed bios based on Jithin's requested skills to make it look professional, not a generic bar.
              let skillDetail = "Professional industry competency and logical application standards.";
              let subLabel = "Design Foundation";
              
              if (skill.name === 'UI/UX Design') {
                skillDetail = "User empathy maps, wireframes, flowcharts, user psychology research, and interface aesthetics.";
                subLabel = "Core Competency";
              } else if (skill.name === 'Figma') {
                skillDetail = "Auto-layouts, components system libraries, interactive prototypes, variables configuration, team boards.";
                subLabel = "Primary Vector Engine";
              } else if (skill.name === 'Adobe XD') {
                skillDetail = "Slick micro-interactions overlays, vector editing layouts, and responsive state wireframes.";
                subLabel = "Vector Studio";
              } else if (skill.name === 'Wireframing') {
                skillDetail = "Establishing structural blockouts, page weights, navigation flow logic, and structural content matrices.";
                subLabel = "Information Architecture";
              } else if (skill.name === 'Prototyping') {
                skillDetail = "Connecting user paths, layout transitions, button gesture simulations, and responsive user actions.";
                subLabel = "Interactive Systems";
              } else if (skill.name === 'HTML5' || skill.name === 'CSS3' || skill.name === 'Tailwind CSS') {
                skillDetail = "Semantic layout blocks, flexbox layouts, responsive web breakpoints, custom animation styling.";
                subLabel = "Web Implementation";
              } else if (skill.name === 'MS Word' || skill.name === 'MS Excel' || skill.name === 'PowerPoint') {
                skillDetail = "Detailed design documentation booklets, business spreadsheets, presentation designs for stakeholders.";
                subLabel = "Productivity Suites";
              } else if (skill.name === 'Communication' || skill.name === 'Teamwork' || skill.name === 'Leadership' || skill.name === 'Problem Solving') {
                skillDetail = "Articulating layout decisions, collaborating in team environments, organizing designer assemblies.";
                subLabel = "Emotional Intelligence";
              }

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={skill.name}
                  className="bg-white border border-stone-200 rounded-xl p-5 hover:border-neutral-900 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Catalog Index Style */}
                    <div className="flex items-center justify-between font-mono text-[9px] mb-3">
                      <span className="text-neutral-400">SPEC_ID // {idx < 9 ? `0${idx + 1}` : idx + 1}</span>
                      <span fill="blue" className="text-accent-blue tracking-wider font-semibold uppercase bg-blue-50 px-2 py-0.5 rounded-sm">
                        {subLabel}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-neutral-900 text-lg flex items-center gap-2 mb-1">
                      {skill.name}
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0"></span>
                    </h3>
                    <p className="font-sans text-neutral-500 text-xs leading-relaxed font-light mt-2 mb-4">
                      {skillDetail}
                    </p>
                  </div>

                  {/* Level Slider Bar (Aesthetic Booklet Style) */}
                  <div className="mt-auto pt-3 border-t border-stone-100">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest">FLUENCY CALIBRATION</span>
                      <span className="font-mono text-xs text-accent-blue font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] bg-neutral-100 rounded-full overflow-hidden w-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full bg-accent-blue"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Double Line Editorial Divider */}
        <div className="mt-16 flex flex-col gap-[3px] opacity-20">
          <div className="h-[1px] bg-neutral-900 w-full"></div>
          <div className="h-[2px] bg-neutral-900 w-full"></div>
        </div>
      </div>
    </section>
  );
}
