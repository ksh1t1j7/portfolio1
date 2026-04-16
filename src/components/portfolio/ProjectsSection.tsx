import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Project {
  num: string;
  category: string;
  categoryColor: string;
  title: string;
  desc: string;
  tags: string[];
}

const projects: Project[] = [
  {
    num: '01 / 04',
    category: 'AI · Healthcare',
    categoryColor: 'bg-primary/18 text-primary border border-primary/35',
    title: 'HealthFirst Diagnostics',
    desc: 'Predictive model for Diabetic Retinopathy detection using FFNN and Random Forest architectures on clinical data. Built a full web-based diagnostic interface for risk assessment.',
    tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Random Forest', 'React.js'],
  },
  {
    num: '02 / 04',
    category: 'Web · B2B',
    categoryColor: 'bg-[#3a2619] text-[#f3c89c] border border-[#6a4526]',
    title: 'Semco RP Digital Platform',
    desc: 'Engineered a responsive corporate website for an industrial process engineering startup to facilitate B2B market entry. Integrated complex engineering specs into a clean digital interface.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'REST API'],
  },
  {
    num: '03 / 04',
    category: 'Embedded · IoT',
    categoryColor: 'bg-[#3a1f16] text-[#f0a17a] border border-[#6b3a28]',
    title: '8051 Security System',
    desc: 'Designed and prototyped an 8-bit microcontroller-based security alarm using a magnetic reed switch and buzzer. Developed firmware for real-time sensor triggering with low-latency response.',
    tags: ['Embedded C', 'Assembly', '8051 MCU', 'Firmware'],
  },
  {
    num: '04 / 04',
    category: 'Branding · Design',
    categoryColor: 'bg-[#221914] text-[#e8d8c8] border border-[#4e3a2d]',
    title: 'Semco RP Identity',
    desc: 'Conceptualized a unified professional identity including a 9-page technical brochure for evaporation technologies. Translated complex engineering workflows into B2B visual assets.',
    tags: ['Visual Design', 'Branding', 'Technical Docs', 'B2B'],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative border-b border-border p-8 md:px-10 md:py-8 cursor-pointer transition-all duration-500 hover:bg-[rgba(255,157,79,0.05)] ${
        index % 2 === 0 ? 'md:border-r' : ''
      }`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,154,82,0.1), transparent 42%)',
        }}
      />

      <motion.div
        className="font-mono text-[0.65rem] text-muted-foreground tracking-[0.1em] mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
      >
        {project.num}
      </motion.div>

      <span className={`inline-block font-mono text-[0.6rem] tracking-[0.15em] uppercase px-2.5 py-1 mb-4 ${project.categoryColor}`}>
        {project.category}
      </span>

      <h2 className="font-display text-[clamp(28px,3vw,44px)] leading-[1.05] mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
        {project.title}
      </h2>

      <p className="text-[0.85rem] text-muted-foreground leading-relaxed mb-6">
        {project.desc}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.12 + 0.3 + i * 0.05 }}
            className="font-mono text-[0.6rem] tracking-wider text-muted-foreground border border-border bg-background/30 px-2 py-0.5 transition-all duration-300 hover:border-primary hover:text-primary"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="absolute bottom-8 right-10 text-2xl text-primary"
        initial={{ opacity: 0, x: -10, y: 10 }}
        animate={hovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        ↗
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="border-b border-border bg-[linear-gradient(180deg,rgba(255,149,61,0.03)_0%,rgba(0,0,0,0)_25%)]">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, x: -30 }}
        animate={headerInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-baseline px-6 md:px-10 py-5 border-b border-border"
      >
        <span className="font-mono text-[0.7rem] tracking-[0.15em] text-muted-foreground uppercase">Selected Works</span>
        <span className="font-mono text-[0.65rem] text-muted-foreground">04 Projects</span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
