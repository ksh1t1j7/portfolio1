import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { href: 'projects', label: 'Work' },
  { href: 'skills', label: 'Skills' },
  { href: 'about', label: 'About' },
  { href: 'contact', label: 'Contact' },
];

export default function PortfolioNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 120) {
          current = s.id;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 md:px-10 py-5 transition-all duration-300 ${
        scrolled ? 'bg-background/88 border-b border-border backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.28)]' : 'border-b border-transparent'
      }`}
    >
      <motion.button
        onClick={() => scrollTo('home')}
        whileHover={{ scale: 1.05 }}
        className="font-display text-xl tracking-wider text-foreground bg-transparent border-none cursor-pointer"
      >
        KY<span className="text-primary">.</span>
      </motion.button>

      <ul className="flex gap-8 list-none">
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <button
              onClick={() => scrollTo(l.href)}
              className={`relative font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                active === l.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.label}
              {active === l.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
