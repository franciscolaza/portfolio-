import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react'
import { profile } from '../data/profile'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'

const initialForm = { name: '', email: '', subject: '', message: '' }

function validate(form, t) {
  const errors = {}
  if (!form.name.trim()) errors.name = t.errorName
  if (!form.email.trim()) {
    errors.email = t.errorEmailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t.errorEmailInvalid
  }
  if (!form.subject.trim()) errors.subject = t.errorSubject
  if (!form.message.trim()) errors.message = t.errorMessage
  return errors
}

export default function Contact() {
  const { lang } = useLanguage()
  const t = ui[lang].contact
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validation = validate(form, t)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    const body = `${t.formName}: ${form.name}\n${t.formEmail}: ${form.email}\n\n${form.message}`
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    setSent(true)
    setForm(initialForm)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-paper-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-yellow/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-label-warm">{t.label}</span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {t.titlePre}
            <span className="text-gradient-art">{t.titleHighlight}</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <a
              href={`mailto:${profile.email}`}
              className="paper-card-warm flex items-center gap-4 rounded-2xl px-6 py-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-red/10 text-accent-red">
                <Mail size={20} />
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-wide text-ink-faint">{t.email}</span>
                <span className="text-sm font-medium text-ink">{profile.email}</span>
              </span>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="paper-card-cool flex items-center gap-4 rounded-2xl px-6 py-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-teal/10 text-accent-teal">
                <Phone size={20} />
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-wide text-ink-faint">{t.phone}</span>
                <span className="text-sm font-medium text-ink">{profile.phone}</span>
              </span>
            </a>

            {profile.socials.whatsapp && (
              <a
                href={profile.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="paper-card flex items-center gap-4 rounded-2xl px-6 py-5 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle size={20} />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-wide text-ink-faint">WhatsApp</span>
                  <span className="text-sm font-medium text-ink">{profile.phone}</span>
                </span>
              </a>
            )}

            <div className="paper-card flex items-center gap-4 rounded-2xl px-6 py-5 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                <MapPin size={20} />
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-wide text-ink-faint">{t.location}</span>
                <span className="text-sm font-medium text-ink">{profile.location}</span>
              </span>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            noValidate
            className="paper-card lg:col-span-3 rounded-2xl p-6 shadow-card sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wide text-ink-faint">
                  {t.formName}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-red/50"
                  placeholder={t.placeholderName}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-accent-red">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wide text-ink-faint">
                  {t.formEmail}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-red/50"
                  placeholder={t.placeholderEmail}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-accent-red">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wide text-ink-faint">
                {t.formSubject}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-red/50"
                placeholder={t.placeholderSubject}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-xs text-accent-red">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wide text-ink-faint">
                {t.formMessage}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="w-full resize-none rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-red/50"
                placeholder={t.placeholderMessage}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-accent-red">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <Send size={16} />
              {t.send}
            </button>

            {sent && (
              <p className="flex items-center gap-2 text-sm text-accent-teal">
                <CheckCircle2 size={16} />
                {t.sentMessage}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
