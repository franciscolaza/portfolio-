import { motion } from 'framer-motion'
import { Code2, Server, Database, Wrench } from 'lucide-react'
import { skillCategories } from '../data/skills'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
}

export default function Skills() {
  const { lang } = useLanguage()
  const t = ui[lang].skills

  return (
    <section id="skills" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-24 -top-10 h-80 w-80 rounded-full bg-accent-blue/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-red/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading label={t.label} title={t.title} description={t.description} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => {
            const Icon = categoryIcons[category.key] ?? Code2
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="paper-card rounded-2xl p-6 shadow-card"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-teal/10 text-accent-teal">
                  <Icon size={22} />
                </div>
                <h3 className="mb-4 text-lg font-semibold text-ink">{category.title[lang]}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-3">
                      <span className="text-sm text-ink">{skill.name}</span>
                      <span className="flex gap-1">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag.fr}
                            className="rounded-full border border-ink/10 bg-ink/[0.03] px-2 py-0.5 font-mono text-[10px] font-medium text-ink-faint"
                          >
                            {tag[lang]}
                          </span>
                        ))}
                      </span>
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
