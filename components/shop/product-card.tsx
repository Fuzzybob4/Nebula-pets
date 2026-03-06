"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  };

  // Get emoji/icon based on category/subcategory
  const getProductIcon = () => {
    if (product.category === "fish") {
      if (product.subcategory === "saltwater") return "🐠";
      return "🐟";
    }
    if (product.category === "amphibians") {
      if (product.subcategory === "frogs") return "🐸";
      if (product.subcategory === "salamanders") return "🦎";
      if (product.subcategory === "newts") return "🦎";
      if (product.subcategory === "toads") return "🐸";
    }
    if (product.category === "supplies") return "🪴";
    return "📦";
  };

  return (
    <Link href={`/shop/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card overflow-hidden group h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {/* Product Image or Icon */}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <span className="text-6xl">{getProductIcon()}</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <Badge 
            className="absolute top-3 left-3 capitalize bg-black/50 backdrop-blur-sm border-0"
          >
            {product.category}
          </Badge>
          
          {/* Stock Badge */}
          {product.inStock ? (
            <Badge 
              variant="default" 
              className="absolute top-3 right-3 bg-green-500/80 backdrop-blur-sm border-0"
            >
              <Check className="h-3 w-3 mr-1" /> In Stock
            </Badge>
          ) : (
            <Badge 
              variant="destructive" 
              className="absolute top-3 right-3 backdrop-blur-sm border-0"
            >
              <X className="h-3 w-3 mr-1" /> Out of Stock
            </Badge>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              size="sm" 
              className="gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          
          {product.scientificName && (
            <p className="text-xs text-muted-foreground italic mb-2">
              {product.scientificName}
            </p>
          )}
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-xl font-bold text-gradient">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
