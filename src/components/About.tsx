import { motion } from 'motion/react';
import { Eye, Figma, Layers, Compass, ClipboardList, PenTool, CheckCircle, Award } from 'lucide-react';
import { contactInfo } from '../data';

export default function About() {
  const corePhilosophies = [
    {
      icon: <Layers className="w-5 h-5 text-accent-blue" />,
      title: 'Structured Wireframing',
      desc: 'Form follows function. I map core user flows with extensive low & high-fidelity wireframes in Figma to ensure logical information hierarchies before committing to aesthetics.'
    },
    {
      icon: <Figma className="w-5 h-5 text-accent-blue" />,
      title: 'Precision Prototyping',
      desc: 'Interactive micro-transitions are critical. Utilizing Figma and Adobe XD, I script seamless motion prototypes that mimic production behavior for crystal-clear client feedback.'
    },
    {
      icon: <Compass className="w-5 h-5 text-accent-blue" />,
      title: 'User-Centered Focus',
      desc: 'Empathy-driven design is the standard. I put myself in the user\'s shoes, considering user psychology, cognitive load, and accessibility standards to build interfaces everyone can navigate.'
    }
  ];

  const designStats = [
    { label: 'Primary Tool', value: 'Figma' },
    { label: 'Work Philosophy', value: 'User-First' },
    { label: 'Secondary Tool', value: 'Adobe XD' },
    { label: 'Location Base', value: 'Kerala, India' }
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-white border-b border-neutral-200/60 booklet-grain relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-blue">PAGE 02</span>
          <span className="h-[1px] w-8 bg-neutral-300"></span>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">ABOUT JITHIN</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Large Typography Statement */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-neutral-900 leading-tight tracking-tight mb-6">
              Visualizing digital products, crafted elegantly.
            </h2>
            
            {/* Soft designer callout box */}
            <div className="bg-neutral-50 border border-neutral-200/60 p-6 rounded-xl flex items-start gap-4">
              <Eye className="w-8 h-8 text-accent-blue shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-bold text-neutral-900 text-sm">DESIGN CRITERIA</h4>
                <p className="font-sans text-neutral-600 text-xs mt-1 leading-relaxed">
                  For Jithin, design is not merely decoration. It is an intentional layout system of space, weight, and communication that enables digital experiences to feel organic.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Deep Biography Detail */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <p className="font-sans text-neutral-700 text-base md:text-lg leading-relaxed mb-6">
                Based out of <strong className="text-neutral-900 font-semibold">{contactInfo.location}</strong>, I specialize in crafting UI/UX solutions that connect user needs with corporate objectives. My expertise covers the complete product cycle, from wireframes and information architecture maps to high-fidelity interface layouts and polished prototypes.
              </p>
              <p className="font-sans text-neutral-600 text-base leading-relaxed font-light">
                Leveraging software tools like <strong className="text-neutral-900 font-medium">Figma</strong> and <strong className="text-neutral-900 font-medium">Adobe XD</strong>, I develop dynamic mockups and extensive design guidelines. I implement layouts prioritizing typography pairing, solid brand alignments, and responsive grid layouts, assuring desktop and mobile users enjoy premium visual consistency.
              </p>
            </div>

            {/* Quick Design Stats Booklet Panel */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-neutral-50/60 border border-neutral-200/40 p-4 rounded-xl">
              {designStats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">{stat.label}</span>
                  <span className="font-display font-medium text-sm text-neutral-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Divider with Label */}
        <div className="my-16 h-[1px] bg-neutral-200 relative w-full">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
            CORE DESIGN PHILOSOPHIES
          </span>
        </div>

        {/* Philosophies Tri-folding grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {corePhilosophies.map((phil, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white border border-stone-200 p-6 rounded-xl hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-4">
                {phil.icon}
              </div>
              <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">
                {phil.title}
              </h3>
              <p className="font-sans text-neutral-600 text-sm leading-relaxed font-light">
                {phil.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
