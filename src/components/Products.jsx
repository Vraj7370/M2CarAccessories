import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PRODUCTS, SITE_CONFIG } from '../data/siteData';

const FILTERS = ['All', 'Interior', 'Lighting', 'Electronics', 'Window', 'Exterior', 'Audio'];

const BADGE_STYLES = {
  'Best Seller': 'bg-[#C9A84C] text-[#0A0A0A]',
  'Premium': 'bg-[#111] text-[#C9A84C] border border-[#C9A84C]/50',
  'New': 'bg-[#00C896] text-[#0A0A0A]',
  'Top Pick': 'bg-[#C9A84C] text-[#0A0A0A]',
  'Custom': 'bg-[#7B2FBE] text-white',
  'Hi-Fi': 'bg-[#E31837] text-white',
};

function ProductCard({ p, index, onInquiry }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el || window.innerWidth < 768) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(6px)`;
    el.style.boxShadow = `${-x * 16}px ${-y * 16}px 36px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,${(Math.abs(x)+Math.abs(y))*0.2})`;
  };
  const onLeave = () => {
    if (cardRef.current) { cardRef.current.style.transform = ''; cardRef.current.style.boxShadow = ''; }
  };

  return (
    <motion.div
      initial={{ opacity:0, y:50 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:0.95 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease:[0.23,1,0.32,1] }}
      layout
    >
      <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
        className="group bg-[#111111] border border-[#C9A84C]/10 overflow-hidden transition-[border-color] duration-300 hover:border-[#C9A84C]/35"
        style={{ transition:'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.3s' }}>
        {/* Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" loading="lazy"
            style={{ transition:'transform 0.7s cubic-bezier(0.23,1,0.32,1)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
          <span className={`absolute top-3 left-3 text-[9px] tracking-[3px] uppercase font-bold px-2.5 py-1 ${BADGE_STYLES[p.badge] || 'bg-[#C9A84C] text-[#0A0A0A]'}`}>{p.badge}</span>
          <span className="absolute top-3 right-3 text-[9px] tracking-[2px] text-[#C9A84C] bg-[#0A0A0A]/70 backdrop-blur-sm border border-[#C9A84C]/20 px-2.5 py-1 uppercase">{p.category}</span>
        </div>
        {/* Body */}
        <div className="p-4 lg:p-5">
          <h3 className="font-rajdhani text-[17px] font-semibold tracking-wide text-white mb-0.5">{p.name}</h3>
          <div className="text-[9px] tracking-[3px] text-[#C9A84C]/70 uppercase mb-3">{p.brand}</div>
          <p className="text-[#6A6358] text-[12px] leading-relaxed mb-4">{p.desc}</p>
          <div className="flex gap-1.5 flex-wrap mb-4">
            {p.features.map((f, i) => (
              <span key={i} className="text-[9px] tracking-wide text-[#A09888] bg-[#1A1A1A] border border-[#C9A84C]/12 px-2 py-1">{f}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-[#C9A84C]/08">
            <button onClick={() => onInquiry(p)}
              className="flex-1 text-[10px] tracking-[3px] uppercase text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-2.5 hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300 font-semibold active:scale-95">
              Get Quote →
            </button>
            <a href={`https://wa.me/${SITE_CONFIG.phonePlain}?text=${encodeURIComponent(`Hi M2, I want to inquire about ${p.name}`)}`}
              target="_blank" rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#25D366]/25 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all active:scale-90">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products({ showToast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [inquiry, setInquiry] = useState(null);
  const [form, setForm] = useState({ name:'', phone:'', vehicle:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = PRODUCTS.filter(p => {
    const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const submitInquiry = () => {
    if (!form.name || !form.phone) { showToast?.('Please fill in name and phone.', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setSent(true);
      showToast?.(`Inquiry for ${inquiry?.name} sent! We'll contact you shortly. ✅`);
    }, 1000);
  };

  return (
    <section id="products" className="py-20 px-4 lg:px-14 max-w-[1700px] mx-auto" ref={ref}>
      <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-10">
        <span className="text-[10px] tracking-[6px] text-[#C9A84C] uppercase block mb-3">Featured Range</span>
        <h2 className="font-bebas text-[clamp(36px,7vw,72px)] tracking-wider leading-none mb-3">
          PRODUCT <span className="text-gold-gradient">SHOWCASE</span>
        </h2>
        <div className="w-14 h-px bg-[#C9A84C] mx-auto" />
      </motion.div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6A6358] text-sm">🔍</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products or brands..." className="w-full pl-9 pr-4 py-2.5 text-[13px]" />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`text-[10px] tracking-[2px] uppercase px-3 py-2 border transition-all duration-300 active:scale-95 ${
                activeFilter === f ? 'bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]' : 'text-[#A09888] border-[#C9A84C]/15 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]'
              }`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} onInquiry={setInquiry} />)}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20 border border-[#C9A84C]/10 bg-[#111111]">
          <div className="text-4xl mb-3">🔍</div>
          <div className="font-bebas text-xl tracking-widest text-[#3A3530] mb-2">NO PRODUCTS FOUND</div>
          <p className="text-[#5A5248] text-sm">Try a different filter or search term</p>
          <button onClick={() => { setSearch(''); setActiveFilter('All'); }}
            className="mt-4 text-[10px] tracking-[3px] text-[#C9A84C] border border-[#C9A84C]/30 px-4 py-2 hover:bg-[#C9A84C]/10 transition-all uppercase">
            Clear Filters
          </button>
        </div>
      )}

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiry && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 bg-black/85 z-[950] flex items-end sm:items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setInquiry(null)}>
            <motion.div initial={{ y:60, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:60, opacity:0 }}
              transition={{ type:'spring', damping:26 }}
              className="bg-[#111111] border border-[#C9A84C]/25 w-full max-w-md p-6 relative">
              <button onClick={() => { setInquiry(null); setSent(false); setForm({ name:'', phone:'', vehicle:'' }); }}
                className="absolute top-4 right-4 text-[#6A6358] hover:text-[#C9A84C] transition-colors text-xl">✕</button>
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#C9A84C]/10">
                <img src={inquiry.image} alt={inquiry.name} className="w-14 h-14 object-cover flex-shrink-0" />
                <div>
                  <h3 className="font-bebas text-[18px] tracking-wide text-[#C9A84C] leading-tight">{inquiry.name}</h3>
                  <p className="text-[10px] tracking-[3px] text-[#6A6358] uppercase">{inquiry.brand}</p>
                </div>
              </div>
              {!sent ? (
                <>
                  <div className="flex flex-col gap-3 mb-5">
                    {[
                      { k:'name', label:'Your Name', ph:'Full Name' },
                      { k:'phone', label:'Phone / WhatsApp', ph:'8155935351' },
                      { k:'vehicle', label:'Your Vehicle', ph:'e.g. Hyundai Creta 2023' },
                    ].map(({ k, label, ph }) => (
                      <div key={k}>
                        <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">{label}</label>
                        <input type="text" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={ph} className="w-full px-3 py-2.5 text-[13px]" />
                      </div>
                    ))}
                  </div>
                  <button onClick={submitInquiry} disabled={loading}
                    className="w-full bg-[#C9A84C] text-[#0A0A0A] py-3.5 text-[11px] tracking-[4px] uppercase font-bold hover:bg-[#E8C97A] transition-all disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.98]">
                    {loading ? <><span className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" /> Sending...</> : 'Send Inquiry →'}
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">✅</div>
                  <div className="font-bebas text-xl tracking-[3px] text-[#C9A84C]">Inquiry Sent!</div>
                  <p className="text-[#6A6358] text-sm mt-1">We'll call you within 2 hours.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
