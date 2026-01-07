import { NextResponse } from "next/server"
import { products } from "@/lib/products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filteredProducts = products

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
    )
  }

  return NextResponse.json(filteredProducts)
}
