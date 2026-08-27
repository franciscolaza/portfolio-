import { motion } from 'framer-motion'
import { Palette, Code2 } from 'lucide-react'
import { expertise } from '../data/expertise'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

const icons = { Palette, Code2 }

const sideStyles = {
  design: {
    icon: 'text-accent-red',
    iconBg: 'bg-accent-red/10',
    card: 'paper-card-warm',
    chip: 'border-accent-red/25 bg-accent-red/5 text-ink-soft',
    kickerClass: 'text-gradient-art',
  },
  developer: {
    icon: 'text-accent-teal',
    iconBg: 'bg-accent-teal/10',
    card: 'paper-card-cool',
    chip: 'border-accent-teal/25 bg-accent-teal/5 text-ink-soft',
    kickerClass: 'text-gradient-code',
  },
}

export default function Expertise() {
  const { lang } = useLanguage()
  const t = ui[lang].expertise

  return (
    <section className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-24 -top-10 h-80 w-80 rounded-full bg-accent-yellow/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-blue/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading label={t.label} title={t.title} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {expertise.map((item, i) => {
            const Icon = icons[item.icon]
            const style = sideStyles[item.id]
            const kicker = item.id === 'design' ? t.kickerDesign : t.kickerDev
            return (
              <motion.a
                key={item.id}
                href={item.anchor}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group block ${style.card} rounded-2xl p-8 shadow-card transition-shadow`}
              >
                <p className={`font-display text-3xl font-bold uppercase tracking-tight ${style.kickerClass}`}>
                  {kicker}
                </p>
                <div className={`mb-6 mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconBg} ${style.icon}`}>
                  <Icon size={26} />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-ink">{item.title[lang]}</h3>
                <p className="mb-6 text-sm leading-relaxed text-ink-soft">{item.description[lang]}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag.fr}
                      className={`rounded-full border px-3 py-1 font-mono text-xs font-medium ${style.chip}`}
                    >
                      {tag[lang]}
                    </span>
                  ))}
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
