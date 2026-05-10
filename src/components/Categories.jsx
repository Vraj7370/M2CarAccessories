import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CATEGORIES, SITE_CONFIG } from '../data/siteData';

function TiltCard({ cat, index, isExpanded, onToggle }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`;
    const shine = card.querySelector('.card-shine');
    if (shine) shine.style.background = `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(201,168,76,0.12), transparent 70%)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = '';
      const shine = card.querySelector('.card-shine');
      if (shine) shine.style.background = 'transparent';
    }
  };

  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease:[0.23,1,0.32,1] }}
      layout
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onToggle}
        className={`group relative overflow-hidden cursor-pointer bg-[#111111] border transition-all duration-300 ${
          isExpanded
            ? 'border-[#C9A84C]/60 shadow-[0_0_30px_rgba(201,168,76,0.12)]'
            : 'border-[#C9A84C]/10 hover:border-[#C9A84C]/35'
        }`}
        style={{ transition: 'transform 0.2s ease, border-color 0.3s, box-shadow 0.3s' }}
      >
        <div className="card-shine absolute inset-0 z-10 pointer-events-none transition-all duration-200" />

        <div className="relative h-44 sm:h-48 overflow-hidden">
          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
          <div className="absolute top-3 left-3 w-9 h-9 bg-[#C9A84C] flex items-center justify-center text-lg z-10">{cat.icon}</div>
          <div className={`absolute top-3 right-3 w-8 h-8 border flex items-center justify-center z-10 transition-all duration-300 text-sm font-bold ${
            isExpanded ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A]' : 'border-[#C9A84C]/50 text-[#C9A84C]'
          }`}>
            {isExpanded ? '✕' : '+'}
          </div>
        </div>

        <div className="p-4 relative z-10">
          <h3 className="font-rajdhani text-[16px] font-semibold tracking-wide text-white mb-1">{cat.name}</h3>
          <div className="text-[9px] tracking-[4px] text-[#C9A84C] uppercase mb-2">{cat.count} Products</div>
          <div className="flex flex-wrap gap-1">
            {cat.items.slice(0, 3).map((item, i) => (
              <span key={i} className="text-[9px] text-[#6A6358] border border-[#C9A84C]/10 px-1.5 py-0.5">{item}</span>
            ))}
            <span className="text-[9px] text-[#C9A84C]/50 border border-[#C9A84C]/10 px-1.5 py-0.5">+{cat.items.length - 3} more</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
}

export default function Categories() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filters = [{ id:'all', label:'All' }, ...CATEGORIES.map(c => ({ id:c.id, label:c.name.split(' ')[0] }))];
  const filtered = activeFilter === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === activeFilter);

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  return (
    <section id="categories" className="py-20 bg-[#0D0D0D] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="max-w-[1700px] mx-auto px-4 lg:px-14">

        <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-10">
          <span className="text-[10px] tracking-[6px] text-[#C9A84C] uppercase block mb-3">What We Offer</span>
          <h2 className="font-bebas text-[clamp(36px,7vw,72px)] tracking-wider leading-none mb-3">
            ACCESSORY <span className="text-gold-gradient">CATEGORIES</span>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto mb-4" />
          <p className="text-[#6A6358] max-w-md mx-auto text-sm">Tap a category to see all products inside it.</p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map(f => (
            <button key={f.id} onClick={() => { setActiveFilter(f.id); setExpanded(null); }}
              className={`text-[10px] tracking-[3px] uppercase px-4 py-2 border transition-all duration-300 font-semibold active:scale-95 ${
                activeFilter === f.id ? 'bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]' : 'text-[#A09888] border-[#C9A84C]/15 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]'
              }`}>
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((cat, i) => (
              <TiltCard key={cat.id} cat={cat} index={i} isExpanded={expanded === cat.id} onToggle={() => toggle(cat.id)} />
            ))}
          </AnimatePresence>
        </div>

        {/* Expandable dropdown panel */}
        <AnimatePresence>
          {expanded && (() => {
            const cat = CATEGORIES.find(c => c.id === expanded);
            if (!cat) return null;
            return (
              <motion.div
                key={expanded}
                initial={{ opacity:0, height:0 }}
                animate={{ opacity:1, height:'auto' }}
                exit={{ opacity:0, height:0 }}
                transition={{ duration:0.45, ease:[0.23,1,0.32,1] }}
                className="overflow-hidden mt-4"
              >
                <div className="bg-[#111111] border border-[#C9A84C]/30 p-5 lg:p-7 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                  <div className="flex items-center justify-between mb-5 gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-[#C9A84C] flex items-center justify-center text-2xl flex-shrink-0">{cat.icon}</div>
                      <div>
                        <h3 className="font-bebas text-xl tracking-wider text-white">{cat.name}</h3>
                        <div className="text-[9px] tracking-[4px] text-[#C9A84C] uppercase">{cat.count} Products Available</div>
                      </div>
                    </div>
                    <button onClick={() => setExpanded(null)} className="w-8 h-8 border border-[#C9A84C]/25 flex items-center justify-center text-[#6A6358] hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all flex-shrink-0">✕</button>
                  </div>
                  <p className="text-[#8A8070] text-sm mb-5">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.items.map((item, i) => (
                      <motion.span key={i} initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} transition={{ delay: i * 0.03 }}
                        className="text-[11px] tracking-wide text-[#A09888] border border-[#C9A84C]/20 px-3 py-1.5 bg-[#C9A84C]/04 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-all cursor-default">
                        {item}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => document.querySelector('#appointment')?.scrollIntoView({ behavior:'smooth' })}
                      className="bg-[#C9A84C] text-[#0A0A0A] px-5 py-2.5 text-[11px] tracking-[3px] uppercase font-bold hover:bg-[#E8C97A] transition-all active:scale-95">
                      Book Consultation →
                    </button>
                    <a href={`https://wa.me/${SITE_CONFIG.phonePlain}?text=${encodeURIComponent(`Hi M2, I want to inquire about ${cat.name}`)}`}
                      target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 border border-[#25D366]/30 text-[#25D366] px-5 py-2.5 text-[11px] tracking-[3px] uppercase font-semibold hover:bg-[#25D366]/10 transition-all active:scale-95">
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
