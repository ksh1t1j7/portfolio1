import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillRows = [
  { label: 'Languages', skills: ['Python', 'Java', 'JavaScript', 'C / C++', 'Embedded C', 'Assembly', 'MATLAB', 'SQL', 'HTML5 / CSS3'] },
  { label: 'Frameworks', skills: ['React.js', 'Node.js', 'Express.js', 'TensorFlow', 'Keras', 'Scikit-learn', 'NumPy / Pandas', 'Bootstrap'] },
  { label: 'Technologies', skills: ['Git', 'PostgreSQL', 'REST APIs', 'Docker', 'EasyOCR', 'Matplotlib'] },
  { label: 'Domains', skills: ['Machine Learning', 'Signal Processing', '5G / 6G Research', 'Image Processing', 'Computer Networks', 'Full-Stack Dev'] },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="skills" className="border-b border-border bg-[rgba(255,255,255,0.01)]">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-baseline px-6 md:px-10 py-5 border-b border-border"
      >
        <span className="font-mono text-[0.7rem] tracking-[0.15em] text-muted-foreground uppercase">Technical Skills</span>
        <span className="font-mono text-[0.65rem] text-muted-foreground">Stack</span>
      </motion.div>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="px-6 md:px-10 py-10"
      >
        {skillRows.map((row, rowIdx) => (
          <motion.div
            key={row.label}
            variants={rowVariants}
            className="flex items-baseline gap-8 py-4 border-b border-border last:border-b-0 flex-wrap"
          >
            <span className="font-mono text-[0.65rem] text-muted-foreground tracking-[0.1em] uppercase min-w-[130px] shrink-0">
              {row.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {row.skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: rowIdx * 0.1 + i * 0.03 }}
                  whileHover={{ scale: 1.08, borderColor: 'hsl(30, 89%, 64%)' }}
                  className="font-mono text-[0.7rem] text-foreground border border-border bg-[rgba(255,255,255,0.02)] px-3 py-1 transition-colors duration-200 cursor-default hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
