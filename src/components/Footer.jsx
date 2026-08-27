import { Github, Linkedin, Mail, Instagram, MessageCircle } from 'lucide-react'
import { profile } from '../data/profile'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'

export default function Footer() {
  const { lang } = useLanguage()
  const t = ui[lang].footer

  return (
    <footer className="relative border-t border-paper/10 bg-charcoal py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-base font-bold uppercase tracking-tight text-paper">{profile.name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-paper/50">
            {t.roleLine}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:border-accent-teal/50 hover:text-paper transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:border-accent-teal/50 hover:text-paper transition-colors"
            >
              <Linkedin size={16} />
            </a>
          )}
          {profile.socials.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:border-accent-red/50 hover:text-paper transition-colors"
            >
              <Instagram size={16} />
            </a>
          )}
          {profile.socials.whatsapp && (
            <a
              href={profile.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:border-[#25D366]/60 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle size={16} />
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:border-accent-teal/50 hover:text-paper transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <p className="mt-6 text-center font-mono text-xs text-paper/30">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
