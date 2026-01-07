"use client"

import { useState, useEffect, useRef } from "react"
import { products } from "@/lib/products"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchSuggestionsProps {
  query: string
  onSelect: () => void
}

export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<typeof products>([])
  const [isOpen, setIsOpen] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()),
    )

    setSuggestions(filtered)
    setIsOpen(filtered.length > 0)
  }, [query])

  const handleSelectProduct = (productId: string) => {
    router.push(`/products/${productId}`)
    setIsOpen(false)
    onSelect()
  }

  if (!isOpen || suggestions.length === 0) {
    return null
  }

  return (
    <div
      ref={suggestionsRef}
      className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-neumorphic-lg overflow-hidden z-40"
    >
      <div className="max-h-96 overflow-y-auto">
        {suggestions.slice(0, 6).map((product) => (
          <button
            key={product.id}
            onClick={() => handleSelectProduct(product.id)}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left border-b border-white/10 last:border-b-0"
          >
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{product.name}</p>
              <p className="text-sm text-muted-foreground truncate">${product.price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
