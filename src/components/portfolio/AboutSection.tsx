import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const education = [
  { degree: 'B.Tech — Electronics & Telecommunication', school: 'Symbiosis Institute of Technology, Pune', year: '2023 → 2027' },
  { degree: 'XI & XII — Science', school: 'Aditya English Medium School, Pune', year: '2021 → 2023' },
  { degree: 'X — CBSE', school: 'Euro International School, Pune', year: '2017 → 2021' },
];

const certs = [
  'Cisco CCNA — Computer Networks',
  'Udemy — Full Stack Web Dev Bootcamp',
  'Skill India — Computer Architecture',
  'MATLAB — Digital Image Processing',
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="about" className="border-b border-border bg-[linear-gradient(180deg,rgba(255,150,80,0.02)_0%,rgba(255,150,80,0.04)_100%)]">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-baseline px-6 md:px-10 py-5 border-b border-border"
      >
        <span className="font-mono text-[0.7rem] tracking-[0.15em] text-muted-foreground uppercase">About Me</span>
        <span className="font-mono text-[0.65rem] text-muted-foreground">Background</span>
      </motion.div>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 md:p-10 md:border-r border-border"
        >
          <h2 className="font-display text-[clamp(48px,5vw,80px)] leading-[0.95] mb-8 text-foreground overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Building what
            </motion.span>
            <br />
            <motion.span
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              others
            </motion.span>
            <br />
            <motion.span
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-primary"
            >
              imagine.
            </motion.span>
          </h2>
          <div className="text-[0.9rem] text-muted-foreground leading-relaxed space-y-4 max-w-[420px]">
            {[
              "I'm Kshitij — a 3rd-year Electronics & Telecommunication student at Symbiosis Institute of Technology, Pune, passionate about bridging the gap between hardware intelligence and modern software.",
              "From writing firmware for microcontrollers to training neural networks for medical diagnostics, I thrive at the intersection of embedded systems, AI, and full-stack development.",
              "Currently contributing to Next Gen Communication Club researching 5G/6G architectures, and competing in hackathons to sharpen my problem-solving edge.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 md:p-10 flex flex-col justify-between bg-[rgba(255,255,255,0.015)]"
        >
          <div>
            <div className="font-mono text-[0.65rem] text-muted-foreground tracking-[0.15em] uppercase mb-4">Education</div>
            {education.map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="py-3 border-b border-border last:border-b-0 group"
              >
                <div className="font-mono text-[0.75rem] text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">{e.degree}</div>
                <div className="text-[0.8rem] text-muted-foreground">{e.school}</div>
                <div className="font-mono text-[0.65rem] text-primary mt-1">{e.year}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <div className="font-mono text-[0.65rem] text-muted-foreground tracking-[0.15em] uppercase mb-4">Certifications</div>
            <div className="flex flex-col gap-2">
              {certs.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="font-mono text-[0.7rem] text-muted-foreground flex items-center gap-2 cursor-default transition-colors duration-200 hover:text-foreground"
                >
                  <span className="text-primary">→</span> {c}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
