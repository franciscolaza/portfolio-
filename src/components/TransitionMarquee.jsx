import Marquee from './Marquee'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'

export default function TransitionMarquee() {
  const { lang } = useLanguage()
  const t = ui[lang]

  const items = [
    <span key="a" className="text-accent-red">
      {t.design.label}
    </span>,
    <span key="b" className="text-outline">
      {t.creativeCode.label}
    </span>,
    <span key="c" className="text-accent-teal">
      {t.projects.label}
    </span>,
  ]

  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-paper py-8 text-ink">
      <Marquee items={items} />
    </div>
  )
}
