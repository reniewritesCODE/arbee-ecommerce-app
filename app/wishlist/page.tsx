"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

// Mock wishlist data
const mockWishlistItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/premium-black-over-ear-headphones-floating.jpg",
    inStock: true,
  },
  {
    id: "3",
    name: "VR Headset Pro",
    price: 599.99,
    image: "/futuristic-white-vr-headset-floating.jpg",
    inStock: true,
  },
  {
    id: "5",
    name: "Gaming Headset Elite",
    price: 179.99,
    image: "/professional-studio-headphones-black.jpg",
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md px-4"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-secondary p-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Save your favorite products here so you can easily find them later.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative rounded-3xl border border-border bg-card p-6 shadow-neumorphic hover:shadow-neumorphic-lg transition-all"
              >
                {/* Remove Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic z-10"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>

                {/* Product Image */}
                <Link href={`/products/${item.id}`}>
                  <div className="relative aspect-square mb-4 rounded-2xl bg-secondary/30 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain p-6 rounded-xl"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="space-y-3">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-lg hover:text-accent transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">${item.price}</p>
                    {!item.inStock && (
                      <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <Button size="lg" className="w-full rounded-full h-12" disabled={!item.inStock}>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
