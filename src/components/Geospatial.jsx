import { motion } from 'framer-motion'
import { Map, Layers, Satellite, LineChart, Navigation, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../i18n/ui'
import SectionHeading from './SectionHeading'

const highlights = [
  {
    icon: Map,
    title: { fr: 'Ingénierie Géospatiale', en: 'Geospatial Engineering' },
    desc: {
      fr: 'Analyse et traitement de données spatiales appliquées à des problématiques concrètes.',
      en: 'Analysis and processing of spatial data applied to real-world problems.',
    },
  },
  {
    icon: Layers,
    title: { fr: 'Web Mapping', en: 'Web Mapping' },
    desc: {
      fr: 'Conception d’interfaces cartographiques interactives pour le web.',
      en: 'Design of interactive cartographic interfaces for the web.',
    },
  },
  {
    icon: Satellite,
    title: { fr: 'Données spatiales', en: 'Spatial Data' },
    desc: {
      fr: 'Manipulation de coordonnées, géolocalisation et systèmes d’information géographique.',
      en: 'Handling coordinates, geolocation and geographic information systems.',
    },
  },
  {
    icon: LineChart,
    title: { fr: 'Data Visualization', en: 'Data Visualization' },
    desc: {
      fr: 'Représentation visuelle de données pour faciliter la compréhension et la décision.',
      en: 'Visual representation of data to support understanding and decision-making.',
    },
  },
]

const points = [
  { x: 60, y: 60 }, { x: 140, y: 100 }, { x: 230, y: 50 },
  { x: 300, y: 130 }, { x: 200, y: 190 }, { x: 100, y: 210 }, { x: 340, y: 220 },
]

const links = [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [4, 6], [3, 6]]
const livePointIndex = 4

const layerRows = [
  { fr: 'Couche vectorielle', en: 'Vector layer', on: true },
  { fr: 'Courbes de niveau', en: 'Contours', on: true },
  { fr: 'Imagerie satellite', en: 'Satellite imagery', on: false },
  { fr: 'Routes', en: 'Roads', on: true },
]

export default function Geospatial() {
  const { lang } = useLanguage()
  const t = ui[lang].geospatial

  return (
    <section id="geospatial" className="relative overflow-hidden bg-paper-white py-24 sm:py-32">
      {/* topographic contour backdrop across the whole section */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M -50 ${60 + i * 70} Q 300 ${10 + i * 70} 700 ${90 + i * 70} T 1500 ${50 + i * 70}`}
            stroke="#3E5C82"
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading label={t.label} title={t.title} description={t.description} />

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {highlights.map((h) => (
              <div key={h.title.fr} className="paper-card rounded-2xl p-6 shadow-card">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                  <h.icon size={20} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-ink">{h.title[lang]}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{h.desc[lang]}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square w-full max-w-lg mx-auto"
          >
            <div className="absolute inset-0 rounded-3xl border border-ink/10 bg-grid noise-overlay bg-paper" />
            <div className="pointer-events-none absolute inset-10 rounded-full bg-accent-teal/10 blur-3xl" />

            <svg viewBox="0 0 400 280" className="absolute inset-0 h-full w-full p-8">
              <defs>
                <linearGradient id="geo-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3E5C82" />
                  <stop offset="100%" stopColor="#4FB8AC" />
                </linearGradient>
                <pattern id="graticule" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#131210" strokeOpacity="0.08" strokeWidth="0.5" />
                </pattern>
              </defs>

              <rect x="0" y="0" width="400" height="280" fill="url(#graticule)" />

              <g opacity="0.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <path
                    key={`c${i}`}
                    d={`M ${20 + i * 20} 20 Q ${200} ${40 + i * 30} ${380 - i * 15} ${240 - i * 10}`}
                    stroke="#131210"
                    strokeOpacity="0.15"
                    strokeWidth="0.6"
                    fill="none"
                  />
                ))}
              </g>

              <motion.polygon
                points={`${points[0].x},${points[0].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y} ${points[6].x},${points[6].y} ${points[5].x},${points[5].y}`}
                fill="#3E5C82"
                fillOpacity="0.07"
                stroke="#3E5C82"
                strokeOpacity="0.25"
                strokeWidth="1"
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              {links.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={points[a].x}
                  y1={points[a].y}
                  x2={points[b].x}
                  y2={points[b].y}
                  stroke="url(#geo-line)"
                  strokeWidth="1.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12 }}
                />
              ))}

              {points.map((p, i) => (
                <motion.g key={i}>
                  <circle cx={p.x} cy={p.y} r="10" fill="#D6472B" opacity="0.1" />
                  <circle cx={p.x} cy={p.y} r="4" fill="#3E5C82" />
                  {i === livePointIndex && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="none"
                      stroke="#D6472B"
                      strokeWidth="1.5"
                      initial={{ opacity: 0.8, scale: 1 }}
                      animate={{ opacity: [0.8, 0], scale: [1, 3.2] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                    />
                  )}
                </motion.g>
              ))}

              {/* compass rose */}
              <g transform="translate(358, 246)" opacity="0.75">
                <circle r="16" fill="none" stroke="#131210" strokeOpacity="0.2" strokeWidth="1" />
                <motion.g
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '0px 0px' }}
                >
                  <path d="M0,-13 L4,0 L0,13 L-4,0 Z" fill="#D6472B" />
                </motion.g>
                <text x="0" y="-19" textAnchor="middle" fontSize="8" fill="#131210" fontFamily="monospace">N</text>
              </g>
            </svg>

            {/* scale bar */}
            <div className="paper-card absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1 shadow-soft-sm">
              <span className="h-1.5 w-10 border-b border-l border-r border-ink/50" />
              <span className="font-mono text-[10px] text-ink-soft">250 m</span>
            </div>

            <span className="paper-card absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[11px] text-accent-blue shadow-soft-sm">
              <Navigation size={10} />
              EPSG:4326
            </span>
            <span className="paper-card absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] text-accent-teal shadow-soft-sm">
              {t.vectorLayer}
            </span>

            {/* layers panel */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="paper-card absolute -left-6 bottom-10 hidden w-40 rounded-xl p-3 shadow-soft-sm sm:block"
            >
              <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
                Layers
              </p>
              <ul className="space-y-1.5">
                {layerRows.map((row) => (
                  <li key={row.fr} className="flex items-center gap-2">
                    <span
                      className={`flex h-3 w-3 items-center justify-center rounded-sm border ${
                        row.on ? 'border-accent-teal bg-accent-teal' : 'border-ink/25 bg-transparent'
                      }`}
                    >
                      {row.on && <Check size={8} className="text-paper" strokeWidth={3} />}
                    </span>
                    <span className="font-mono text-[10px] text-ink-soft">{row[lang]}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
