import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { INSTAGRAM_POSTS, SITE_CONFIG } from '../data/siteData';

export default function Instagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="instagram"
      className="py-28 relative overflow-hidden"
      ref={ref}
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a1408 0%, #0D0D0D 55%, #080808 100%)' }}
    >
      {/* Ambient grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* Gold top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)' }} />

      {/* Soft gold radial behind header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #C9A84C12 0%, transparent 70%)' }} />

      <div className="max-w-[1700px] mx-auto px-6 lg:px-14 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '12px' }}
            animate={inView ? { opacity: 1, letterSpacing: '6px' } : {}}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="text-[10px] tracking-[6px] uppercase block mb-4"
            style={{ color: '#C9A84C' }}
          >
            Follow Our Work
          </motion.span>

          <h2 className="font-bebas text-[clamp(40px,7vw,80px)] tracking-wider leading-none mb-4">
            INSTAGRAM{' '}
            <span className="text-gold-gradient relative inline-block">
              SHOWCASE
              {/* Shimmer sweep */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,220,100,0.35) 50%, transparent 70%)',
                  backgroundSize: '200%',
                }}
                animate={inView ? { backgroundPosition: ['-100% 0', '200% 0'] } : {}}
                transition={{ duration: 1.6, delay: 0.7, ease: 'easeInOut' }}
              />
            </span>
          </h2>

          {/* Animated divider */}
          <motion.div
            className="mx-auto mb-5 h-px relative overflow-hidden"
            style={{ width: '64px' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0" style={{ background: '#C9A84C' }} />
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, #fff8e0, transparent)' }}
              animate={inView ? { x: ['-100%', '200%'] } : {}}
              transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-sm"
            style={{ color: '#6A6358' }}
          >
            Real work. Real cars. Real results.
          </motion.p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2" style={{ gridAutoRows: '200px' }}>
          {INSTAGRAM_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={`https://instagram.com/${SITE_CONFIG.instagram}`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className={`group relative overflow-hidden ${post.large ? 'row-span-2' : ''}`}
              style={{ gridRow: post.large ? 'span 2' : 'span 1' }}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)', transform: 'scale(1)' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />

              {/* Dark vignette always visible at bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 50%)' }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{ background: 'rgba(10,10,10,0.55)' }}>
                <span className="text-white text-2xl -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">📸</span>
                <span className="text-[10px] tracking-[4px] text-white/80 uppercase transition-all duration-300">{post.tag}</span>
              </div>

              {/* Tag chip bottom-left */}
              <div
                className="absolute bottom-2 left-2 text-[9px] tracking-[2px] uppercase px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                style={{
                  color: '#C9A84C',
                  background: 'rgba(10,10,10,0.70)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  boxShadow: '0 0 8px rgba(201,168,76,0.10)',
                }}
              >
                {post.tag}
              </div>

              {/* Gold glow border on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{
                  border: '1px solid rgba(201,168,76,0.55)',
                  boxShadow: 'inset 0 0 18px rgba(201,168,76,0.08)',
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
        >
          <div>
            <div
              className="text-[12px] tracking-[4px] uppercase mb-1"
              style={{ color: '#C9A84C' }}
            >
              Follow us for daily updates
            </div>
            <div className="text-sm" style={{ color: '#6A6358' }}>
              Seat covers · LED lights · Films · Audio · Exterior mods
            </div>
          </div>

          <a
            href={`https://instagram.com/${SITE_CONFIG.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-white px-7 py-3.5 text-[11px] tracking-[3px] uppercase font-bold shrink-0 relative overflow-hidden group/cta"
            style={{
              background: 'linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Shimmer on CTA */}
            <span
              className="absolute inset-0 pointer-events-none opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                backgroundSize: '200%',
                animation: 'shimmerCta 0.8s ease-in-out',
              }}
            />
            <span className="text-base relative z-10">📷</span>
            <span className="relative z-10">@{SITE_CONFIG.instagram}</span>
          </a>
        </motion.div>
      </div>

      {/* Keyframes for shimmer */}
      <style>{`
        @keyframes shimmerCta {
          from { background-position: -100% 0; }
          to   { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}