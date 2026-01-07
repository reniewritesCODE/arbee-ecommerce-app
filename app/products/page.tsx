"use client"

import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { Footer } from "@/components/footer"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import type { Product } from "@/lib/products"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const categories = [
  { value: "all", label: "All Products" },
  { value: "headphones", label: "Headphones" },
  { value: "earbuds", label: "Earbuds" },
  { value: "vr", label: "VR Headsets" },
  { value: "accessories", label: "Accessories" },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const params = new URLSearchParams()
      if (activeCategory !== "all") params.set("category", activeCategory)
      if (searchQuery) params.set("search", searchQuery)

      const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-secondary/30 to-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Browse our complete collection of premium audio equipment
            </p>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 rounded-xl bg-secondary/50 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {products.length} {products.length === 1 ? "product" : "products"}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
