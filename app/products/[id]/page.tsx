"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { Product } from "@/lib/products"
import Image from "next/image"
import { Star, ShoppingCart, Heart, Check } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const res = await fetch(`/api/products/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setProduct(data)
        setSelectedColor(data.colors[0])

        // Fetch related products
        const relatedRes = await fetch(`/api/products?category=${data.category}`)
        const relatedData = await relatedRes.json()
        setRelatedProducts(relatedData.filter((p: Product) => p.id !== data.id).slice(0, 4))
      }
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product not found</h1>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Product Details */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="sticky top-24 aspect-square rounded-3xl bg-gradient-to-br from-secondary/50 to-muted/50 p-12 shadow-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-8 rounded-2xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium w-fit mb-4">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </div>

              <h1 className="text-4xl font-bold mb-4 text-balance">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <p className="text-3xl font-bold mb-6">${product.price}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">Available Colors</p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 w-10 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-accent scale-110" : "border-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-5 w-5 text-accent" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-5 w-5 text-accent" />
                  <span>1-year warranty included</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button size="lg" onClick={handleAddToCart} className="flex-1 rounded-full h-12 gap-2" disabled={added}>
                  {added ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-12 px-6 bg-transparent">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border">
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
