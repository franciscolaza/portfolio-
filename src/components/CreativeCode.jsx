import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'

const codeTokens = [
  [
    { t: 'const', c: 'text-accent-turquoise' },
    { t: ' creativity ', c: 'text-paper' },
    { t: '=', c: 'text-accent-yellow' },
    { t: ' design ', c: 'text-paper' },
    { t: '+', c: 'text-accent-yellow' },
    { t: ' technology;', c: 'text-paper' },
  ],
  [{ t: '', c: '' }],
  [
    { t: 'function', c: 'text-accent-turquoise' },
    { t: ' buildIdea', c: 'text-accent-yellow' },
    { t: '(idea) {', c: 'text-paper' },
  ],
  [
    { t: '  return', c: 'text-accent-turquoise' },
    { t: ' innovation', c: 'text-accent-yellow' },
    { t: '(idea);', c: 'text-paper' },
  ],
  [{ t: '}', c: 'text-paper' }],
]

const floatingTags = [
  { label: 'React.js', className: 'left-[6%] top-[18%]', delay: 0 },
  { label: 'Tailwind CSS', className: 'right-[8%] top-[28%]', delay: 0.4 },
  { label: 'GIS', className: 'left-[10%] bottom-[16%]', delay: 0.8 },
  { label: 'Node.js', className: 'right-[6%] bottom-[22%]', delay: 1.2 },
]

export default function CreativeCode() {
  const { lang } = useLanguage()
  const t = ui[lang].creativeCode

  return (
    <section id="code" className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden="true" style={{ filter: 'invert(1)' }} />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-teal/10 blur-[120px]" />

      {floatingTags.map((tag) => (
        <motion.span
          key={tag.label}
          className={`pointer-events-none absolute hidden rounded-full border border-paper/15 px-3 py-1.5 font-mono text-[11px] text-paper/50 lg:block ${tag.className}`}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: tag.delay }}
        >
          {tag.label}
        </motion.span>
      ))}

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-accent-turquoise">
          {t.label}
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-paper sm:text-4xl md:text-5xl">
          {t.titlePre}
          <span className="text-gradient-code">{t.titleHighlight}</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/60">{t.description}</p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-xl overflow-hidden rounded-2xl border border-paper/10 bg-charcoal-800 text-left shadow-soft"
        >
          <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-red/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-teal/70" />
            <span className="ml-3 font-mono text-[11px] text-paper/40">creative-code.jsx</span>
          </div>
          <div className="px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm">
            {codeTokens.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.12 }}
                className="flex gap-4"
              >
                <span className="select-none text-paper/25">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  {line.map((tok, j) => (
                    <span key={j} className={tok.c}>
                      {tok.t}
                    </span>
                  ))}
                  {i === codeTokens.length - 1 && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-accent-turquoise align-middle" />
                  )}
                </span>
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
