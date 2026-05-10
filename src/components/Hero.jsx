import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../data/siteData';

// Indian car hero images: Fortuner, Creta, Safari, Harrier, XUV700
const HERO_SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=2000&q=90",
    label: "Toyota Fortuner",
    accent: "Exterior Transformation",
  },
  {
    bg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=2000&q=90",
    label: "Window Films",
    accent: "3M & Llumar Protection",
  },
  {
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=90",
    label: "Interior Upgrade",
    accent: "Custom Seat Covers",
  },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, left: Math.random() * 100, delay: Math.random() * 6,
  duration: 5 + Math.random() * 5, size: Math.random() > 0.7 ? 2 : 1,
}));

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [slideIdx, setSlideIdx] = useState(0);

  // Slide auto-advance
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const slide = HERO_SLIDES[slideIdx];

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── BG SLIDESHOW ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slideIdx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ y: bgY }}
        >
          <div
            className="absolute inset-[-5%] bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.bg}')`,
              transform: `translate(${(mouse.x - 0.5) * -20}px, ${(mouse.y - 0.5) * -10}px)`,
              transition: 'transform 0.6s ease-out',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/88 to-[#0A0A0A]/10 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30 z-[1]" />

      {/* Grid */}
      <div className="absolute inset-0 z-[2] opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Scan */}
      <motion.div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent z-[3]"
        animate={{ top: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />

      {/* Particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {PARTICLES.map(p => (
          <motion.div key={p.id} className="absolute rounded-full bg-[#C9A84C]"
            style={{ left: `${p.left}%`, bottom: 0, width: p.size, height: p.size }}
            animate={{ y: [0, -1200], opacity: [0, 0.7, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }} />
        ))}
      </div>

      {/* Big background text */}
      <div className="absolute right-0 bottom-0 text-[22vw] font-bebas leading-none text-[#C9A84C]/[0.03] select-none z-[2] tracking-widest pointer-events-none">M2</div>

      {/* Slide indicator dots top-right */}
      <div className="absolute top-28 right-8 z-20 flex flex-col gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setSlideIdx(i)}
            className={`w-1 rounded-full transition-all duration-500 ${i === slideIdx ? 'h-8 bg-[#C9A84C]' : 'h-3 bg-[#C9A84C]/20 hover:bg-[#C9A84C]/40'}`} />
        ))}
      </div>

      {/* Current slide label bottom-right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slideIdx}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-16 right-8 z-20 text-right hidden lg:block"
        >
          <div className="text-[10px] tracking-[4px] text-[#C9A84C]/50 uppercase">{slide.accent}</div>
          <div className="text-[13px] tracking-[2px] text-white/40 font-light">{slide.label}</div>
        </motion.div>
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <motion.div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 lg:px-14 pt-24" style={{ y: contentY, opacity }}>

        {/* Live badge */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-3 border border-[#C9A84C]/30 bg-[#C9A84C]/05 backdrop-blur-sm px-4 py-2 mb-8">
          <motion.span className="w-2 h-2 rounded-full bg-[#C9A84C]"
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[10px] tracking-[5px] text-[#C9A84C] uppercase font-medium">
            Premium Car Accessories — {SITE_CONFIG.city}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-6 overflow-hidden">
          {['ELEVATE', 'YOUR RIDE'].map((word, wi) => (
            <motion.div key={wi}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + wi * 0.12, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
              <span
                className={`block font-bebas leading-[0.9] tracking-wider ${wi === 1
                  ? 'text-gold-gradient glitch-text text-[clamp(62px,12vw,140px)]'
                  : 'text-white text-[clamp(62px,12vw,140px)]'}`}
                data-text={word}>{word}</span>
            </motion.div>
          ))}
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="font-bebas text-[clamp(18px,3vw,44px)] tracking-[14px] text-[#A09888]/70 mt-2">WITH M2</motion.div>
        </div>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="text-[#8A8070] text-[15px] leading-relaxed max-w-lg mb-10 font-light">
          From Creta to Fortuner — premium seat covers, window films, LED lighting, Android systems & more. Trusted by 2000+ customers across Gujarat.
        </motion.p>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 mb-16">
          <button onClick={() => scrollTo('#categories')}
            className="relative overflow-hidden bg-[#C9A84C] text-[#0A0A0A] px-8 py-4 text-[11px] tracking-[3px] uppercase font-bold transition-all duration-300 hover:bg-[#E8C97A] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(201,168,76,0.4)] group">
            <span className="relative z-10 flex items-center gap-2">Explore Categories
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </span>
          </button>
          <button onClick={() => scrollTo('#appointment')}
            className="border border-[#C9A84C]/40 text-white px-8 py-4 text-[11px] tracking-[3px] uppercase font-semibold transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C] hover:-translate-y-1 hover:bg-[#C9A84C]/05">
            Book Appointment
          </button>
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi M2, I need car accessories`}
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 border border-[#25D366]/40 text-[#25D366] px-8 py-4 text-[11px] tracking-[3px] uppercase font-semibold transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/08 hover:-translate-y-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            WhatsApp Us
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
          className="flex flex-wrap gap-10 pt-8 border-t border-[#C9A84C]/12">
          {SITE_CONFIG.stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }} className="group cursor-default">
              <div className="font-bebas text-[38px] text-gold-gradient leading-none">{stat.num}</div>
              <div className="text-[10px] tracking-[4px] text-[#5A5248] uppercase mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] tracking-[6px] text-[#5A5248] uppercase">Scroll</span>
        <motion.div className="w-px bg-gradient-to-b from-[#C9A84C] to-transparent"
          animate={{ height: [0, 40, 0] }} transition={{ duration: 2.2, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}
