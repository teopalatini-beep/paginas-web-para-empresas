import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'

type Props = {
  text: string
  className?: string
  wordDelay?: number
  delayOffset?: number
  as?: 'p' | 'div' | 'span'
}

export default function StaggeredWords({
  text,
  className,
  wordDelay = 0.05,
  delayOffset = 0,
  as = 'span',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduce = useReducedMotion()

  const words = text.split(' ')

  const container: Variants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0 } },
  }

  const child = (i: number): Variants => ({
    hidden: { opacity: 0.001, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.7, 0.2, 1],
        delay: delayOffset + i * wordDelay,
      },
    },
  })

  if (reduce) {
    const StaticTag = as
    return <StaticTag className={className}>{text}</StaticTag>
  }

  const Tag = as === 'p' ? motion.p : as === 'div' ? motion.div : motion.span

  return (
    <Tag
      ref={ref as never}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={child(i)}
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
