import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_MESSAGES = [
  "Initializing systems...",
  "Loading components...",
  "Calibrating sensors...",
  "Syncing data streams...",
  "Preparing experience...",
  "Almost ready...",
];

function Car3D() {
  return (
    <svg width="90" height="44" viewBox="0 0 90 44" fill="none">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
        <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#AACCEE" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#336688" stopOpacity="0.4" />
        </linearGradient>
        <filter id="headlightGlow">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Shadow */}
      <ellipse cx="45" cy="42" rx="38" ry="3" fill="rgba(201,168,76,0.15)" />
      {/* Body */}
      <path d="M6 30 L12 15 L28 10 L62 10 L76 19 L82 30 Z" fill="url(#bodyGrad)" />
      {/* Roof highlight */}
      <path d="M12 15 L28 10 L62 10 L76 19 L68 13 L28 11 Z" fill="rgba(255,255,255,0.12)" />
      {/* Windows */}
      <path d="M16 15 L20 8 L40 8 L52 8 L63 14 Z" fill="url(#windowGrad)" />
      <line x1="40" y1="8" x2="39" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Door line */}
      <line x1="38" y1="10" x2="36" y2="30" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
      {/* Headlight */}
      <rect x="76" y="19" width="11" height="5" rx="2" fill="#FFF8C0" filter="url(#headlightGlow)" />
      <rect x="80" y="20" width="5" height="3" rx="1" fill="white" opacity="0.9" />
      {/* Wheel wells */}
      <path d="M3 30 Q6 38 12 38 Q18 38 21 30" fill="rgba(0,0,0,0.4)" />
      <path d="M62 30 Q65 38 71 38 Q77 38 80 30" fill="rgba(0,0,0,0.4)" />
      {/* Wheels */}
      {[13, 70].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="34" r="7" fill="#111" stroke="#C9A84C" strokeWidth="1.5" />
          <circle cx={cx} cy="34" r="3.5" fill="#1A1A1A" stroke="#E8C97A" strokeWidth="1" />
          <circle cx={cx} cy="34" r="1.2" fill="#C9A84C" />
          {/* Spokes */}
          <line x1={cx} y1="27" x2={cx} y2="30" stroke="#C9A84C" strokeWidth="0.8" />
          <line x1={cx} y1="38" x2={cx} y2="41" stroke="#C9A84C" strokeWidth="0.8" />
          <line x1={cx - 7} y1="34" x2={cx - 4} y2="34" stroke="#C9A84C" strokeWidth="0.8" />
          <line x1={cx + 4} y1="34" x2={cx + 7} y2="34" stroke="#C9A84C" strokeWidth="0.8" />
        </g>
      ))}
      {/* Exhaust */}
      <circle cx="3" cy="29" r="2" fill="rgba(201,168,76,0.25)" />
      <circle cx="0" cy="28" r="3" fill="rgba(201,168,76,0.1)" />
    </svg>
  );
}

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      bottom: `${Math.random() * 30}%`,
      size: Math.random() > 0.6 ? 2 : 1,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 6,
    }))
  );

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 14 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 900);
      }
      setProgress(p);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const p = Math.min(100, progress);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0A0A0A' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Expanding rings */}
          {[300, 500, 700].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full"
              style={{
                width: size, height: size,
                border: '1px solid rgba(201,168,76,0.08)',
              }}
              animate={{ scale: [0.85, 1.4], opacity: [0, 0.8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
            />
          ))}

          {/* Grid floor (perspective) */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '55%', perspective: 400 }}>
            <motion.div
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(rgba(201,168,76,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.18) 1px,transparent 1px)',
                backgroundSize: '60px 60px',
                transform: 'rotateX(65deg) translateY(20%)',
              }}
              animate={{ backgroundPositionY: ['0px', '60px'] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A 90%)' }} />
          </div>

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px z-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner brackets */}
          {['tl', 'tr', 'bl', 'br'].map((pos) => (
            <div
              key={pos}
              className="absolute w-7 h-7 z-30"
              style={{
                top: pos.includes('t') ? 20 : undefined,
                bottom: pos.includes('b') ? 20 : undefined,
                left: pos.includes('l') ? 20 : undefined,
                right: pos.includes('r') ? 20 : undefined,
                borderTop: pos.includes('t') ? '1px solid rgba(201,168,76,0.6)' : undefined,
                borderBottom: pos.includes('b') ? '1px solid rgba(201,168,76,0.6)' : undefined,
                borderLeft: pos.includes('l') ? '1px solid rgba(201,168,76,0.6)' : undefined,
                borderRight: pos.includes('r') ? '1px solid rgba(201,168,76,0.6)' : undefined,
              }}
            />
          ))}

          {/* 3D Logo */}
          <motion.div
            className="relative z-20 mb-8 flex flex-col items-center"
            animate={{ y: [0, -6, 0], rotateY: [0, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow halo */}
            <motion.div
              className="absolute"
              style={{ inset: -20, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.2) 0%, transparent 70%)', borderRadius: '50%' }}
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Box */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 96, height: 96,
                background: 'rgba(10,10,10,0.92)',
                border: '1px solid rgba(201,168,76,0.5)',
                boxShadow: '0 0 30px rgba(201,168,76,0.2), inset 0 0 20px rgba(201,168,76,0.05)',
              }}
            >
              {/* Top face */}
              <div style={{
                position: 'absolute', top: -8, left: -1, right: -1, height: 8,
                background: 'rgba(201,168,76,0.2)',
                border: '1px solid rgba(201,168,76,0.3)',
                transform: 'rotateX(-90deg)', transformOrigin: 'top',
              }} />
              {/* Right face */}
              <div style={{
                position: 'absolute', top: -1, right: -8, bottom: -1, width: 8,
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.2)',
                transform: 'rotateY(-90deg)', transformOrigin: 'right',
              }} />
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, transparent 60%)' }} />
              <span style={{ fontFamily: 'Bebas Neue, Arial Narrow, sans-serif', fontSize: 38, color: '#C9A84C', position: 'relative', zIndex: 1 }}>M2</span>
            </div>

            <motion.p
              className="mt-3 text-[10px] tracking-[7px] uppercase"
              style={{ color: 'rgba(201,168,76,0.55)', fontFamily: 'Arial Narrow, sans-serif' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Car Accessories
            </motion.p>
          </motion.div>

          {/* Road + Car */}
          <div className="relative z-20 mb-7" style={{ width: 320, height: 70 }}>
            {/* Speed lines */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute h-px"
                style={{
                  top: 8 + i * 5, left: 0, right: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)',
                  opacity: 0,
                }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
            {/* Car */}
            <motion.div
              className="absolute"
              style={{ bottom: 18, filter: 'drop-shadow(0 4px 10px rgba(201,168,76,0.35))' }}
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatDelay: 0 }}
            >
              <Car3D />
            </motion.div>
            {/* Road */}
            <div
              className="absolute bottom-0 left-0 right-0 overflow-hidden"
              style={{ height: 20, background: 'rgba(201,168,76,0.04)', borderTop: '1px solid rgba(201,168,76,0.2)' }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, rgba(201,168,76,0.3) 0, rgba(201,168,76,0.3) 18px, transparent 18px, transparent 36px)',
                  backgroundSize: '36px 100%',
                }}
                animate={{ backgroundPositionX: ['0px', '-36px'] }}
                transition={{ duration: 0.45, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Progress */}
          <div className="z-20" style={{ width: 280 }}>
            <div className="flex justify-between items-baseline mb-2">
              <span style={{ fontFamily: 'Arial Narrow, sans-serif', fontSize: 9, letterSpacing: 5, color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase' }}>
                Loading
              </span>
              <span style={{ fontFamily: 'Bebas Neue, Arial Narrow, sans-serif', fontSize: 26, color: '#C9A84C', lineHeight: 1, textShadow: '0 0 20px rgba(201,168,76,0.5)' }}>
                {Math.round(p)}%
              </span>
            </div>
            <div className="relative overflow-visible" style={{ height: 2, background: 'rgba(255,255,255,0.05)' }}>
              {/* Glow under bar */}
              <motion.div
                className="absolute rounded"
                style={{ top: -3, height: 8, background: 'rgba(232,201,122,0.35)', filter: 'blur(5px)' }}
                animate={{ width: `${p}%` }}
                transition={{ duration: 0.1 }}
              />
              {/* Fill */}
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C97A)' }}
                animate={{ width: `${p}%` }}
                transition={{ duration: 0.1 }}
              >
                {/* Tip spark */}
                <div style={{
                  position: 'absolute', right: -1, top: -4,
                  width: 2, height: 10,
                  background: '#FFF8E0',
                  boxShadow: '0 0 8px #C9A84C, 0 0 16px #C9A84C',
                  borderRadius: 1,
                }} />
              </motion.div>
            </div>
          </div>

          {/* Status text */}
          <motion.p
            key={statusIdx}
            className="mt-4 z-20"
            style={{ fontFamily: 'Arial Narrow, sans-serif', fontSize: 10, letterSpacing: 3, color: 'rgba(201,168,76,0.45)', textTransform: 'uppercase' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {STATUS_MESSAGES[statusIdx]}
          </motion.p>

          {/* Particles */}
          {particles.current.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{ left: p.left, bottom: p.bottom, width: p.size, height: p.size, background: '#C9A84C' }}
              animate={{ y: [0, -600], opacity: [0, 0.7, 0.3, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}