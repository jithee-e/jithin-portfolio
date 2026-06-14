import { motion } from 'motion/react';
import { ArrowDown, Mail, MapPin, Sparkles, MoveRight } from 'lucide-react';
import { contactInfo } from '../data';
import profileImage from '../assets/images/jithin_profile_real_1781445948022.jpg';
export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 120 }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Scroll function specifically for CTA buttons
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
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

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-stone-50 flex items-center pt-24 pb-8 border-b border-neutral-200/60 overflow-hidden booklet-grain"
    >
      {/* Editorial Grid Backing lines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.03] select-none">
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div className="bg-gradient-to-r from-transparent to-neutral-200 h-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Block - Book/Magazine Typography Design */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Magazine Header Metadata */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-6 font-mono text-[10px] text-neutral-500 tracking-widest uppercase border-b border-neutral-200/60 pb-3 w-full"
            >
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-accent-blue" /> {contactInfo.location}
              </span>
              <span className="ml-auto text-accent-blue font-semibold">DESIGN BULLETIN</span>
            </motion.div>

            {/* Intro Greeting */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full text-accent-blue font-mono text-xs font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hello there! I’m Jithin</span>
            </motion.div>

            {/* Huge Booklet Header */}
            <motion.div variants={itemVariants} className="relative mb-6">
              <h1 className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-stone-900 leading-[0.9] tracking-tighter">
                Portfolio
              </h1>
              {/* Styled accent tagline overlapping */}
              <div className="absolute -bottom-2 right-0 md:right-8 bg-neutral-900 text-white font-mono text-[11px] tracking-widest uppercase px-3 py-1 rotate-[-2deg] rounded-sm select-none">
                UI/UX DESIGNER
              </div>
            </motion.div>

            {/* Thick accent divider */}
            <motion.div
              variants={lineVariants}
              className="h-[3px] bg-accent-blue w-28 mb-8 origin-left"
            ></motion.div>

            {/* Professional Subheading */}
            <motion.h2
              variants={itemVariants}
              className="font-display font-medium text-2xl md:text-3xl lg:text-4xl text-neutral-800 mb-6 leading-tight max-w-xl"
            >
              Creating design logic, simplified paths, and human-first aesthetics.
            </motion.h2>

            {/* Bio paragraph */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-neutral-600 text-base md:text-lg mb-10 max-w-xl leading-relaxed font-light"
            >
              A passionate UI/UX Designer focused on creating clean, user-friendly, and visually appealing digital experiences that solve complex user problems.
            </motion.p>

            {/* Clean Premium CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollToSection('#projects')}
                className="group relative inline-flex items-center justify-center bg-accent-blue text-white overflow-hidden rounded-xl px-6 py-3.5 text-sm font-mono tracking-wide font-medium shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  VIEW WORK
                  <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-neutral-900 transition-transform duration-300 ease-out"></div>
              </button>

              <button
                onClick={() => scrollToSection('#about')}
                className="group inline-flex items-center justify-center bg-white border-2 border-stone-200 hover:border-neutral-900 text-neutral-800 font-mono text-sm tracking-wide px-6 py-3.5 rounded-xl font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                ABOUT ME
              </button>

              <button
                onClick={() => scrollToSection('#contact')}
                className="group inline-flex items-center justify-center bg-transparent border border-transparent text-accent-blue hover:text-accent-blue-hover font-mono text-xs tracking-wider px-4 py-3 rounded-xl gap-1.5 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                CONTACT ME
              </button>
            </motion.div>
          </div>

          {/* Right Block - Designer Headshot Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <motion.div
              variants={itemVariants}
              className="relative w-[280px] sm:w-[320px] md:w-[360px] aspect-[4/5] bg-white border border-stone-200 rounded-2xl p-4 shadow-xl shadow-neutral-100"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-neutral-100 flex items-center bg-neutral-100">
                <img
                  src={profileImage}
                   alt="Jithin Rajan Profile Portrait"
                  className="w-full h-full object-cover object-top scale-102 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Decorative overlay grids */}
                <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-md px-2.5 py-1 text-[9px] font-mono font-medium text-neutral-800 uppercase flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  OPEN FOR PROJECTS
                </div>
              </div>

              {/* Designer Card Label in modern layout */}
              <div className="absolute sm:-bottom-6 sm:-left-6 -bottom-4 left-4 bg-white border border-neutral-200 shadow-lg px-4 sm:px-6 py-3 sm:py-4 rounded-xl max-w-[200px] sm:max-w-[240px]">
                <h3 className="font-display font-bold text-neutral-900 text-base leading-none">
                  Jithin Rajan
                </h3>
                <p className="font-mono text-[10px] text-accent-blue tracking-wider font-semibold mt-1">
                  UI/UX DESIGNER
                </p>
                <p className="font-sans text-neutral-500 text-[11px] leading-snug mt-2">
                  Specialized in modern interface systems, typography architectures, and layout design.
                </p>
              </div>

              {/* Decorative design booklet ticks */}
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-stone-300 pointer-events-none rounded-tr-md"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-stone-300 pointer-events-none rounded-br-md"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bounce indicators to prompt scroll down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none animate-bounce text-neutral-400">
        <span className="font-mono text-[8px] tracking-widest uppercase">SCROLL TO READ</span>
        <ArrowDown className="w-4 h-4 text-accent-blue" />
      </div>
    </section>
  );
}
