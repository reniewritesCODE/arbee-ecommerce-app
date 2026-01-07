"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import type { Product } from "@/lib/products"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

const categories = [
  { value: "all", label: "All Products" },
  { value: "headphones", label: "Headphones" },
  { value: "earbuds", label: "Earbuds" },
  { value: "vr", label: "VR Headsets" },
  { value: "accessories", label: "Accessories" },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const url = activeCategory === "all" ? "/api/products" : `/api/products?category=${activeCategory}`
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [activeCategory])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        <section className="mx-4 lg:mx-8 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="gap-6 lg:grid-cols-[1fr_320px]">
              {/* Main content */}
              <div>
                {/* More Products Section */}
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-neumorphic border border-white/40 p-8 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">More Products</h2>
                      <p className="text-sm text-muted-foreground">460 plus items.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {products.slice(0, 3).map((product) => (
                      <a
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group aspect-square rounded-2xl bg-card shadow-neumorphic-sm p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <div className="relative w-full h-full flex items-center justify-center mb-2">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300 rounded-xl"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/0 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                          <p className="text-xs font-semibold text-background text-center mb-1">{product.name}</p>
                          <p className="text-sm font-bold text-accent">${product.price}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="mb-6">
                  <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                  />
                </div>

                {loading ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-96 rounded-3xl bg-card/50 animate-pulse shadow-neumorphic-sm" />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.slice(0, 6).map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar
              <div className="space-y-6"> */}
                {/* Featured Product 1 */}
                {/* <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-neumorphic border border-white/40 p-6 relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card shadow-neumorphic-sm flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    New Gen
                    <br />
                    X-Bud
                  </h3>
                  <div className="relative aspect-square mt-4">
                    <Image
                      src="/white-wireless-earbuds-in-charging-case.jpg"
                      alt="New Gen X-Bud"
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>
                </div> */}

                {/* Featured Product 2 */}
                {/* <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-neumorphic border border-white/40 p-6 relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card shadow-neumorphic-sm flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div className="relative aspect-square mb-4">
                    <Image
                      src="/futuristic-white-vr-headset-floating.jpg"
                      alt="VR Headset"
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-1">Light Grey Surface Headphone</h3>
                  <p className="text-sm text-muted-foreground">Boosted with bass</p>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
