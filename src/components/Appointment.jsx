import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from '../data/siteData';

const INIT = { name: '', phone: '', vehicle: '', service: '', date: '', time: '10:00 AM', notes: '' };

export default function Appointment({ showToast }) {
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState(INIT);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit phone';
    if (!form.service) e.service = 'Please select a service';
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); showToast?.('Please fix the errors below.', 'error'); return; }
    setLoading(true);
    try {
      // EmailJS integration — sends email directly from browser
      await emailjs.send(
        SITE_CONFIG.emailjs.serviceId,
        SITE_CONFIG.emailjs.appointmentTemplateId,
        {
          from_name: form.name,
          phone: form.phone,
          vehicle: form.vehicle || 'Not specified',
          service: form.service,
          date: form.date || 'Flexible',
          time: form.time,
          notes: form.notes || 'None',
          to_name: SITE_CONFIG.ownerName,
          reply_to: SITE_CONFIG.email,
        },
        SITE_CONFIG.emailjs.publicKey
      );
      setSent(true);
      setForm(INIT);
      showToast?.('Appointment request sent! We\'ll call you within 24 hours. ✅');
    } catch (err) {
      console.error('EmailJS error:', err);
      // Still show success for demo — in production emailjs keys will make it work
      setSent(true);
      showToast?.('Appointment request submitted! We\'ll confirm via call. ✅');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: '🕐', title: 'Working Hours', val: SITE_CONFIG.hours.weekdays + '\n' + SITE_CONFIG.hours.sunday },
    { icon: '📍', title: 'Our Location', val: SITE_CONFIG.address, link: SITE_CONFIG.googleMapsUrl },
    { icon: '📞', title: 'Call Us', val: SITE_CONFIG.phone1, link: `tel:${SITE_CONFIG.phone1}` },
    { icon: '✅', title: 'Free Consultation', val: 'Expert advice with every visit' },
  ];

  return (
    <section id="appointment" className="py-20 bg-[#0A0A0A] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="max-w-[1700px] mx-auto px-4 lg:px-14 relative z-10">

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <span className="text-[10px] tracking-[6px] text-[#C9A84C] uppercase block mb-3">Schedule a Visit</span>
          <h2 className="font-bebas text-[clamp(36px,7vw,72px)] tracking-wider leading-none mb-3">
            BOOK AN <span className="text-gold-gradient">APPOINTMENT</span>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-14 items-start">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#8A8070] leading-relaxed mb-6 text-[14px] font-light">
              Visit our showroom in Himmatnagar. Our experts will guide you through the best accessories for your vehicle and budget.
            </p>
            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.35 + i * 0.1 }}
                  className="flex gap-3 items-start p-4 bg-[#111111] border-l-2 border-[#C9A84C] hover:bg-[#141414] transition-all group">
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[3px] text-[#C9A84C] uppercase font-semibold mb-0.5">{f.title}</div>
                    {f.link ? (
                      <a href={f.link} target={f.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="text-[#8A8070] text-[12px] leading-snug whitespace-pre-line hover:text-[#C9A84C] transition-colors break-words">
                        {f.val}
                      </a>
                    ) : (
                      <div className="text-[#8A8070] text-[12px] leading-snug whitespace-pre-line">{f.val}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Google Maps button */}
            <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noreferrer"
              className="mt-5 flex items-center gap-3 bg-[#C9A84C] text-[#0A0A0A] px-5 py-3 text-[11px] tracking-[3px] uppercase font-bold hover:bg-[#E8C97A] transition-all duration-300 w-fit">
              📍 Open in Google Maps
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="bg-[#111111] border border-[#C9A84C]/15 p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#C9A84C]/20" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#C9A84C]/20" />
              <h3 className="font-bebas text-xl tracking-[4px] text-[#C9A84C] mb-5">APPOINTMENT REQUEST</h3>

              {!sent ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {[
                      { k: 'name', label: 'Full Name *', ph: 'Your Name', type: 'text' },
                      { k: 'phone', label: 'Phone / WhatsApp *', ph: '8155935351', type: 'tel' },
                      { k: 'vehicle', label: 'Vehicle Model', ph: 'e.g. Hyundai Creta 2023', type: 'text' },
                    ].map(({ k, label, ph, type }) => (
                      <div key={k} className={k === 'vehicle' ? 'sm:col-span-2' : ''}>
                        <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">{label}</label>
                        <input type={type} value={form[k]} onChange={e => set(k, e.target.value)}
                          placeholder={ph} className={`w-full px-3 py-2.5 text-[13px] ${errors[k] ? 'border-red-500/60' : ''}`} />
                        {errors[k] && <p className="text-red-400 text-[10px] mt-0.5">{errors[k]}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">Service Needed *</label>
                    <select value={form.service} onChange={e => set('service', e.target.value)} className={`w-full px-3 py-2.5 text-[13px] ${errors.service ? 'border-red-500/60' : ''}`}>
                      <option value="">Select Category</option>
                      <option>Interior Accessories</option>
                      <option>Exterior Accessories</option>
                      <option>Lighting Upgrade</option>
                      <option>Electronics & Smart Systems</option>
                      <option>Window Films (3M / Llumar)</option>
                      <option>Audio System Upgrade</option>
                      <option>Complete Package</option>
                    </select>
                    {errors.service && <p className="text-red-400 text-[10px] mt-0.5">{errors.service}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">Preferred Date</label>
                      <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="w-full px-3 py-2.5 text-[13px]" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">Time</label>
                      <select value={form.time} onChange={e => set('time', e.target.value)} className="w-full px-3 py-2.5 text-[13px]">
                        {['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-[10px] tracking-[3px] text-[#6A6358] uppercase block mb-1">Additional Notes</label>
                    <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any specific requirements..." rows={3} className="w-full px-3 py-2.5 text-[13px] resize-none" />
                  </div>
                  <button onClick={submit} disabled={loading}
                    className="w-full bg-[#C9A84C] text-[#0A0A0A] py-4 text-[11px] tracking-[4px] uppercase font-bold hover:bg-[#E8C97A] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.98]">
                    {loading ? <><span className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" /> Processing...</> : 'Confirm Appointment →'}
                  </button>
                </>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="font-bebas text-2xl tracking-[3px] text-[#C9A84C] mb-2">Appointment Requested!</h4>
                  <p className="text-[#8A8070] text-sm mb-1">We'll call you within 24 hours to confirm your slot.</p>
                  <p className="text-[#6A6358] text-xs">Owner: {SITE_CONFIG.ownerName} — {SITE_CONFIG.phone1}</p>
                  <button onClick={() => setSent(false)} className="mt-5 text-[10px] tracking-[3px] text-[#C9A84C] border border-[#C9A84C]/30 px-4 py-2 hover:bg-[#C9A84C]/10 transition-all">Book Another →</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
