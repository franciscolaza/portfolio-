import { motion } from 'framer-motion'
import {
  Languages as LanguagesIcon,
  MessageCircle,
  LayoutGrid,
  Target,
  Clock,
  EyeOff,
  ShieldCheck,
  Users,
  Sparkles,
} from 'lucide-react'
import { languages, qualities } from '../data/education'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

const qualityIcons = {
  Communication: MessageCircle,
  Organisation: LayoutGrid,
  Rigueur: Target,
  Ponctualité: Clock,
  Discrétion: EyeOff,
  'Respect de la confidentialité': ShieldCheck,
  'Leadership / coordination': Users,
  Créativité: Sparkles,
}

export default function Languages() {
  const { lang } = useLanguage()
  const t = ui[lang].languagesSection

  return (
    <section className="relative overflow-hidden bg-paper-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 rounded-full bg-accent-red/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent-blue/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading label={t.commLabel} title={t.langTitle} align="left" />
            <div className="space-y-4">
              {languages.map((item, i) => (
                <motion.div
                  key={item.name.fr}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="paper-card flex items-center justify-between rounded-2xl px-6 py-4 shadow-card"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-ink">
                    <LanguagesIcon size={18} className="text-accent-teal" />
                    {item.name[lang]}
                  </span>
                  <span className="font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
                    {item.level[lang]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading label={t.softLabel} title={t.qualitiesTitle} align="left" />
            <div className="grid grid-cols-2 gap-4">
              {qualities.map((q, i) => {
                const Icon = qualityIcons[q.fr] ?? Sparkles
                return (
                  <motion.div
                    key={q.fr}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3"
                  >
                    <Icon size={16} className="shrink-0 text-accent-red" />
                    <span className="text-sm text-ink">{q[lang]}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
