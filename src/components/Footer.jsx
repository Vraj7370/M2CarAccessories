import { motion } from 'framer-motion';
import { SITE_CONFIG, CATEGORIES } from '../data/siteData';

const WA_SVG = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const SOCIAL_ICONS = {
  WhatsApp: WA_SVG,
  Instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Facebook: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Call: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
};

function FooterLink({ label, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-[12px] text-[#5A5248] hover:text-[#C9A84C] transition-all duration-300 flex items-center gap-2 group text-left"
      >
        <span className="w-0 group-hover:w-3 h-px bg-[#C9A84C]/60 transition-all duration-400 flex-shrink-0" />
        <span className="group-hover:translate-x-0.5 transition-transform duration-300">{label}</span>
      </button>
    </li>
  );
}

export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const wa = `https://wa.me/${SITE_CONFIG.phonePlain}?text=${encodeURIComponent('Hi M2 Car Accessories, I want to inquire.')}`;

  const socials = [
    { icon: 'WhatsApp', href: wa,                                                         label: 'WhatsApp' },
    { icon: 'Instagram', href: `https://instagram.com/${SITE_CONFIG.instagram}`,          label: 'Instagram' },
    { icon: 'Facebook',  href: SITE_CONFIG.facebook,                                      label: 'Facebook'  },
    { icon: 'Call',      href: `tel:${SITE_CONFIG.phone1}`,                               label: 'Call'      },
  ];

  const quickLinks = [
    { label: 'About Us',    href: '#about'       },
    { label: 'Products',    href: '#products'    },
    { label: 'Our Brands',  href: '#brands'      },
    { label: 'Reviews',     href: '#testimonials'},
    { label: 'Appointment', href: '#appointment' },
    { label: 'Instagram',   href: '#instagram'   },
    { label: 'Contact',     href: '#contact'     },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#C9A84C]/10 relative overflow-hidden pb-20 md:pb-0">

      {/* Top gold rule with shimmer */}
      <div className="relative h-px overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <motion.div
          className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ x: ['-100%', '500%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle bg grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow — bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1700px] mx-auto px-4 lg:px-14 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* ── BRAND ── */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              className="flex items-center gap-2.5 mb-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo with orbit ring */}
              <div className="relative flex-shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid transparent', borderTopColor: 'rgba(201,168,76,0.5)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                {/* Corner brackets */}
                {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((cls, i) => (
                  <span key={i} className={`absolute w-2 h-2 border-[#C9A84C]/40 ${cls}`} />
                ))}
                <img
                  src="/m2-logo.png"
                  alt="M2"
                  className="h-10 w-10 object-contain relative z-10"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.35))' }}
                />
              </div>

              <div>
                <div className="font-bebas text-[20px] tracking-[4px] text-white leading-none">M2</div>
                <div className="text-[8px] tracking-[4px] text-[#C9A84C]/70 uppercase">Car Accessories</div>
              </div>
            </motion.div>

            <p className="text-[#5A5248] text-[12px] leading-relaxed mb-5">
              Premium automotive accessories in {SITE_CONFIG.city}, Gujarat. Expert installation, genuine brands.
            </p>

            {/* Social icons — SVG replaces emoji */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  title={s.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 border border-[#C9A84C]/12 flex items-center justify-center text-[#5A5248] hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Hover fill sweep */}
                  <span className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/08 transition-all duration-300" />
                  <span className="relative z-10">{SOCIAL_ICONS[s.icon]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── CATEGORIES ── */}
          <div>
            <motion.h4
              className="text-[10px] tracking-[4px] text-[#C9A84C] uppercase font-semibold mb-5 flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-4 h-px bg-[#C9A84C]/50" />
              Categories
            </motion.h4>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map((c) => (
                <FooterLink key={c.id} label={c.name} onClick={() => scrollTo('#categories')} />
              ))}
            </ul>
          </div>

          {/* ── QUICK LINKS ── */}
          <div>
            <motion.h4
              className="text-[10px] tracking-[4px] text-[#C9A84C] uppercase font-semibold mb-5 flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="w-4 h-px bg-[#C9A84C]/50" />
              Quick Links
            </motion.h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <FooterLink key={link.href} label={link.label} onClick={() => scrollTo(link.href)} />
              ))}
            </ul>
          </div>

          {/* ── CONTACT ── */}
          <div>
            <motion.h4
              className="text-[10px] tracking-[4px] text-[#C9A84C] uppercase font-semibold mb-5 flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-4 h-px bg-[#C9A84C]/50" />
              Contact
            </motion.h4>

            <div className="flex flex-col gap-3.5">
              <div>
                <div className="text-[9px] tracking-[3px] text-[#3A3530] uppercase mb-0.5">Owner</div>
                <div className="text-[12px] text-[#5A5248]">{SITE_CONFIG.ownerName}</div>
              </div>

              <div>
                <div className="text-[9px] tracking-[3px] text-[#3A3530] uppercase mb-0.5">Address</div>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] text-[#5A5248] hover:text-[#C9A84C] transition-colors leading-relaxed"
                >
                  {SITE_CONFIG.address}
                </a>
              </div>

              <div>
                <div className="text-[9px] tracking-[3px] text-[#3A3530] uppercase mb-0.5">Phone</div>
                <a
                  href={`tel:${SITE_CONFIG.phone1}`}
                  className="text-[12px] text-[#5A5248] hover:text-[#C9A84C] transition-colors"
                >
                  {SITE_CONFIG.phone1}
                </a>
              </div>

              <div>
                <div className="text-[9px] tracking-[3px] text-[#3A3530] uppercase mb-0.5">Hours</div>
                <div className="text-[12px] text-[#5A5248] leading-relaxed">{SITE_CONFIG.hours.weekdays}</div>
                <div className="text-[12px] text-[#5A5248]">{SITE_CONFIG.hours.sunday}</div>
              </div>

              {/* Maps button with shimmer */}
              <motion.a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden text-[10px] tracking-[3px] text-[#C9A84C] border border-[#C9A84C]/25 px-3 py-2.5 hover:bg-[#C9A84C]/08 hover:border-[#C9A84C]/50 transition-all text-center uppercase flex items-center justify-center gap-2"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A84C]/15 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="relative z-10">Open Maps</span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="relative border-t border-[#C9A84C]/08 pt-6">
          {/* Corner accents on border */}
          <span className="absolute top-0 left-0 w-8 h-px bg-[#C9A84C]/40" />
          <span className="absolute top-0 right-0 w-8 h-px bg-[#C9A84C]/40" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-[#3A3530] tracking-wide">
              © {new Date().getFullYear()} M2 Car Accessories · {SITE_CONFIG.ownerName}
            </div>

            {/* Animated gold dot separator */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.span
                className="w-1 h-1 rounded-full bg-[#C9A84C]/40"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="text-[10px] text-[#3A3530] tracking-[4px] uppercase">
              {SITE_CONFIG.city} · {SITE_CONFIG.state} · India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}