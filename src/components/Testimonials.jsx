import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../data/siteData';

function Stars({ rating, size = 'text-sm' }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`${size} ${i <= rating ? 'text-[#C9A84C]' : 'text-[#2A2A2A]'}`}>★</span>
      ))}
    </div>
  );
}

function Avatar({ initials }) {
  const colors = ['from-[#C9A84C] to-[#7A5C1E]','from-[#7B2FBE] to-[#4A1A80]','from-[#E31837] to-[#8A0010]','from-[#1A5E9A] to-[#0A2A50]','from-[#2A7A2A] to-[#0F3A0F]','from-[#B45309] to-[#78350F]'];
  const idx = initials.charCodeAt(0) % colors.length;
  return (
    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${colors[idx]} flex items-center justify-center font-bebas text-white text-[15px] flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState('All');
  const [direction, setDirection] = useState(1);

  const services = ['All', ...Array.from(new Set(TESTIMONIALS.map(t => t.service.split('+')[0].trim())))];
  const filtered = filter === 'All' ? TESTIMONIALS : TESTIMONIALS.filter(t => t.service.includes(filter));

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrent(((idx % filtered.length) + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next, paused]);

  // Reset index when filter changes
  useEffect(() => setCurrent(0), [filter]);

  const avg = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);
  const ratingCounts = [5,4,3,2,1].map(r => ({
    star: r,
    count: TESTIMONIALS.filter(t => t.rating === r).length,
    pct: Math.round(TESTIMONIALS.filter(t => t.rating === r).length / TESTIMONIALS.length * 100),
  }));

  const slides = [-1,0,1].map(offset => {
    const idx = ((current + offset) % filtered.length + filtered.length) % filtered.length;
    return { ...filtered[idx], offset };
  });

  const variants = {
    enter: (dir) => ({ opacity:0, x: dir > 0 ? 80 : -80, scale:0.95 }),
    center: { opacity:1, x:0, scale:1 },
    exit: (dir) => ({ opacity:0, x: dir > 0 ? -80 : 80, scale:0.95 }),
  };

  return (
    <section id="testimonials" className="py-20 bg-[#0D0D0D] relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C9A84C]/02 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-4 lg:px-14">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-12">
          <span className="text-[10px] tracking-[6px] text-[#C9A84C] uppercase block mb-3">What Clients Say</span>
          <h2 className="font-bebas text-[clamp(36px,7vw,72px)] tracking-wider leading-none mb-3">
            CUSTOMER <span className="text-gold-gradient">REVIEWS</span>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto" />
        </motion.div>

        {/* Rating Overview */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2 }}
          className="grid lg:grid-cols-[240px_1fr] gap-4 mb-10">
          {/* Big rating */}
          <div className="bg-[#111111] border border-[#C9A84C]/15 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-bebas text-[64px] text-gold-gradient leading-none mb-1">{avg}</div>
            <Stars rating={5} size="text-lg" />
            <div className="text-[10px] tracking-[3px] text-[#6A6358] uppercase mt-2">{TESTIMONIALS.length} Reviews</div>
            <div className="flex items-center gap-1.5 mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#4285F4] flex-shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="text-[10px] text-[#4285F4]">Google Reviews</span>
            </div>
          </div>
          {/* Bars + filter */}
          <div className="bg-[#111111] border border-[#C9A84C]/15 p-5">
            <div className="flex flex-col gap-2 mb-4">
              {ratingCounts.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[11px] text-[#C9A84C] w-3 text-right font-semibold">{star}</span>
                  <span className="text-[#C9A84C] text-[10px]">★</span>
                  <div className="flex-1 h-1.5 bg-[#1A1A1A] overflow-hidden">
                    <motion.div initial={{ width:0 }} animate={inView?{width:`${pct}%`}:{}} transition={{ delay:0.5+(5-star)*0.1, duration:0.9 }}
                      className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A]" />
                  </div>
                  <span className="text-[10px] text-[#6A6358] w-4">{count}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#C9A84C]/08 pt-3">
              <div className="text-[9px] tracking-[3px] text-[#6A6358] uppercase mb-2">Filter by service</div>
              <div className="flex flex-wrap gap-1.5">
                {services.slice(0,5).map(s => (
                  <button key={s} onClick={() => setFilter(s)}
                    className={`text-[9px] tracking-[2px] uppercase px-3 py-1.5 border transition-all duration-300 active:scale-95 ${
                      filter === s ? 'bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]' : 'text-[#6A6358] border-[#C9A84C]/12 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]'
                    }`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Main card */}
          <div className="relative overflow-hidden min-h-[260px] mb-5">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${filter}-${current}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration:0.4, ease:[0.23,1,0.32,1] }}
                className="bg-[#111111] border border-[#C9A84C]/25 p-6 lg:p-8 relative shadow-[0_0_40px_rgba(201,168,76,0.08)]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
                {/* Quote */}
                <div className="font-bebas text-[70px] text-[#C9A84C]/10 leading-none -mb-4 select-none">"</div>
                <p className="text-[#8A8070] text-[14px] lg:text-[15px] leading-relaxed mb-6 font-light max-w-3xl">
                  "{filtered[current]?.text}"
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={filtered[current]?.initials || 'M2'} />
                    <div>
                      <div className="font-semibold text-[14px] text-white tracking-wide flex items-center gap-2">
                        {filtered[current]?.name}
                        {filtered[current]?.verified && (
                          <span className="text-[9px] tracking-[2px] text-[#00C896] bg-[#00C896]/08 border border-[#00C896]/20 px-1.5 py-0.5 uppercase">✓ Verified</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#C9A84C]/70">{filtered[current]?.vehicle} • {filtered[current]?.city}</div>
                      <Stars rating={filtered[current]?.rating || 5} size="text-[12px]" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] tracking-[3px] text-[#C9A84C]/50 uppercase bg-[#C9A84C]/05 border border-[#C9A84C]/10 px-2.5 py-1">{filtered[current]?.service}</div>
                    <div className="text-[10px] text-[#3A3530] mt-1">{filtered[current]?.date}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail row */}
          <div className="hidden md:flex gap-3 mb-5 overflow-x-auto pb-1">
            {filtered.map((t, i) => (
              <button key={t.id} onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`flex-shrink-0 flex items-center gap-2.5 p-3 border transition-all duration-300 text-left min-w-[180px] ${
                  i === current ? 'border-[#C9A84C]/50 bg-[#151515]' : 'border-[#C9A84C]/08 bg-[#0E0E0E] hover:border-[#C9A84C]/25'
                }`}>
                <Avatar initials={t.initials} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-white font-medium truncate">{t.name}</div>
                  <div className="text-[10px] text-[#6A6358] truncate">{t.vehicle}</div>
                </div>
                {i === current && <div className="w-1 h-6 bg-[#C9A84C] flex-shrink-0 ml-1" />}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all active:scale-90">←</button>
              <button onClick={next} className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all active:scale-90">→</button>
            </div>
            <div className="flex gap-2 items-center">
              {filtered.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)}
                  className={`transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-[#C9A84C]' : 'w-1.5 h-1.5 rounded-full bg-[#C9A84C]/20 hover:bg-[#C9A84C]/40'}`} />
              ))}
            </div>
            <div className="text-[10px] text-[#3A3530] tracking-[2px]">{current + 1} / {filtered.length}</div>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.8 }} className="text-center mt-8">
          <a href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 border border-[#C9A84C]/25 px-6 py-3.5 text-[11px] tracking-[4px] text-[#C9A84C] uppercase font-semibold hover:bg-[#C9A84C]/06 hover:border-[#C9A84C]/60 transition-all duration-300 group">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#4285F4]"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Write a Google Review <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
