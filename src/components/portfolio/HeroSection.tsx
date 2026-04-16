import { motion } from 'framer-motion';
import RibbonCanvas from '../RibbonCanvas';

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.8, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ perspective: '600px' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 border-b border-border overflow-hidden text-center">
      <RibbonCanvas />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.68)_100%)] pointer-events-none z-[1]" />

      <div
        className="absolute inset-x-[12%] top-[14%] h-[30vh] rounded-full blur-3xl pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(255,149,61,0.16) 0%, rgba(255,149,61,0.05) 38%, transparent 74%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(120px,22vw,340px)] text-white/[0.04] whitespace-nowrap pointer-events-none select-none tracking-[0.14em] z-[1]"
      >
        KY
      </motion.div>

      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="font-mono text-[0.6rem] text-white/60 tracking-[0.2em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </motion.span>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="w-px h-[60px] bg-white/20 relative overflow-hidden origin-top"
        >
          <div className="absolute top-[-100%] left-0 w-full h-full bg-white animate-[scrollDown_1.8s_ease_infinite]" />
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.1)} className="font-mono text-[0.7rem] tracking-[0.15em] text-white/60 uppercase mb-6 z-10">
        Electronics & Telecom × Full-Stack × AI — Pune, IN
      </motion.div>

      <h1 className="font-display text-[clamp(80px,16vw,240px)] leading-[0.88] tracking-wide text-white z-10 overflow-hidden drop-shadow-[0_0_30px_rgba(0,0,0,0.35)]">
        <SplitText text="KSHITIJ" />
        <br />
        <SplitText text="YADAV" className="text-[#f59a52]" />
      </h1>

      <motion.div {...fadeUp(0.9)} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 z-10">
        <p className="font-mono text-[0.78rem] text-white/72 max-w-xs leading-relaxed italic text-center">
          Engineering intelligent systems at the intersection of hardware, software, and design. Currently @ Symbiosis Institute of Technology.
        </p>
        <motion.button
          onClick={() => scrollTo('projects')}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.12em] uppercase text-black bg-[#f3e7db] px-6 py-3 border border-white/20 cursor-pointer transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          Selected Work <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>↓</motion.span>
        </motion.button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-10" />
    </section>
  );
}
