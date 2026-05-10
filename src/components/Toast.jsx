import { AnimatePresence, motion } from 'framer-motion';

export default function Toast({ toast }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className={`flex items-center gap-3 px-6 py-3.5 shadow-2xl backdrop-blur-md border text-sm font-medium tracking-wide ${
              toast.type === 'success'
                ? 'bg-[#0A0A0A]/95 border-[#C9A84C]/40 text-[#C9A84C]'
                : 'bg-[#0A0A0A]/95 border-red-500/40 text-red-400'
            }`}
          >
            <span className="text-lg">{toast.type === 'success' ? '✅' : '❌'}</span>
            <span>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
