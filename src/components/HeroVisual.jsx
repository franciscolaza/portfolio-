import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import laza from '../assets/laza-fade.png'
import BrushBlob from './BrushBlob'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'

const mergeLines = [
  '$ git merge design',
  'Auto-merging portfolio.jsx',
  "Merge made by the 'ort' strategy.",
  '✓ Merge successful',
]

function useTypewriter(lines, speed = 32, pause = 2800) {
  const full = lines.join('\n')
  const [count, setCount] = useState(0)

  useEffect(() => {
    let i = 0
    let intervalId
    let timeoutId

    const type = () => {
      intervalId = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= full.length) {
          clearInterval(intervalId)
          timeoutId = setTimeout(() => {
            i = 0
            setCount(0)
            type()
          }, pause)
        }
      }, speed)
    }

    type()
    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [full, speed, pause])

  return full.slice(0, count)
}

export default function HeroVisual() {
  const { lang } = useLanguage()
  const t = ui[lang].heroVisual
  const typed = useTypewriter(mergeLines)
  const typedLines = typed.split('\n')

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[23rem_auto_23rem] lg:gap-6">
      {/* ART SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="order-2 text-center lg:order-1 lg:text-right"
      >
        <p className="relative inline-block font-display text-6xl font-bold leading-none tracking-tight text-ink sm:text-7xl">
          <svg
            viewBox="0 0 260 90"
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 text-accent-teal/50"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M14 68 C 60 20, 90 78, 130 34 S 200 12, 246 46"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
            />
          </svg>
          {t.designerLabel}
          <svg
            viewBox="0 0 240 20"
            className="absolute -bottom-2 left-0 h-4 w-full text-accent-yellow"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M2 14 Q 60 2 120 12 T 238 8"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
            />
          </svg>
          {[
            { c: 'bg-accent-red', pos: 'left-1 -top-4', delay: 1.5 },
            { c: 'bg-accent-yellow', pos: 'right-4 -top-6', delay: 1.7 },
            { c: 'bg-accent-teal', pos: 'right-10 -bottom-3', delay: 1.9 },
          ].map((dab, i) => (
            <motion.span
              key={i}
              className={`pointer-events-none absolute h-2.5 w-2.5 rounded-full ${dab.c} ${dab.pos}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5, delay: dab.delay, ease: 'easeOut' }}
              aria-hidden="true"
            />
          ))}
        </p>
        <p className="mx-auto mt-4 max-w-[15rem] font-mono text-xs uppercase tracking-wide text-ink-soft lg:ml-auto lg:mr-0">
          {t.designerTag}
        </p>
      </motion.div>

      {/* PORTRAIT / TRANSITION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative order-1 mx-auto w-72 sm:w-[24rem] lg:order-2 lg:w-[28rem]"
      >
        <motion.div
          className="pointer-events-none absolute -left-6 top-2 -z-10 h-32 w-32 opacity-60 blur-[2px]"
          animate={{ rotate: [0, 6, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrushBlob colorClass="text-accent-red/70" path={0} />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute -right-4 -top-4 -z-10 h-24 w-24 opacity-50 blur-[1px]"
          animate={{ rotate: [0, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <BrushBlob colorClass="text-accent-yellow/70" path={1} />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute -right-6 bottom-6 -z-10 h-20 w-20 opacity-40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <BrushBlob colorClass="text-accent-teal/60" path={0} />
        </motion.div>

        <div className="relative aspect-[571/421] w-full">
          {/* ART HALF — painted reveal */}
          <motion.img
            src={laza}
            alt="Portrait créatif de Ralahinirina Lazaniaina Francisco — côté design"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 50% 0 0)' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 h-full w-full object-contain mix-blend-multiply"
            style={{
              maskImage: 'linear-gradient(to bottom, black 78%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 96%)',
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ x: '-20%', opacity: 0 }}
            animate={{ x: '120%', opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            style={{
              clipPath: 'inset(0 50% 0 0)',
              background:
                'linear-gradient(100deg, transparent 30%, rgba(214,71,43,0.5) 45%, rgba(231,185,74,0.5) 55%, rgba(47,143,130,0.4) 65%, transparent 80%)',
              mixBlendMode: 'multiply',
            }}
            aria-hidden="true"
          />

          {/* CODE HALF — fade in */}
          <motion.img
            src={laza}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
            className="absolute inset-0 h-full w-full object-contain mix-blend-multiply"
            style={{
              clipPath: 'inset(0 0 0 50%)',
              maskImage: 'linear-gradient(to bottom, black 78%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 96%)',
            }}
          />

          {/* code fragments emerging from the code half */}
          {[
            { text: '</>', top: '18%', delay: 0 },
            { text: '{ }', top: '42%', delay: 1.3 },
            { text: '01', top: '64%', delay: 2.6 },
            { text: 'fn()', top: '82%', delay: 0.7 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute right-[6%] select-none font-mono text-xs font-semibold text-accent-turquoise/70"
              style={{ top: p.top }}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 44], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, delay: 1.4 + p.delay, repeat: Infinity, repeatDelay: 4.4, ease: 'easeOut' }}
              aria-hidden="true"
            >
              {p.text}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="paper-card absolute -left-4 top-10 flex items-center gap-2 rounded-xl px-3 py-2 shadow-soft-sm sm:-left-8"
        >
          <MapPin size={13} className="text-accent-red" />
          <span className="text-[11px] font-mono text-ink-soft">-18.8792, 47.5079</span>
        </motion.div>

        <motion.span
          className="absolute right-1 top-1/4 h-3 w-3 rounded-full bg-accent-teal shadow-soft-sm"
          animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* CODE SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="order-3 text-center lg:text-left"
      >
        <p className="font-mono text-6xl font-bold tracking-tight text-ink sm:text-7xl">
          <span className="text-accent-teal">{'<'}</span>
          {t.coderLabel}
          <span className="text-accent-teal">{'>'}</span>
        </p>
        <p className="mx-auto mt-4 max-w-[15rem] font-mono text-xs uppercase tracking-wide text-ink-soft lg:mx-0">
          {t.coderTag}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-4 w-full max-w-[15rem] overflow-hidden rounded-lg border border-ink/10 bg-charcoal px-3 py-2.5 text-left shadow-soft-sm lg:mx-0"
        >
          {typedLines.map((line, i) => (
            <p key={i} className="whitespace-pre font-mono text-[10px] leading-relaxed text-accent-turquoise">
              {i === 0 ? line : <span className="text-paper/70">{line}</span>}
              {i === typedLines.length - 1 && (
                <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-accent-turquoise align-middle" />
              )}
            </p>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
