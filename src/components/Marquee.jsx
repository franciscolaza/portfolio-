import { motion } from 'framer-motion'

export default function Marquee({ items, className = '' }) {
  const track = [...items, ...items]

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              {item}
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-current opacity-40" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
