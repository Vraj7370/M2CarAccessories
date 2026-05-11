import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../data/siteData';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Categories', href: '#categories' },
  { label: 'Products', href: '#products' },
  { label: 'Brands', href: '#brands' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const WA_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

function NavLink({ label, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className="relative text-[11px] tracking-[3px] uppercase font-medium text-[#A09888] hover:text-[#C9A84C] transition-colors duration-300 group py-1"
    >
      <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.6)]">
        {label}
      </span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent group-hover:w-full transition-all duration-500" />
      {isActive && (
        <motion.span
          layoutId="navDot"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A84C]"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    setActiveLink(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const wa = `https://wa.me/${SITE_CONFIG.phonePlain}?text=${encodeURIComponent(
    'Hi M2 Car Accessories, I want to inquire about car accessories.'
  )}`;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/96 backdrop-blur-2xl border-b border-[#C9A84C]/15 shadow-[0_4px_40px_rgba(0,0,0,0.8)]'
            : 'bg-transparent'
        }`}
      >
        {/* Animated gold scan line on border */}
        {scrolled && (
          <motion.div
            className="absolute bottom-0 left-0 h-px w-full overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#C9A84C]/70 to-transparent"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />
          </motion.div>
        )}

        <div className="flex items-center justify-between h-[72px] px-4 lg:px-12 max-w-[1700px] mx-auto">

          {/* ============================= */}
          {/* LOGO                         */}
          {/* ============================= */}
          <button
            onClick={() => scrollTo('#home')}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            className="flex items-center gap-3 group relative z-10"
          >
            <div className="relative flex items-center justify-center">

              {/* Corner bracket accents only — NO rotating ring */}
              {[
                'top-0 left-0 border-t border-l',
                'top-0 right-0 border-t border-r',
                'bottom-0 left-0 border-b border-l',
                'bottom-0 right-0 border-b border-r',
              ].map((cls, i) => (
                <motion.span
                  key={i}
                  className={`absolute border-[#C9A84C]/50 ${cls}`}
                  animate={
                    logoHovered
                      ? { width: 14, height: 14, borderColor: 'rgba(201,168,76,0.9)' }
                      : { width: 10, height: 10 }
                  }
                  transition={{ duration: 0.3 }}
                />
              ))}

              {/* Logo image */}
              <img
                src="/m2-logo.png"
                alt="M2 Car Accessories"
                draggable="false"
                className="w-[54px] h-[54px] object-contain relative z-10 transition-all duration-500 group-hover:scale-105"
                style={{
                  background: 'transparent',
                  mixBlendMode: 'screen',
                  filter: logoHovered
                    ? 'brightness(1.15) contrast(1.1) drop-shadow(0 0 14px rgba(201,168,76,0.35))'
                    : 'brightness(1.08) contrast(1.1) drop-shadow(0 0 10px rgba(201,168,76,0.10))',
                  transition: 'filter 0.4s',
                }}
              />

              {/* Luxury glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{ opacity: logoHovered ? 1 : 0, scale: logoHovered ? 1.3 : 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.02) 60%, transparent 100%)',
                  filter: 'blur(8px)',
                }}
              />
            </div>

            {/* Brand text */}
            <div className="hidden sm:flex flex-col justify-center leading-none">
              <span className="font-bebas text-[24px] tracking-[5px] text-white transition-all duration-300 group-hover:text-[#C9A84C] group-hover:drop-shadow-[0_0_12px_rgba(201,168,76,0.4)]">
                M2
              </span>
              <span className="text-[8px] tracking-[4px] uppercase text-[#C9A84C]/70 mt-1">
                Car Accessories
              </span>
            </div>
          </button>

          {/* ============================= */}
          {/* DESKTOP NAV LINKS            */}
          {/* ============================= */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                onClick={() => scrollTo(link.href)}
                isActive={activeLink === link.href}
              />
            ))}
          </div>

          {/* ============================= */}
          {/* CTA BUTTONS                  */}
          {/* ============================= */}
          <div className="hidden lg:flex items-center gap-2">

            {/* WhatsApp */}
            <motion.a
              href={wa}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-[10px] tracking-[2px] text-[#25D366] border border-[#25D366]/30 px-4 py-2.5 hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-300 uppercase font-semibold"
            >
              {WA_ICON}
              WhatsApp
            </motion.a>

            {/* Call */}
            <motion.a
              href={`tel:${SITE_CONFIG.phone1}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-[10px] tracking-[2px] text-[#C9A84C] border border-[#C9A84C]/30 px-4 py-2.5 hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-300 uppercase font-semibold"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call Now
            </motion.a>

            {/* Book Now */}
            <motion.button
              onClick={() => scrollTo('#appointment')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden text-[10px] tracking-[3px] bg-[#C9A84C] text-[#0A0A0A] px-5 py-2.5 uppercase font-bold transition-all duration-300 hover:bg-[#E8C97A] hover:shadow-[0_4px_24px_rgba(201,168,76,0.45)]"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
              />
              <span className="relative z-10">Book Now</span>
            </motion.button>
          </div>

          {/* ============================= */}
          {/* HAMBURGER                    */}
          {/* ============================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.22 }}
              className="block w-6 h-[1.5px] bg-[#C9A84C] origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.18 }}
              className="block w-4 h-[1.5px] bg-[#C9A84C]"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.22 }}
              className="block w-6 h-[1.5px] bg-[#C9A84C] origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ============================= */}
      {/* MOBILE MENU                  */}
      {/* ============================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[72px] left-0 right-0 z-[850] bg-[#0A0A0A]/98 backdrop-blur-2xl border-b border-[#C9A84C]/15 py-6 px-5"
          >
            {/* Animated top gold rule */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            {/* Mobile header — NO spinning ring around logo */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#C9A84C]/10">
              <div className="relative">
                {/* Corner brackets only around mobile logo */}
                {[
                  'top-0 left-0 border-t border-l',
                  'top-0 right-0 border-t border-r',
                  'bottom-0 left-0 border-b border-l',
                  'bottom-0 right-0 border-b border-r',
                ].map((cls, i) => (
                  <span
                    key={i}
                    className={`absolute w-2 h-2 border-[#C9A84C]/40 ${cls}`}
                  />
                ))}
                <img
                  src="/m2-logo.png"
                  alt="M2"
                  className="w-11 h-11 object-contain relative z-10"
                  style={{
                    background: 'transparent',
                    mixBlendMode: 'screen',
                    filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.25))',
                  }}
                />
              </div>

              <div>
                <div className="font-bebas text-lg tracking-[4px] text-white">
                  M2 Car Accessories
                </div>
                <div className="text-[9px] tracking-[4px] text-[#C9A84C]/60 uppercase">
                  {SITE_CONFIG.city}
                </div>
              </div>
            </div>

            {/* Mobile links */}
            <div className="flex flex-col gap-0.5 mb-5">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-[12px] tracking-[3px] uppercase text-[#A09888] hover:text-[#C9A84C] py-3.5 border-b border-[#C9A84C]/[0.07] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                  <motion.span
                    className="text-[#C9A84C]/30 group-hover:text-[#C9A84C] transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <motion.a
                href={`tel:${SITE_CONFIG.phone1}`}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 border border-[#C9A84C]/30 text-[#C9A84C] py-3 text-[11px] tracking-[2px] uppercase font-semibold hover:bg-[#C9A84C]/08 transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call
              </motion.a>

              <motion.a
                href={wa}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-[11px] tracking-[2px] uppercase font-bold hover:bg-[#1fb558] transition-all"
              >
                {WA_ICON}
                WhatsApp
              </motion.a>
            </div>

            {/* Book Appointment */}
            <motion.button
              onClick={() => scrollTo('#appointment')}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden w-full bg-[#C9A84C] text-[#0A0A0A] py-3.5 text-[11px] tracking-[4px] uppercase font-bold hover:bg-[#E8C97A] transition-all"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />
              <span className="relative z-10">Book Appointment</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}