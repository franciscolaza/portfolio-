import { ImagePlus } from 'lucide-react'
import BrushBlob from './BrushBlob'

export default function PlaceholderCard({ label, className = '' }) {
  return (
    <div
      className={`relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-paper-soft/60 p-6 text-center ${className}`}
    >
      {/* designer side hint — soft brush color */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 opacity-30 blur-[2px]" aria-hidden="true">
        <BrushBlob colorClass="text-accent-red/70" path={0} />
      </div>
      <div className="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 opacity-25" aria-hidden="true">
        <BrushBlob colorClass="text-accent-yellow/70" path={1} />
      </div>

      {/* dev side hint — code grid + fragments */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-grid opacity-[0.18]" aria-hidden="true" />
      <span
        className="pointer-events-none absolute right-5 top-5 font-mono text-[11px] text-accent-teal/40"
        aria-hidden="true"
      >
        {'</>'}
      </span>
      <span
        className="pointer-events-none absolute right-6 bottom-9 font-mono text-[11px] text-accent-teal/40"
        aria-hidden="true"
      >
        {'{ }'}
      </span>

      <ImagePlus size={28} className="relative text-ink-faint" />
      <p className="relative font-mono text-xs uppercase tracking-wide text-ink-faint">{label}</p>
    </div>
  )
}
