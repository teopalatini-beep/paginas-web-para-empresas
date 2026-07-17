import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'

type Props = {
  text: string
  as?: 'span' | 'div'
  className?: string
  delayOffset?: number
  perCharDelay?: number
}

export default function StaggeredFade({
  text,
  as = 'span',
  className,
  delayOffset = 0,
  perCharDelay = 0.07,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0 } },
  }

  const child = (i: number): Variants => ({
    hidden: { opacity: 0.001, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.2, 0.7, 0.2, 1],
        delay: delayOffset + i * perCharDelay,
      },
    },
  })

  // Reduced motion or no JS animation: render plain text, visible by default.
  if (reduce) {
    const StaticTag = as
    return <StaticTag className={className} aria-label={text}>{text}</StaticTag>
  }

  const Tag = as === 'div' ? motion.div : motion.span
  const words = text.split(' ')
  let idx = 0

  return (
    <Tag
      ref={ref as never}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      aria-label={text}
    >
      {words.map((word, wIdx) => {
        const chars = Array.from(word)
        return (
          <motion.span
            key={`w-${wIdx}`}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            aria-hidden="true"
          >
            {chars.map((ch) => {
              const i = idx++
              return (
                <motion.span
                  key={`c-${i}`}
                  variants={child(i)}
                  style={{ display: 'inline-block' }}
                >
                  {ch}
                </motion.span>
              )
            })}
            {wIdx < words.length - 1 && (
              <motion.span
                key={`sp-${wIdx}`}
                variants={child(idx++)}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {' '}
              </motion.span>
            )}
          </motion.span>
        )
      })}
    </Tag>
  )
}
