import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SITE_CONFIG } from '../data/siteData';

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(end.replace(/\D/g, ''));
    let start = 0;
    const step = num / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, end, duration]);

  const numStr = end.replace(/[0-9]/g, '').replace('+','');
  return <span ref={ref}>{count}{end.includes('+') ? '+' : ''}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-16 bg-[#0D0D0D] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE_CONFIG.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group relative bg-[#111111] border border-[#C9A84C]/10 p-6 text-center hover:border-[#C9A84C]/40 transition-all duration-400 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/03 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-bebas text-[42px] text-gold-gradient leading-none mb-1">
                {inView ? <CountUp end={stat.num} /> : '0'}
              </div>
              <div className="text-[10px] tracking-[4px] text-[#6A6358] uppercase">{stat.label}</div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
