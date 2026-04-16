import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex justify-between items-center flex-wrap gap-4 px-6 md:px-10 py-6 bg-[rgba(255,255,255,0.015)]"
    >
      <span className="font-mono text-[0.65rem] text-muted-foreground">© 2026 Kshitij Yadav. All rights reserved.</span>
      <motion.span
        whileHover={{ color: 'hsl(30, 89%, 64%)' }}
        className="font-mono text-[0.65rem] text-muted-foreground cursor-default transition-colors duration-300"
      >
        Pune, Maharashtra · India
      </motion.span>
    </motion.footer>
  );
}
