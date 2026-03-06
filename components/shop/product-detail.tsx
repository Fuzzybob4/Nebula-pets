"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  Check, 
  X,
  Thermometer,
  Droplets,
  Heart,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  };

  return (
    <div>
      {/* Back Link */}
      <Link href="/shop">
        <Button variant="ghost" className="mb-6 gap-2 pl-0">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl glass-card overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
            
            {/* Placeholder Visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-6xl">
                    {product.category === "fish" ? "🐠" : 
                     product.category === "amphibians" ? "🦎" : "🪴"}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{product.name}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="capitalize bg-black/50 backdrop-blur-sm">
                {product.category}
              </Badge>
              {product.subcategory && (
                <Badge variant="secondary" className="capitalize bg-black/50 backdrop-blur-sm">
                  {product.subcategory}
                </Badge>
              )}
            </div>

            <div className="absolute top-4 right-4">
              {product.inStock ? (
                <Badge className="bg-green-500/80 backdrop-blur-sm">
                  <Check className="h-3 w-3 mr-1" /> In Stock
                </Badge>
              ) : (
                <Badge variant="destructive" className="backdrop-blur-sm">
                  <X className="h-3 w-3 mr-1" /> Out of Stock
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
            {product.scientificName && (
              <p className="text-lg text-muted-foreground italic">
                {product.scientificName}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-gradient">
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize bg-white/5">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="bg-white/10" />

          {/* Care Info */}
          {(product.careLevel || product.tankSize || product.temperature) && (
            <Card className="glass-card border-0">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Care Requirements</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.careLevel && (
                    <div className="flex items-center gap-2">
                      <Badge className={`
                        ${product.careLevel === 'beginner' ? 'bg-green-500/20 text-green-400' : ''}
                        ${product.careLevel === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        ${product.careLevel === 'expert' ? 'bg-red-500/20 text-red-400' : ''}
                      `}>
                        {product.careLevel}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Care Level</span>
                    </div>
                  )}
                  {product.tankSize && (
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{product.tankSize}</span>
                    </div>
                  )}
                  {product.temperature && (
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-400" />
                      <span className="text-sm">{product.temperature}</span>
                    </div>
                  )}
                  {product.temperament && (
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-400" />
                      <span className="text-sm capitalize">{product.temperament}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              <ShoppingCart className="h-5 w-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button size="lg" variant="outline" className="border-white/20">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
