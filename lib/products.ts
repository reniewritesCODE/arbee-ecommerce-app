export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "headphones" | "earbuds" | "vr" | "accessories"
  rating: number
  reviews: number
  colors: string[]
  featured?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "AirWave Pro Max",
    description:
      "Premium over-ear headphones with active noise cancellation and spatial audio. Experience studio-quality sound with up to 30 hours of battery life.",
    price: 549,
    image: "/premium-black-over-ear-headphones-floating.jpg",
    category: "headphones",
    rating: 4.8,
    reviews: 2847,
    colors: ["#000000", "#E5E5E5", "#4A5568"],
    featured: true,
  },
  {
    id: "2",
    name: "SonicBuds Ultra",
    description:
      "True wireless earbuds with adaptive EQ and transparency mode. Perfect fit with three size options and IPX4 water resistance.",
    price: 249,
    image: "/white-wireless-earbuds-in-charging-case.jpg",
    category: "earbuds",
    rating: 4.6,
    reviews: 1923,
    colors: ["#FFFFFF", "#000000", "#8B5CF6"],
  },
  {
    id: "3",
    name: "Vision VR Elite",
    description:
      "Next-generation virtual reality headset with 4K display and 120Hz refresh rate. Immerse yourself in stunning virtual worlds.",
    price: 899,
    image: "/futuristic-white-vr-headset-floating.jpg",
    category: "vr",
    rating: 4.9,
    reviews: 1456,
    colors: ["#FFFFFF", "#1F2937"],
  },
  {
    id: "4",
    name: "BassWave Studio",
    description:
      "Professional studio headphones with precision-tuned drivers. Ideal for music production and critical listening.",
    price: 399,
    image: "/professional-studio-headphones-black.jpg",
    category: "headphones",
    rating: 4.7,
    reviews: 892,
    colors: ["#000000", "#DC2626"],
  },
  {
    id: "5",
    name: "MicroBuds Sport",
    description:
      "Lightweight sport earbuds with secure fit and sweat resistance. Perfect companion for your active lifestyle.",
    price: 179,
    image: "/sport-earbuds-black-and-red.jpg",
    category: "earbuds",
    rating: 4.5,
    reviews: 2134,
    colors: ["#000000", "#10B981", "#F59E0B"],
  },
  {
    id: "6",
    name: "Quantum VR Pro",
    description:
      "Advanced VR system with hand tracking and room-scale tracking. Experience the future of immersive entertainment.",
    price: 1299,
    image: "/advanced-black-vr-headset-with-controllers.jpg",
    category: "vr",
    rating: 4.8,
    reviews: 743,
    colors: ["#000000"],
  },
  {
    id: "7",
    name: "ClearSound Wireless",
    description:
      "Comfortable wireless headphones with crystal-clear audio and all-day battery. Perfect for work and travel.",
    price: 299,
    image: "/modern-wireless-headphones-silver.jpg",
    category: "headphones",
    rating: 4.4,
    reviews: 1567,
    colors: ["#E5E5E5", "#000000", "#3B82F6"],
  },
  {
    id: "8",
    name: "Premium Carry Case",
    description: "Luxury carrying case with premium materials. Protect your audio equipment in style.",
    price: 79,
    image: "/premium-black-headphone-case.jpg",
    category: "accessories",
    rating: 4.6,
    reviews: 456,
    colors: ["#000000", "#78716C"],
  },
]
