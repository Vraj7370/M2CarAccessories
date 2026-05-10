import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '../data/siteData';

const NAV = [
  { icon: '🏠', label: 'Home', href: '#home' },
  { icon: '🗂️', label: 'Categories', href: '#categories' },
  { icon: '📞', label: 'Call', href: `tel:${SITE_CONFIG.phone1}`, isCall: true },
  { icon: '💬', label: 'WhatsApp', href: `https://wa.me/${SITE_CONFIG.phonePlain}?text=Hi%20M2%2C%20I%20need%20car%20accessories`, isWA: true },
  { icon: '📅', label: 'Book', href: '#appointment' },
];

export default function MobileBottomNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = ['home','about','categories','products','brands','testimonials','appointment','contact'];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[700] md:hidden bg-[#0A0A0A]/97 backdrop-blur-xl border-t border-[#C9A84C]/15 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {NAV.map((item) => {
          const isExternal = item.isCall || item.isWA;
          const Tag = isExternal ? 'a' : 'button';
          const props = isExternal
            ? { href: item.href, target: item.isWA ? '_blank' : undefined, rel: item.isWA ? 'noreferrer' : undefined }
            : { onClick: () => scrollTo(item.href) };

          return (
            <Tag key={item.label} {...props}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 transition-all duration-300 ${
                item.isCall ? 'text-[#25D366]' : item.isWA ? 'text-[#25D366]' : active === item.href.replace('#','') ? 'text-[#C9A84C]' : 'text-[#5A5248]'
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[9px] tracking-[1px] uppercase font-medium">{item.label}</span>
              {active === item.href.replace('#','') && !isExternal && (
                <motion.div layoutId="mobileNavDot" className="w-1 h-1 rounded-full bg-[#C9A84C] mt-0.5" />
              )}
            </Tag>
          );
        })}
      </div>
    </nav>
  );
}
