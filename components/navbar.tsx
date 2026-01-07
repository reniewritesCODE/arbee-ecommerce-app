"use client"

import type React from "react"

import Link from "next/link"
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchSuggestions } from "./search-suggestions"

export function Navbar() {
  const { totalItems } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setMobileMenuOpen(false)
      setSearchQuery("")
    }
  }

  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <nav className="sticky top-4 z-50 mx-4 lg:mx-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-neumorphic border border-white/40 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground shadow-lg">
                <div className="text-xl font-bold text-background">rd</div>
              </div>
              <span className="text-xl font-bold tracking-tight hidden md:inline">arbee.</span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:block relative">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(e.target.value.trim().length > 0)
                  }}
                  onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
                  className="pl-4 pr-12 h-12 bg-muted/50 border-0 rounded-full shadow-neumorphic-sm focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-foreground hover:bg-foreground/90"
                >
                  <Search className="h-5 w-5 text-background" />
                </Button>
                {showSuggestions && (
                  <SearchSuggestions
                    query={searchQuery}
                    onSelect={() => {
                      setShowSuggestions(false)
                      setSearchQuery("")
                    }}
                  />
                )}
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic relative"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground shadow-lg">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Shopping Bag</span>
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden h-12 w-12 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pt-4 border-t border-white/20 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex gap-2 relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(e.target.value.trim().length > 0)
                  }}
                  onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
                  className="flex-1 pl-4 h-10 bg-muted/50 border-0 rounded-full shadow-neumorphic-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-foreground hover:bg-foreground/90 flex-shrink-0"
                >
                  <Search className="h-4 w-4 text-background" />
                </Button>
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 w-full">
                    <SearchSuggestions
                      query={searchQuery}
                      onSelect={() => {
                        setShowSuggestions(false)
                        setSearchQuery("")
                        setMobileMenuOpen(false)
                      }}
                    />
                  </div>
                )}
              </form>

              {/* Mobile Links */}
              <div className="grid grid-cols-3 gap-2">
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic relative mx-auto"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground shadow-lg">
                        {totalItems}
                      </span>
                    )}
                    <span className="sr-only">Shopping Bag</span>
                  </Button>
                </Link>
                <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic mx-auto"
                  >
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    <span className="sr-only">Wishlist</span>
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-card shadow-neumorphic-sm hover:shadow-neumorphic mx-auto"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
