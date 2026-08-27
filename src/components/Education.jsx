import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../data/education'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

export default function Education() {
  const { lang } = useLanguage()
  const t = ui[lang].education

  return (
    <section id="education" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-20 -top-10 h-72 w-72 rounded-full bg-accent-teal/15 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-yellow/20 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading label={t.label} title={t.title} />

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent-teal via-accent-turquoise to-accent-yellow sm:left-6" />

          <ol className="space-y-8">
            {education.map((item, i) => (
              <motion.li
                key={item.degree.fr + item.period.fr}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-16 sm:pl-20"
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-accent-teal/40 bg-paper text-accent-teal sm:h-12 sm:w-12">
                  <GraduationCap size={18} />
                </span>

                <div className="paper-card rounded-2xl p-6 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-ink">
                      {item.degree[lang]} — {item.field[lang]}
                    </h3>
                    {item.status && (
                      <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-paper">
                        {item.status[lang]}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{item.school}</p>
                  <p className="mt-1 font-mono text-xs font-medium uppercase tracking-wide text-accent-red">
                    {item.period[lang]}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
