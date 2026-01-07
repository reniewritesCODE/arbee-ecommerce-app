import { NextResponse } from "next/server"
import { products } from "@/lib/products"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Type changed to Promise
) {
  const { id } = await params // 2. Await the params
  
  // const product = products.find((p) => p.id === parseInt(id))
  const product = products.find((p) => p.id === id)


  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product) 
}