import { motion } from 'motion/react';
import { Award, BookOpen, Calendar, MapPin, Sparkles, GraduationCap, Briefcase } from 'lucide-react';
import { educationData, experienceData } from '../data';

export default function Education() {
  return (
    <section
      id="education"
      className="py-16 md:py-24 bg-white border-b border-neutral-200/60 booklet-grain relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Decorative vertical blueprint lines - positioned relative to content container */}
        <div className="absolute inset-y-0 left-[36px] md:left-[144px] lg:left-[176px] w-[1px] bg-neutral-200 pointer-events-none"></div>
        
        {/* Page Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-blue">PAGE 04</span>
          <span className="h-[1px] w-8 bg-neutral-300"></span>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">TIMELINE</span>
        </div>

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-neutral-900 leading-tight tracking-tight">
              Aesthetic Path & Chronology
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-neutral-500 text-sm md:text-base leading-relaxed">
              My path connects professional practice with computing frameworks, specialized design credentials, and empirical user validations.
            </p>
          </div>
        </div>

        {/* Editorial Timeline Grid */}
        <div className="flex flex-col gap-12 relative">
          
          {/* Loop over professional Experience first */}
          {experienceData.map((exp, idx) => (
            <motion.div
              key={`exp-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col md:flex-row gap-6 relative pl-12 md:pl-0"
            >
              {/* Visual Circle Indicator hanging on the vertical guideline */}
              <div className="absolute left-[12px] md:left-[96px] lg:left-[128px] -translate-x-[50%] top-1 w-6 h-6 rounded-full bg-white border-2 border-accent-blue flex items-center justify-center shadow-sm z-10">
                <Briefcase className="w-3 h-3 text-accent-blue" />
              </div>

              {/* Left Block - Period Timeline Header */}
              <div className="md:w-24 lg:w-32 shrink-0 flex flex-col md:items-end items-start pr-6 lg:pr-12 md:pb-0 pb-2 text-left md:text-right">
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-blue font-bold tracking-wider bg-blue-50 py-1 px-2.5 rounded-md border border-blue-100">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
                <p className="font-mono text-[9px] text-accent-blue font-bold mt-1.5 uppercase tracking-wide">
                  {exp.duration}
                </p>
                <p className="font-mono text-[10px] text-neutral-400 mt-1 uppercase tracking-wide font-medium">
                  {exp.location}
                </p>
              </div>

              {/* Right Block - Description Box */}
              <div className="flex-1 bg-stone-50 border border-stone-200/90 rounded-2xl p-6 md:p-8 hover:border-neutral-900 hover:shadow-lg hover:shadow-neutral-100 transition-all duration-300">
                <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
                  <span className="font-mono text-[9px] text-accent-blue tracking-widest font-bold">
                    PROFESSIONAL EXPERIENCE // INTERNSHIP
                  </span>
                  <span className="text-neutral-300 text-xs hidden sm:inline">|</span>
                  <span className="font-mono text-xs text-neutral-500">{exp.company}</span>
                </div>

                <h3 className="font-display font-bold text-neutral-900 text-xl md:text-2xl mb-4 leading-tight">
                  {exp.role}
                </h3>

                <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed font-light mb-6">
                  {exp.details}
                </p>

                {/* Highlights Bullet List */}
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  <h4 className="font-mono text-[10px] text-stone-500 tracking-wider font-bold mb-3 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-accent-blue" /> ENGAGEMENT HIGHLIGHTS & OUTCOMES:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-600">
                    {exp.highlights.map((highlight, hIdx) => {
                      const [boldPart, restPart] = highlight.split(': ');
                      return (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span>
                            {restPart ? (
                              <>
                                <strong>{boldPart}</strong>: {restPart}
                              </>
                            ) : (
                              highlight
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loop over educational background next */}
          {educationData.map((edu, idx) => {
            const isCertification = edu.degree.includes('Certification') || edu.degree.includes('Course') || edu.degree.includes('Diploma');
            return (
              <motion.div
                key={`edu-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col md:flex-row gap-6 relative pl-12 md:pl-0"
              >
                {/* Visual Circle Indicator hanging on the vertical guideline */}
                <div className="absolute left-[12px] md:left-[96px] lg:left-[128px] -translate-x-[50%] top-1 w-6 h-6 rounded-full bg-white border-2 border-accent-blue flex items-center justify-center shadow-sm z-10">
                  {isCertification ? (
                    <Award className="w-3 h-3 text-accent-blue" />
                  ) : (
                    <GraduationCap className="w-3" />
                  )}
                </div>

                {/* Left Block - Period Timeline Header */}
                <div className="md:w-24 lg:w-32 shrink-0 flex flex-col md:items-end items-start pr-6 lg:pr-12 md:pb-0 pb-2 text-left md:text-right">
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 font-semibold tracking-wider bg-stone-100 py-1 px-2.5 rounded-md border border-stone-200">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  <p className="font-mono text-[10px] text-neutral-400 mt-2 uppercase tracking-wide">
                    {edu.location}
                  </p>
                </div>

                {/* Right Block - Description Box */}
                <div className="flex-1 bg-stone-50 border border-stone-200/90 rounded-2xl p-6 md:p-8 hover:border-neutral-900 hover:shadow-lg hover:shadow-neutral-100 transition-all duration-300">
                  <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
                    <span className="font-mono text-[9px] text-neutral-400 tracking-widest font-bold">
                      {isCertification ? 'PROFESSIONAL SPECIALIZATION' : 'ACADEMIC DEGREE'}
                    </span>
                    <span className="text-neutral-300 text-xs hidden sm:inline">|</span>
                    <span className="font-mono text-xs text-neutral-500">{edu.institution}</span>
                  </div>

                  <h3 className="font-display font-bold text-neutral-900 text-xl md:text-2xl mb-4 leading-tight">
                    {edu.degree}
                  </h3>

                  <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed font-light mb-6">
                    {edu.details}
                  </p>

                  {/* Highlights Bullet List to enrich booklet visual detail */}
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                    <h4 className="font-mono text-[10px] text-stone-500 tracking-wider font-bold mb-3 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-accent-blue" /> CONTEXT STRATA & KEY OUTCOMES:
                    </h4>
                    
                    {isCertification ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-600">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>Figma Component Systems</strong>: Rigorous wireframing, high fidelity UI guidelines, and variant management.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>User-Centered Research</strong>: Deep analysis of empathy mappings, user logic trees, and click benchmarks.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>Adobe XD Interactions</strong>: Dynamic micro-movements, transition layouts, page gestures.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>Heuristic Audits</strong>: Identifying navigation friction points and aligning with standard usability protocols.</span>
                        </li>
                      </ul>
                    ) : (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-600">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>Semantic Web Tech</strong>: Front-end engineering with markup systems, document modeling, and CSS styling.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>Software Lifecycle Planning</strong>: Object modeling, design patterns, and structure architectures.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>Information Systems</strong>: Database querying, normalized records, relational design logic.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0"></span>
                          <span><strong>Logical Formulations</strong>: Discrete computer mathematics, algorismic designs, flow diagnostics.</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
