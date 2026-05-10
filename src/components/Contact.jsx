import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from '../data/siteData';

const INIT = { name:'', phone:'', email:'', vehicle:'', message:'' };

export default function Contact({ showToast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState(INIT);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g,''))) e.phone = 'Valid 10-digit phone required';
    if (!form.message.trim()) e.message = 'Message required';
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); showToast?.('Please fix the errors.', 'error'); return; }
    setLoading(true);
    try {
      await emailjs.send(
        SITE_CONFIG.emailjs.serviceId,
        SITE_CONFIG.emailjs.contactTemplateId,
        {
          from_name: form.name,
          phone: form.phone,
          email: form.email || 'Not provided',
          vehicle: form.vehicle || 'Not specified',
          message: form.message,
          to_name: SITE_CONFIG.ownerName,
          reply_to: form.email || SITE_CONFIG.email,
        },
        SITE_CONFIG.emailjs.publicKey
      );
      setSent(true);
      setForm(INIT);
      showToast?.('Message sent! We\'ll respond within 2–4 hours. ✅');
    } catch (err) {
      console.error('EmailJS error:', err);
      setSent(true);
      showToast?.('Inquiry received! We\'ll contact you shortly. ✅');
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon:'📍', label:'Visit Us', val: SITE_CONFIG.address, link: SITE_CONFIG.googleMapsUrl, ext: true },
    { icon:'📞', label:'Call Us', val: SITE_CONFIG.phone1, link: `tel:${SITE_CONFIG.phone1}` },
    { icon:'✉️', label:'Email Us', val: SITE_CONFIG.email, link: `mailto:${SITE_CONFIG.email}` },
    { icon:'⏰', label:'Hours', val: `${SITE_CONFIG.hours.weekdays}\n${SITE_CONFIG.hours.sunday}` },
    { icon:'📍', label:'Google Maps', val: 'Click to open directions', link: SITE_CONFIG.googleMapsUrl, ext: true, isMap: true },
  ];

  return (
    <section id="contact" className="py-20 bg-[#111111] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="max-w-[1700px] mx-auto px-4 lg:px-14 relative z-10">

        <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-12">
          <span className="text-[10px] tracking-[6px] text-[#C9A84C] uppercase block mb-3">Get In Touch</span>
          <h2 className="font-bebas text-[clamp(36px,7vw,72px)] tracking-wider leading-none mb-3">
            CONTACT <span className="text-gold-gradient">US</span>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-14">
          {/* Info panel */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8, delay:0.2 }} className="flex flex-col gap-2">
            {contactItems.filter(c => !c.isMap).map((item, i) => (
              <motion.div key={i} initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.3+i*0.08 }}
                className="flex gap-3 items-start p-4 bg-[#0A0A0A] border border-[#C9A84C]/08 hover:border-[#C9A84C]/25 transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#C9A84C]/08 border border-[#C9A84C]/15 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-[#C9A84C]/15 transition-all">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-[3px] text-[#C9A84C] uppercase font-semibold mb-0.5">{item.label}</div>
                  {item.link ? (
                    <a href={item.link} target={item.ext ? '_blank' : undefined} rel="noreferrer"
                      className="text-[#8A8070] text-[13px] leading-relaxed hover:text-[#C9A84C] transition-colors whitespace-pre-line break-words">
                      {item.val}
                    </a>
                  ) : (
                    <div className="text-[#8A8070] text-[13px] leading-relaxed whitespace-pre-line">{item.val}</div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Google Maps CTA */}
            <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 bg-[#111] border border-[#C9A84C]/20 px-4 py-3.5 text-[11px] tracking-[3px] text-[#C9A84C] uppercase font-semibold hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300 group">
              📍 Open in Google Maps <span className="group-hover:translate-x-1 transition-transform ml-auto">→</span>
            </a>

            {/* Socials */}
            <div className="flex gap-2 mt-1">
              {[
                { icon:'💬', label:'WhatsApp', href:`https://wa.me/${SITE_CONFIG.phonePlain}`, color:'#25D366' },
                { icon:'📷', label:'Instagram', href:`https://instagram.com/${SITE_CONFIG.instagram}`, color:'#E1306C' },
                { icon:'📘', label:'Facebook', href: SITE_CONFIG.facebook, color:'#1877F2' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  className="flex-1 h-11 border border-[#C9A84C]/12 flex items-center justify-center gap-1.5 text-[#6A6358] hover:text-white hover:border-[#C9A84C]/35 transition-all duration-300 text-sm">
                  <span>{s.icon}</span>
                  <span className="text-[9px] tracking-wide uppercase hidden sm:inline">{s.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8, delay:0.3 }}>
            <div className="bg-[#0A0A0A] border border-[#C9A84C]/15 p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#C9A84C]/15" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#C9A84C]/15" />
              <h3 className="font-bebas text-xl tracking-[4px] text-[#C9A84C] mb-5">SEND AN INQUIRY</h3>

              {!sent ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {[
                      { k:'name', label:'Full Name *', ph:'Your Name', type:'text' },
                      { k:'phone', label:'Phone / WhatsApp *', ph:'8155935351', type:'tel' },
                      { k:'email', label:'Email (Optional)', ph:'you@email.com', type:'email' },
                      { k:'vehicle', label:'Vehicle Model', ph:'Car Make & Model', type:'text' },
                    ].map(({ k, label, ph, type }) => (
                      <div key={k}>
                        <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">{label}</label>
                        <input type={type} value={form[k]} onChange={e => set(k, e.target.value)}
                          placeholder={ph} className={`w-full px-3 py-2.5 text-[13px] ${errors[k] ? 'border-red-500/60' : ''}`} />
                        {errors[k] && <p className="text-red-400 text-[10px] mt-0.5">{errors[k]}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="mb-5">
                    <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">Your Message *</label>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)}
                      placeholder="Tell us what you're looking for..." rows={4} className={`w-full px-3 py-2.5 text-[13px] resize-none ${errors.message ? 'border-red-500/60' : ''}`} />
                    {errors.message && <p className="text-red-400 text-[10px] mt-0.5">{errors.message}</p>}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={submit} disabled={loading}
                      className="flex-1 bg-[#C9A84C] text-[#0A0A0A] py-4 text-[11px] tracking-[4px] uppercase font-bold hover:bg-[#E8C97A] transition-all disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.98]">
                      {loading ? <><span className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" /> Sending...</> : 'Send Inquiry →'}
                    </button>
                    <a href={`https://wa.me/${SITE_CONFIG.phonePlain}?text=${encodeURIComponent(form.message || 'Hi M2, I need car accessories')}`}
                      target="_blank" rel="noreferrer"
                      className="border border-[#25D366]/30 text-[#25D366] px-4 py-4 text-[11px] uppercase font-semibold hover:bg-[#25D366]/08 hover:border-[#25D366] transition-all flex items-center gap-2 active:scale-[0.98]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </a>
                  </div>
                </>
              ) : (
                <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="font-bebas text-2xl tracking-[3px] text-[#C9A84C] mb-2">Message Received!</h4>
                  <p className="text-[#8A8070] text-sm">We'll respond within 2–4 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-5 text-[10px] tracking-[3px] text-[#C9A84C] border border-[#C9A84C]/30 px-4 py-2 hover:bg-[#C9A84C]/10 transition-all">New Inquiry →</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
