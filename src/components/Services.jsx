import { motion } from 'framer-motion'
import { Palette, Code2, Map, Check } from 'lucide-react'
import { services } from '../data/servicesData'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

const icons = { Palette, Code2, Map }

const toneStyles = {
  Palette: { card: 'paper-card-warm', iconBg: 'bg-accent-red/10', iconColor: 'text-accent-red', check: 'text-accent-red' },
  Code2: { card: 'paper-card-cool', iconBg: 'bg-accent-teal/10', iconColor: 'text-accent-teal', check: 'text-accent-teal' },
  Map: { card: 'paper-card', iconBg: 'bg-accent-blue/10', iconColor: 'text-accent-blue', check: 'text-accent-blue' },
}

export default function Services() {
  const { lang } = useLanguage()
  const t = ui[lang].services

  return (
    <section className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-24 -top-10 h-80 w-80 rounded-full bg-accent-yellow/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-teal/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading label={t.label} title={t.title} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon]
            const tone = toneStyles[service.icon]
            return (
              <motion.div
                key={service.title.fr}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${tone.card} rounded-2xl p-7 shadow-card`}
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tone.iconBg} ${tone.iconColor}`}>
                  <Icon size={22} />
                </div>
                <h3 className="mb-4 text-lg font-semibold text-ink">{service.title[lang]}</h3>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item.fr} className="flex items-start gap-2 text-sm text-ink-soft">
                      <Check size={15} className={`mt-0.5 shrink-0 ${tone.check}`} />
                      {item[lang]}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
