import { motion } from 'motion/react';
import { Award, ExternalLink, ShieldCheck, Bookmark, Sparkles } from 'lucide-react';
import { certificatesData } from '../data';

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="py-16 md:py-24 bg-stone-50 border-b border-neutral-200/60 booklet-grain relative overflow-hidden"
    >
      {/* Decorative vertical guide line */}
      <div className="absolute inset-y-0 left-12 md:left-24 lg:left-32 w-[1px] bg-neutral-200 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Page Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-blue">PAGE 05</span>
          <span className="h-[1px] w-8 bg-neutral-300"></span>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">CERTIFICATIONS</span>
        </div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-neutral-900 leading-tight tracking-tight">
              Specialized Credentials
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-neutral-500 text-sm md:text-base leading-relaxed">
              Professional validation of advanced user experience frameworks, interface mechanics, and physical-to-digital product design methodologies.
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative pl-8 md:pl-0 md:ml-12 lg:ml-24">
          {certificatesData.map((cert, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group bg-white border border-stone-200/95 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-neutral-900 hover:shadow-xl hover:shadow-neutral-100 transition-all duration-300 relative h-full"
              >
                {/* Visual indicator corner badge */}
                <div className="absolute top-4 right-4 text-stone-200 group-hover:text-accent-blue transition-colors duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div className="space-y-6">
                  {/* Category & Date Block */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-accent-blue tracking-widest font-bold uppercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                      {cert.issuer}
                    </span>
                    <span className="h-[2px] w-4 bg-neutral-200"></span>
                    <span className="font-mono text-[9px] text-neutral-400 font-semibold uppercase">
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Main Title & Issuer */}
                  <div>
                    <h3 className="font-display font-bold text-neutral-900 text-xl leading-snug group-hover:text-accent-blue transition-colors duration-300">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Description text */}
                  <p className="font-sans text-neutral-500 text-xs md:text-sm leading-relaxed font-light">
                    {cert.description}
                  </p>

                  {/* Divider line */}
                  <div className="h-[1px] bg-neutral-100/80 w-full my-4"></div>

                  {/* Acquired Skills Pills */}
                  <div>
                    <span className="font-mono text-[9px] text-stone-400 tracking-wider font-bold mb-2 block uppercase flex items-center gap-1">
                      <Bookmark className="w-3 h-3 text-neutral-400" /> ACQUIRED CAPABILITIES
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-[9px] bg-stone-50 border border-stone-200/80 text-stone-600 px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action to open Certificate link */}
                <div className="pt-8">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-stone-50 border border-stone-200/90 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 font-mono text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    VERIFY CREDENTIAL
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {cert.credentialId && (
                    <span className="block text-center font-mono text-[8.5px] text-neutral-400 mt-2 uppercase tracking-tight">
                      REG: {cert.credentialId}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic visual footnote detail */}
        <div className="mt-16 ml-8 md:ml-12 lg:ml-24 border-l-2 border-stone-200 pl-4 py-1">
          <p className="font-mono text-[9px] text-neutral-400 leading-normal uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-accent-blue" />
            SECURE AUDITS // RECORD METADATA CONTAINS ACTIVE ENCRYPTED COURSE VERIFICATION HASHES.
          </p>
        </div>
      </div>
    </section>
  );
}
