import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { useLang } from '../i18n'

const PHONE = '+5491100000000'
const WSP = '5491100000000'

export default function FloatingActions() {
  const { t } = useLang()
  return (
    <div
      className="fixed right-4 bottom-4 z-40 flex flex-col gap-3"
      style={{
        paddingRight: 'env(safe-area-inset-right, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <motion.a
        href={`https://wa.me/${WSP}?text=${encodeURIComponent('Hola! Necesito un cerrajero')}`}
        target="_blank"
        rel="noopener"
        aria-label={t.floating.whatsapp}
        className="mobile-menu-glass rounded-full w-12 h-12 flex items-center justify-center text-white/90 hover:text-white transition-colors"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <MessageCircle size={20} strokeWidth={1.5} />
      </motion.a>
      <motion.a
        href={`tel:${PHONE}`}
        aria-label={t.floating.call}
        className="liquid-glass rounded-full w-12 h-12 flex items-center justify-center text-white/90 hover:text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <Phone size={20} strokeWidth={1.5} />
      </motion.a>
    </div>
  )
}
