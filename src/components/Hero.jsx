import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import HeroVisual from './HeroVisual'

const badgeIcon = {
  'React.js': '⚛',
  JavaScript: 'JS',
  'Node.js': '⬢',
  GIS: '🗺',
  PostgreSQL: '▤',
  'Tailwind CSS': '~',
}

export default function Hero() {
  const { lang } = useLanguage()
  const t = ui[lang].hero

  return (
    <section id="home" className="relative overflow-hidden bg-paper pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-dot-grid opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 left-[12%] h-72 w-72 rounded-full bg-accent-yellow/20 blur-[110px]" />
      <div className="pointer-events-none absolute top-10 right-[8%] h-72 w-72 rounded-full bg-accent-teal/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[16rem] px-2 font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.1em] text-ink-soft sm:hidden"
        >
          {profile.heroLabel[lang]}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden items-center justify-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.3em] text-ink-soft sm:flex"
        >
          <span className="h-px w-8 bg-accent-red" />
          {profile.heroLabel[lang]}
          <span className="h-px w-8 bg-accent-teal" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl px-2 font-display text-3xl font-bold uppercase leading-[1.15] tracking-tight text-ink sm:text-5xl sm:leading-[1.05] md:text-6xl"
        >
          {t.headlinePre}
          <span className="text-gradient-art">{t.headlineHighlight}</span>
          {t.headlineMid}
          <span className="text-outline">{t.headlineOutline}</span>.
        </motion.h1>

        <div className="mt-14">
          <HeroVisual />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent-red" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
            <span className="h-px w-10 bg-ink/15" />
          </div>
          <p className="w-full px-2 font-display text-base font-semibold tracking-tight text-ink sm:text-lg md:text-xl">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="w-full px-2 font-mono text-[11px] uppercase tracking-wide text-ink-soft sm:text-xs">
            {t.signatureRoles}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          {profile.tagline[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#development"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper"
          >
            {t.ctaProjects}
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
          >
            <Mail size={16} />
            {t.ctaContact}
          </motion.a>
        </motion.div>

        {profile.cvUrl ? (
          <a
            href={profile.cvUrl}
            download
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <Download size={15} />
            {t.cvDownload}
          </a>
        ) : (
          <span
            className="mt-5 inline-flex cursor-not-allowed items-center gap-2 text-sm font-medium text-ink-faint"
            title={t.cvUnavailable}
          >
            <Download size={15} />
            {t.cvDownload}
          </span>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {profile.badges.map((badge, i) => (
            <span
              key={badge}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all hover:-translate-y-0.5 ${
                i % 2 === 0
                  ? 'border-accent-red/25 bg-accent-red/5 text-ink-soft hover:border-accent-red/50 hover:text-ink'
                  : 'border-accent-teal/25 bg-accent-teal/5 text-ink-soft hover:border-accent-teal/50 hover:text-ink'
              }`}
            >
              <span className={i % 2 === 0 ? 'text-accent-orange' : 'text-accent-teal'}>
                {badgeIcon[badge] ?? '•'}
              </span>
              {badge}
            </span>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-16 inline-flex flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink"
          aria-label="Scroll down"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1"
            aria-hidden="true"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-current"
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
