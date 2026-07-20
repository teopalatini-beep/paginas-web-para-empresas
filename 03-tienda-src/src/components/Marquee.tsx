import { useEffect, useRef } from 'react'

type Props = {
  items: string[]
  speed?: number
  className?: string
}

export default function Marquee({ items, speed = 42, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let offset = 0
    let last = performance.now()
    let raf = 0
    let paused = false
    const halfW = () => el.scrollWidth / 2
    const step = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      if (!paused) {
        offset -= speed * dt
        const hw = halfW()
        if (Math.abs(offset) >= hw) offset += hw
        el.style.transform = `translate3d(${offset}px, 0, 0)`
      }
      raf = requestAnimationFrame(step)
    }
    const onEnter = () => { paused = true }
    const onLeave = () => { paused = false }
    el.parentElement?.addEventListener('mouseenter', onEnter)
    el.parentElement?.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      el.parentElement?.removeEventListener('mouseenter', onEnter)
      el.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [speed])

  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center px-8 font-manrope text-[0.72rem] uppercase font-medium"
            style={{ letterSpacing: '0.28em' }}
          >
            {it}
            <span className="ml-8 opacity-40" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
