'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export default function Newsletter() {
  const quotes = [
    "\"Life begins after coffee.\nEvery sip awakens the senses and inspires the soul.\"",
    "\"A cup of coffee shared with friends\nturns ordinary moments into cherished memories.\"",
    "\"Coffee is not just a drink.\nIt’s a warm embrace that fuels creativity and joy.\"",
    "\"Behind every successful person\nis a substantial amount of coffee and relentless passion.\"",
    "\"Start your day with coffee in hand,\nand watch the world transform into endless possibilities.\""
  ]

  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#FDF5F3] py-10 px-6 md:px-12 relative">

      <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center relative z-0">
        {/* Left: Image */}
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <Image
            src="news.png"
            alt="Coffee with elegant heart latte art"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-2/3 flex flex-col justify-between">
          
          {/* Top Right: Quotes */}
          <div className="mb-8 min-h-[80px] flex items-start justify-end">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="text-right text-4xl italic text-[#8B5E3C] font-serif" style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {quotes[currentQuote]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom Right: Newsletter Form */}
          <div className="text-right space-y-3">
            <h2 className="text-2xl font-bold">Join in and get 25% OFF!</h2>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter and get $25 OFF discount code.
            </p>
            <div className="flex gap-2 justify-end">
              <Input
                type="email"
                placeholder="Email address"
                className="max-w-xs text-sm"
              />
              <Button className="bg-[#4A3728] hover:bg-[#3A2718] text-white text-sm px-4 py-2">
                Subscribe
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
