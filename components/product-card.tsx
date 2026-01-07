"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ArrowUpRight } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { motion } from "framer-motion"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="group bg-card/80 backdrop-blur-xl rounded-3xl shadow-neumorphic border border-white/40 overflow-hidden transition-all hover:shadow-neumorphic-lg">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted/30 rounded-2xl">
            {/* Floating arrow button */}
            <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card shadow-neumorphic-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-8 transition-transform duration-500 group-hover:scale-110 rounded-2xl"
            />
          </div>
        </Link>
        <div className="p-6">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
            <p className="text-2xl font-bold">${product.price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
