"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import { getFeaturedProducts } from "@/data/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src="/images/logo.webp"
                  alt="Nebula Pets"
                  fill
                  className="object-contain rounded-2xl"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">Ethically Sourced Exotics</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-gradient">Nebula Pets</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Your premier destination for exotic fish, amphibians, and aquatic wonders. 
              Expertly delivered from the cosmos to your aquarium.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/shop">
                <Button size="lg" className="gap-2 bg-blue-500 hover:bg-blue-600">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop/fish">
                <Button size="lg" variant="outline" className="gap-2 border-white/20">
                  View Fish
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Live Arrival Guarantee",
                description: "Every creature arrives healthy or we replace it free. No questions asked.",
              },
              {
                icon: Sparkles,
                title: "Expert Care Guides",
                description: "Detailed species-specific care instructions with every order.",
              },
              {
                icon: Heart,
                title: "Ethically Sourced",
                description: "Partnered with responsible breeders and sustainable suppliers.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 mb-4">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Creatures</h2>
              <p className="text-muted-foreground">Our most popular exotic pets</p>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Freshwater Fish", href: "/shop/fish", count: "20+ species", color: "from-blue-500/20 to-cyan-500/20" },
              { name: "Saltwater Fish", href: "/shop/fish", count: "15+ species", color: "from-purple-500/20 to-blue-500/20" },
              { name: "Amphibians", href: "/shop/amphibians", count: "10+ species", color: "from-green-500/20 to-emerald-500/20" },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`glass-card p-8 bg-gradient-to-br ${cat.color} hover:border-white/20 transition-all cursor-pointer`}
                >
                  <h3 className="text-xl font-semibold mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Aquatic Journey?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of hobbyists who trust Nebula Pets for their exotic aquarium needs.
              </p>
              <Link href="/shop">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
