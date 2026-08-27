import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import laza from '../assets/laza.jpg'
import sundayService from '../assets/album/sunday-service.webp'
import olannyFitserantena from '../assets/album/olanny-fitserantena.webp'
import { expertise } from '../data/expertise'
import { designProjects } from '../data/designProjects'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'
import PlaceholderCard from './PlaceholderCard'

const images = { laza, sundayService, olannyFitserantena }

export default function DesignSection() {
  const { lang } = useLanguage()
  const t = ui[lang].design
  const designTags = expertise.find((e) => e.id === 'design')?.tags ?? []
  const viewable = designProjects.filter((p) => p.image)
  const [activeId, setActiveId] = useState(null)
  const activeIndex = viewable.findIndex((p) => p.id === activeId)

  const close = () => setActiveId(null)
  const prev = () => setActiveId(viewable[(activeIndex - 1 + viewable.length) % viewable.length].id)
  const next = () => setActiveId(viewable[(activeIndex + 1) % viewable.length].id)

  useEffect(() => {
    if (activeId === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeId, activeIndex])

  return (
    <section id="design" className="relative overflow-hidden bg-paper-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-24 -top-10 h-96 w-96 rounded-full bg-accent-yellow/25 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-accent-red/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-80 w-80 rounded-full bg-accent-teal/20 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          tone="design"
          label={t.label}
          title={t.title}
          description={t.description}
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {designTags.map((tag) => (
            <span
              key={tag.fr}
              className="rounded-full border border-accent-red/25 bg-accent-red/5 px-3 py-1 font-mono text-xs font-medium text-ink-soft"
            >
              {tag[lang]}
            </span>
          ))}
        </div>

        <div className="columns-1 gap-6 sm:columns-2">
          {designProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-card"
            >
              {project.image ? (
                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  className="relative block w-full overflow-hidden rounded-2xl bg-paper-soft text-left"
                >
                  <span className="absolute left-4 top-4 z-10 font-mono text-xs font-semibold text-paper drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={images[project.image]}
                    alt={project.title[lang]}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-display text-base font-bold uppercase tracking-tight text-paper sm:text-lg">
                      {project.title[lang]}
                    </span>
                    <span className="mt-1 text-xs leading-relaxed text-paper/75 sm:text-sm">
                      {project.description[lang]}
                    </span>
                  </div>
                </button>
              ) : (
                <>
                  <span className="absolute left-4 top-4 z-10 font-mono text-xs text-ink-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <PlaceholderCard label={t.comingSoon} />
                </>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="paper-card-warm mx-auto mt-4 flex max-w-2xl flex-col items-center gap-3 rounded-2xl p-6 text-center shadow-card"
        >
          <p className="text-sm leading-relaxed text-ink-soft">{t.footerText}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-red hover:text-ink"
          >
            <Mail size={15} />
            {ui[lang].hero.ctaContact}
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 p-4 sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper hover:bg-paper/10 sm:right-6 sm:top-6"
            >
              <X size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 text-paper hover:bg-paper/10 sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 text-paper hover:bg-paper/10 sm:right-6"
            >
              <ChevronRight size={20} />
            </button>

            {activeIndex >= 0 && (
              <motion.div
                key={viewable[activeIndex].id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="max-h-[85vh] max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[viewable[activeIndex].image]}
                  alt={viewable[activeIndex].title[lang]}
                  className="max-h-[75vh] w-full rounded-xl object-contain"
                />
                <div className="mt-4 text-center">
                  <p className="font-display text-lg font-bold uppercase tracking-tight text-paper">
                    {viewable[activeIndex].title[lang]}
                  </p>
                  <p className="mt-1 text-sm text-paper/60">{viewable[activeIndex].description[lang]}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
