"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Music2, Twitter, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative px-4 lg:px-8 pt-8 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-card/80 backdrop-blur-xl rounded-[2.5rem] shadow-neumorphic-lg border border-white/40 p-8 lg:p-12 overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                <Music2 className="h-4 w-4" />
                Music is Classic
              </div>
              <h1 className="text-balance text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                Maanindut nga mga Sonata.
              </h1>

              <div className="flex items-start gap-4 mb-8">
                <div className="text-6xl font-bold text-muted-foreground/30">01</div>
                <div className="flex-1 pt-4">
                  <div className="h-px bg-border mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Clear Sounds</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Making your dream music come true stay with Sequios Sounds!
                  </p>
                </div>
              </div>

              <Link href="/products">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-base bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg w-fit group"
                >
                  View All Products
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>

              <div className="flex items-center gap-6 mt-8 text-muted-foreground">
                <span className="text-sm">Follow us on:</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.4-.05z" />
                    </svg>
                    <span className="sr-only">TikTok</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="none" fill="currentColor" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Product Image with floating elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square">
                {/* Decorative circles */}
                <div className="absolute top-1/4 left-1/4 h-3 w-3 rounded-full bg-muted-foreground/20" />
                <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-muted-foreground/30" />
                <div className="absolute bottom-1/3 left-1/3 h-4 w-4 rounded-full bg-chart-1/30" />
                <div className="absolute bottom-1/4 right-1/3 h-3 w-3 rounded-full bg-muted-foreground/20" />

                {/* Main product image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/premium-black-over-ear-headphones-floating.jpg"
                    alt="Premium Headphones"
                    width={500}
                    height={500}
                    className="object-contain drop-shadow-2xl rounded-3xl"
                    priority
                  />
                </div>

                {/* Decorative diamond shape */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-8 w-8 rotate-45 border-2 border-muted-foreground/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
