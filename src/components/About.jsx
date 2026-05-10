import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SITE_CONFIG } from '../data/siteData';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Premium Quality',
    desc: 'OEM-grade certified accessories from global brands',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Expert Installation',
    desc: 'Trained technicians with precision fitting',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Warranty Assured',
    desc: 'All products & installs fully warranted',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3L8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>
      </svg>
    ),
    title: 'Custom Solutions',
    desc: 'Tailored for your vehicle & budget',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 px-6 lg:px-14 max-w-[1700px] mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* ══════════════════════════════ */}
        {/* IMAGE STACK                   */}
        {/* ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="relative"
        >
          {/* Animated corner brackets around main image */}
          {[
            'top-0 left-0 border-t-2 border-l-2',
            'top-0 right-0 border-t-2 border-r-2',
            'bottom-0 left-0 border-b-2 border-l-2',
            'bottom-0 right-0 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.span
              key={i}
              className={`absolute w-8 h-8 border-[#C9A84C]/60 z-20 ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            />
          ))}

          {/* Main image */}
          <div className="relative overflow-hidden aspect-[4/5] max-w-md w-full">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=90"
              alt="Premium Car"
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/55 to-transparent" />

            {/* Scan line sweep on hover */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent pointer-events-none"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />
          </div>

          {/* Accent image */}
          <div className="absolute -bottom-8 -right-8 w-[55%] aspect-square overflow-hidden border-4 border-[#0A0A0A] shadow-2xl z-10">
            {/* Gold inner border */}
            <span className="absolute inset-0 border border-[#C9A84C]/20 z-10 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=85"
              alt="Car interior"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Experience badge — unchanged layout, enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -6 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 200 }}
            className="absolute -top-6 -left-6 bg-[#C9A84C] text-[#0A0A0A] p-5 text-center z-10 overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(201,168,76,0.45), 0 0 0 1px rgba(201,168,76,0.3)' }}
          >
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
            />
            <div className="font-bebas text-4xl leading-none relative z-10">4+</div>
            <div className="text-[9px] tracking-[3px] font-bold uppercase mt-1 leading-tight relative z-10">
              Years<br />Excellence
            </div>
          </motion.div>

          {/* Vertical decorative text */}
          <div
            className="absolute -right-6 top-1/2 hidden xl:block pointer-events-none"
            style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
          >
            <span className="text-[9px] tracking-[6px] text-[#C9A84C]/20 uppercase font-light">
              M2 Car Accessories — {SITE_CONFIG.city}
            </span>
          </div>

          {/* Floating gold dot particles */}
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#C9A84C] pointer-events-none"
              style={{
                width: i % 2 === 0 ? 2 : 1,
                height: i % 2 === 0 ? 2 : 1,
                left: `${15 + i * 16}%`,
                bottom: `${8 + i * 5}%`,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </motion.div>

        {/* ══════════════════════════════ */}
        {/* CONTENT                       */}
        {/* ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Eyebrow */}
          <motion.span
            className="text-[10px] tracking-[6px] text-[#C9A84C] uppercase block mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Who We Are
          </motion.span>

          {/* Heading */}
          <h2 className="font-bebas text-[clamp(40px,6vw,72px)] leading-none tracking-wider mb-2">
            ABOUT M2<br />
            <span className="text-gold-gradient">CAR ACCESSORIES</span>
          </h2>

          {/* Animated gold rule */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent mb-8"
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Description */}
          <p className="text-[#A09888] leading-relaxed mb-4 text-[15px] font-light">
            M2 Car Accessories is {SITE_CONFIG.city}'s most trusted destination for premium automotive accessories and
            customization. We blend cutting-edge technology with precision craftsmanship to transform ordinary vehicles
            into extraordinary machines.
          </p>
          <p className="text-[#6A6358] leading-relaxed mb-8 text-sm">
            Our expert team brings years of hands-on experience across all major vehicle brands. From subtle interior
            upgrades to complete exterior transformations — we deliver with uncompromising quality and warranty support.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.4)' }}
                className="bg-[#111111] border border-[#C9A84C]/10 p-4 transition-all duration-300 cursor-default group relative overflow-hidden"
              >
                {/* Hover corner accent */}
                <span className="absolute top-0 left-0 w-0 h-px bg-[#C9A84C]/60 group-hover:w-full transition-all duration-500" />
                <span className="absolute bottom-0 right-0 w-0 h-px bg-[#C9A84C]/30 group-hover:w-full transition-all duration-500" />

                {/* Icon */}
                <div className="text-[#C9A84C]/60 group-hover:text-[#C9A84C] transition-colors duration-300 mb-3">
                  {f.icon}
                </div>

                <h4 className="text-[13px] font-semibold tracking-wide text-white mb-1">{f.title}</h4>
                <p className="text-[11px] text-[#6A6358] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA — same link, enhanced */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9 }}
            whileHover={{ x: 4 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 text-[11px] tracking-[3px] uppercase text-[#C9A84C] transition-all duration-300"
          >
            <span className="border-b border-[#C9A84C]/40 group-hover:border-[#C9A84C] pb-1 transition-all duration-300">
              Get In Touch
            </span>
            <motion.span
              className="text-[#C9A84C]/50 group-hover:text-[#C9A84C] transition-colors"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}