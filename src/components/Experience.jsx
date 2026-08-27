import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experiences } from '../data/experiences'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const { lang } = useLanguage()
  const t = ui[lang].experience

  return (
    <section id="experience" className="relative overflow-hidden bg-paper-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-accent-orange/15 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent-teal/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading label={t.label} title={t.title} />

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent-red via-accent-orange to-accent-teal sm:left-6" />

          <ol className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16 sm:pl-20"
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-accent-red/40 bg-paper-white text-accent-red sm:h-12 sm:w-12">
                  <Briefcase size={18} />
                </span>

                <div className="paper-card rounded-2xl p-6 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-ink">{exp.title}</h3>
                    <span className="font-mono text-xs font-medium uppercase tracking-wide text-accent-teal">
                      {exp.period[lang]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink-soft">{exp.role[lang]}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{exp.description[lang]}</p>

                  {exp.missions && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                      {exp.missions.map((m) => (
                        <li key={m.fr}>{m[lang]}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tech.map((tc) => (
                      <span
                        key={tc}
                        className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 font-mono text-xs font-medium text-ink-soft"
                      >
                        {tc}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
