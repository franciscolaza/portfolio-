import { motion } from 'framer-motion'
import { Github, ExternalLink, ListChecks, Truck, Package, Church, Users } from 'lucide-react'
import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

const projectIcons = {
  'ANTI-FILAHARANA': ListChecks,
  'Système intelligent de suivi logistique': Truck,
  'Bricocentre Stock Management': Package,
  'Site Rhema Sel de la Terre': Church,
  'Gestion du personnel — KARIBOTEL': Users,
}

const accents = ['red', 'teal', 'orange', 'turquoise', 'blue']
const accentStyles = {
  red: { card: 'paper-card-warm', icon: 'bg-accent-red/10 text-accent-red', tag: 'text-accent-red' },
  orange: { card: 'paper-card-warm', icon: 'bg-accent-orange/10 text-accent-orange', tag: 'text-accent-orange' },
  teal: { card: 'paper-card-cool', icon: 'bg-accent-teal/10 text-accent-teal', tag: 'text-accent-teal' },
  turquoise: { card: 'paper-card-cool', icon: 'bg-accent-turquoise/10 text-accent-turquoise', tag: 'text-accent-turquoise' },
  blue: { card: 'paper-card', icon: 'bg-accent-blue/10 text-accent-blue', tag: 'text-accent-blue' },
}

export default function Projects() {
  const { lang } = useLanguage()
  const t = ui[lang].projects

  return (
    <section id="development" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 rounded-full bg-accent-teal/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent-orange/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading label={t.label} title={t.title} description={t.description} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, i) => {
            const Icon = projectIcons[project.name] ?? ListChecks
            const accent = accentStyles[accents[i % accents.length]]
            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-2xl shadow-card transition-shadow ${accent.card}`}
              >
                <div className="relative flex h-44 items-center justify-between overflow-hidden bg-grid px-6">
                  <span className="font-mono text-xs text-ink-faint">
                    {t.projectLabel} {String(i + 1).padStart(2, '0')}
                  </span>
                  <motion.div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${accent.icon}`}
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={28} />
                  </motion.div>
                </div>

                <div className="relative p-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.description[lang]}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tc) => (
                      <span
                        key={tc}
                        className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 font-mono text-xs font-medium text-ink-soft"
                      >
                        {tc}
                      </span>
                    ))}
                  </div>

                  <p className={`mt-4 font-mono text-xs font-medium uppercase tracking-wide ${accent.tag}`}>
                    {project.role[lang]}
                  </p>

                  {(project.github || project.demo) && (
                    <div className="mt-5 flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
                        >
                          <Github size={14} /> {t.github}
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper"
                        >
                          <ExternalLink size={14} /> {t.demo}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
