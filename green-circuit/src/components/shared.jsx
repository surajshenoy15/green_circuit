import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const W = 'max-w-[1100px] mx-auto px-5';

export function Stagger({ children, className = '' }) {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin: '-40px' });
  return (
    <motion.div ref={r} initial="hidden" animate={v ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className={className}>
      {children}
    </motion.div>
  );
}

export function Fade({ children, d = 0, className = '' }) {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin: '-50px' });
  return (
    <motion.div ref={r} initial={{ opacity: 0, y: 24 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: d, duration: 0.45, ease: [.25, .1, .25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function Head({ ey, ti, dark, sub }) {
  return (
    <div className="text-center mb-12">
      <p className={`text-[10px] font-bold uppercase tracking-[0.25em] mb-2 ${dark ? 'text-g400' : 'text-g600'}`}>{ey}</p>
      <h2 className={`font-head text-[clamp(2.2rem,5vw,3.5rem)] leading-none tracking-wide ${dark ? 'text-white' : 'text-gray-900'}`}>{ti}</h2>
      {sub && <p className={`text-xs mt-3 max-w-sm mx-auto ${dark ? 'text-white/30' : 'text-gray-400'}`}>{sub}</p>}
      <div className={`w-8 h-[2px] rounded-full mx-auto mt-4 ${dark ? 'bg-g400' : 'bg-g600'}`} />
    </div>
  );
}
