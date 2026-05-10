import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BRANDS } from '../data/siteData';

function BrandCard({ brand, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      className="group relative overflow-hidden bg-[#111111] border border-[#C9A84C]/08 hover:border-[#C9A84C]/50 transition-all duration-400 cursor-default aspect-[3/2]"
      whileHover={{ y: -5, boxShadow: '0 24px 60px rgba(0,0,0,0.7)' }}
    >
      {/* Background image (blurred) — unique per brand */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-25 transition-opacity duration-500 scale-110 group-hover:scale-100 transition-transform duration-700"
        style={{ backgroundImage: `url('${brand.bgImage}')` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/70 group-hover:bg-[#0A0A0A]/50 transition-all duration-400" />

      {/* Brand color top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${brand.color}, transparent)` }}
      />
      {/* Brand color bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
        style={{ background: brand.color }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-3 gap-2">
        {/* Logo image or stylised text */}
        {brand.isLogoUrl && brand.image && !imgError ? (
          <div className="flex items-center justify-center h-10 w-full mb-1">
            <img
              src={brand.image}
              alt={brand.name}
              onError={() => setImgError(true)}
              className="max-h-9 max-w-[80%] object-contain opacity-30 group-hover:opacity-80 transition-opacity duration-300"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        ) : (
          <div
            className="font-bebas text-[22px] tracking-[4px] text-[#3A3530] group-hover:text-white transition-colors duration-300 leading-none text-center"
          >
            {brand.name}
          </div>
        )}

        {/* Category label */}
        <div className="text-[9px] tracking-[3px] text-transparent group-hover:text-[#C9A84C]/80 transition-all duration-400 uppercase font-medium text-center">
          {brand.category}
        </div>

        {/* Desc tooltip */}
        <div className="text-[10px] text-[#6A6358]/0 group-hover:text-[#6A6358] transition-all duration-400 text-center leading-tight max-w-[120px]">
          {brand.desc}
        </div>
      </div>
    </motion.div>
  );
}

export function BrandsStrip() {
  const STRIP = [...BRANDS, ...BRANDS];
  return (
    <div className="relative overflow-hidden bg-[#0D0D0D] border-y border-[#C9A84C]/08 py-4">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
      <div className="marquee-track" style={{ animationDuration: '32s' }}>
        {STRIP.map((b, i) => (
          <div key={i} className="flex items-center shrink-0 gap-8 px-5">
            <span className="font-bebas text-[16px] tracking-[4px] text-[#2A2418] hover:text-[#C9A84C] transition-colors duration-300 whitespace-nowrap">
              {b.name}
            </span>
            <span className="text-[#C9A84C]/10 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="brands" className="py-28 bg-[#0A0A0A] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[6px] text-[#C9A84C] uppercase block mb-4">Our Partners</span>
          <h2 className="font-bebas text-[clamp(40px,7vw,80px)] tracking-wider leading-none mb-4">
            BRANDS <span className="text-gold-gradient">WE USE</span>
          </h2>
          <div className="w-16 h-px bg-[#C9A84C] mx-auto mb-5" />
          <p className="text-[#6A6358] max-w-xl mx-auto text-sm leading-relaxed">
            We stock and install only certified, authentic products from these globally trusted brands
          </p>
        </motion.div>

        {/* Brand cards — 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-16">
          {BRANDS.map((brand, i) => (
            <BrandCard key={brand.name} brand={brand} index={i} />
          ))}
        </div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            { num: '16+', label: 'Partner Brands', icon: '🏆' },
            { num: '100%', label: 'Authentic Products', icon: '✅' },
            { num: 'OEM', label: 'Grade Quality', icon: '⚙️' },
            { num: 'Full', label: 'Warranty Support', icon: '🛡️' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="bg-[#111111] border border-[#C9A84C]/08 p-5 text-center hover:border-[#C9A84C]/25 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-bebas text-3xl text-gold-gradient leading-none mb-1">{item.num}</div>
              <div className="text-[10px] tracking-[3px] text-[#6A6358] uppercase">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
