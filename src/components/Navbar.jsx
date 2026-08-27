import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, toggleLang } = useLanguage()
  const t = ui[lang].nav

  const links = [
    { label: t.work, href: '#development' },
    { label: t.about, href: '#about' },
    { label: t.design, href: '#design' },
    { label: t.code, href: '#code' },
    { label: t.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-paper/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_8px_30px_rgba(19,18,16,0.08)]' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between" aria-label="Navigation principale">
        <a href="#home" className="font-display text-lg font-bold uppercase tracking-tight text-ink">
          Francisco<span className="text-accent-red">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative inline-block font-mono text-xs font-medium uppercase tracking-wide text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-red transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex items-center rounded-full border border-ink/15 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft hover:border-ink/30 hover:text-ink transition-colors"
            aria-label="Changer de langue"
          >
            <span className={lang === 'fr' ? 'text-ink' : ''}>FR</span>
            <span className="mx-1 text-ink/20">/</span>
            <span className={lang === 'en' ? 'text-ink' : ''}>EN</span>
          </button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:opacity-85 transition-opacity"
          >
            {t.letsTalk}
          </motion.a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex items-center rounded-full border border-ink/15 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft"
            aria-label="Changer de langue"
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink hover:bg-ink/5"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-paper border-t border-ink/10"
          >
            <ul className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft hover:bg-ink/5 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
                >
                  {t.letsTalk}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
