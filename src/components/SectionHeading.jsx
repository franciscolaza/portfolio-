import { motion } from 'framer-motion'

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  tone = 'dev',
  eyebrow,
  children,
}) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  const labelClass = tone === 'design' ? 'section-label-warm' : 'section-label'

  return (
    <motion.div
      className={`flex flex-col ${alignment} gap-4 mb-14`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow && <span className="eyebrow-number">{eyebrow}</span>}
      {label && <span className={labelClass}>{label}</span>}
      <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-5xl">
        {children ?? title}
      </h2>
      {description && <p className="max-w-2xl text-base text-ink-soft sm:text-lg">{description}</p>}
    </motion.div>
  )
}
