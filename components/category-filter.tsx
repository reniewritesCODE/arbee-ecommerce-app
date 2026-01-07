"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: { value: string; label: string }[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? "default" : "outline"}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            "rounded-full transition-all shadow-neumorphic-sm hover:shadow-neumorphic border-white/40",
            activeCategory === category.value
              ? "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              : "bg-card/80 backdrop-blur-xl hover:bg-card",
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
