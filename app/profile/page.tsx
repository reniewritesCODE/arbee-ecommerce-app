"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut } from "lucide-react"

// Mock user data
const mockUser = {
  name: "Renie Boy Maglinte",
  email: "renie_gwapo@example.com",
  phone: "+1 (555) 123-4567",
  address: "Purok 3, Ampayon, Butuan City, USA",
  memberSince: "January 2024",
  totalOrders: 12,
  wishlistItems: 8,
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold mb-8">My Profile</h1>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Profile Sidebar */}
              <div className="lg:col-span-1">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-neumorphic">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mb-4" />
                    <h2 className="text-xl font-bold">{mockUser.name}</h2>
                    <p className="text-sm text-muted-foreground">Member since {mockUser.memberSince}</p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Total Orders</span>
                      </div>
                      <span className="font-bold">{mockUser.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Wishlist Items</span>
                      </div>
                      <span className="font-bold">{mockUser.wishlistItems}</span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start rounded-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-full text-destructive hover:text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-neumorphic">
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            defaultValue={mockUser.name}
                            className="pl-10 rounded-full h-12 bg-muted/50 border-0 shadow-neumorphic-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            defaultValue={mockUser.email}
                            className="pl-10 rounded-full h-12 bg-muted/50 border-0 shadow-neumorphic-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue={mockUser.phone}
                          className="pl-10 rounded-full h-12 bg-muted/50 border-0 shadow-neumorphic-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          defaultValue={mockUser.address}
                          className="pl-10 rounded-full h-12 bg-muted/50 border-0 shadow-neumorphic-sm"
                        />
                      </div>
                    </div>
                    <Button size="lg" className="rounded-full h-12 px-8">
                      Save Changes
                    </Button>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-neumorphic">
                  <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                  <div className="space-y-4">
                    {[
                      { id: "#ORD-2024-001", date: "March 15, 2024", total: 299.99, status: "Delivered" },
                      { id: "#ORD-2024-002", date: "March 10, 2024", total: 149.99, status: "In Transit" },
                      { id: "#ORD-2024-003", date: "March 5, 2024", total: 599.99, status: "Delivered" },
                    ].map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${order.total}</p>
                          <p className="text-sm text-accent">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 rounded-full h-12 bg-transparent">
                    View All Orders
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
