import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const contactLinks = [
  { icon: '✉', label: 'kshitij.yadav.011@gmail.com', href: 'mailto:kshitij.yadav.011@gmail.com' },
  { icon: '☎', label: '+91 76200 37546', href: 'tel:+917620037546' },
  { icon: 'in', label: 'linkedin.com/in/kshitijyadavv', href: 'https://www.linkedin.com/in/kshitijyadavv/' },
  { icon: '⌥', label: 'github.com/ksh1t1j7', href: 'https://github.com/ksh1t1j7' },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="contact" className="border-b border-border relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,149,61,0.04)_0%,rgba(10,8,7,0.55)_100%)]">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,154,82,0.12) 0%, transparent 72%)' }}
      />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-baseline px-6 md:px-10 py-5 border-b border-border"
      >
        <span className="font-mono text-[0.7rem] tracking-[0.15em] text-muted-foreground uppercase">Get In Touch</span>
        <span className="font-mono text-[0.65rem] text-muted-foreground">Let's Talk</span>
      </motion.div>
      <div
        ref={ref}
        className="px-6 md:px-10 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
      >
        <div className="font-display text-[clamp(48px,7vw,100px)] leading-[0.9] text-foreground overflow-hidden">
          {['Have an idea?', "Let's", 'it together.'].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 1 ? (
                  <>
                Let's{' '}
                    <a href="mailto:kshitij.yadav.011@gmail.com" className="text-primary no-underline hover:opacity-70 transition-opacity">
                      build
                    </a>
                  </>
                ) : (
                  line
                )}
              </motion.div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 items-start md:items-end">
          {contactLinks.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted-foreground no-underline hover:text-primary transition-colors duration-300"
            >
              <span className="text-[0.9rem]">{l.icon}</span> {l.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
