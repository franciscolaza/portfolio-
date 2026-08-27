import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { profile } from '../data/profile'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

export default function About() {
  const { lang } = useLanguage()
  const t = ui[lang].about

  return (
    <section id="about" className="relative overflow-hidden bg-paper-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 rounded-full bg-accent-red/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent-teal/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading label={t.label} align="left">
          <span className="block text-ink">{t.titleLine1}</span>
          <span className="block text-outline">{t.titleLine2}</span>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-ink">{t.intro}</p>
            <p className="text-base leading-relaxed text-ink-soft">{profile.aboutText[lang]}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {profile.aboutStats.map((stat, i) => (
              <div
                key={stat.fr}
                className={`flex items-center gap-3 rounded-2xl px-5 py-5 ${
                  i % 2 === 0 ? 'paper-card-warm' : 'paper-card-cool'
                }`}
              >
                <CheckCircle2
                  className={`shrink-0 ${i % 2 === 0 ? 'text-accent-red' : 'text-accent-teal'}`}
                  size={20}
                />
                <span className="text-sm font-medium text-ink">{stat[lang]}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
