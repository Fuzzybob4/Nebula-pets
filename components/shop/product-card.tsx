"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
}

// Accurate emoji representations for each product type
const getProductEmoji = (product: Product): string => {
  const name = product.name.toLowerCase();
  
  // Freshwater fish
  if (name.includes('neon tetra')) return '🐠';
  if (name.includes('betta')) return '🐟';
  if (name.includes('discus')) return '🐠';
  if (name.includes('ram')) return '🐠';
  
  // Saltwater fish
  if (name.includes('clownfish')) return '🐠';
  if (name.includes('mandarin')) return '🐠';
  if (name.includes('tang')) return '🐠';
  
  // Frogs
  if (name.includes('dart frog')) return '🐸';
  if (name.includes('toad')) return '🐸';
  if (name.includes('tree frog')) return '🐸';
  if (name.includes('pacman frog')) return '🐸';
  if (name.includes("white's")) return '🐸';
  
  // Salamanders
  if (name.includes('axolotl')) return '🦎';
  if (name.includes('salamander')) return '🦎';
  
  // Newts
  if (name.includes('newt')) return '🦎';
  
  // Supplies
  if (product.category === 'supplies') return '🛠️';
  
  return '📦';
};

// Get gradient color based on category
const getCategoryGradient = (category: string): string => {
  switch (category) {
    case 'fish':
      return 'from-blue-500/20 to-cyan-500/20';
    case 'amphibians':
      return 'from-green-500/20 to-emerald-500/20';
    case 'supplies':
      return 'from-purple-500/20 to-pink-500/20';
    default:
      return 'from-gray-500/20 to-slate-500/20';
  }
};

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

  const emoji = getProductEmoji(product);
  const gradient = getCategoryGradient(product.category);

  return (
    <Link href={`/shop/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card overflow-hidden group h-full flex flex-col"
      >
        {/* Image/Emoji Container */}
        <div className={`relative aspect-square bg-gradient-to-br ${gradient} overflow-hidden flex items-center justify-center`}>
          {/* Large Emoji */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-8xl select-none"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}
          >
            {emoji}
          </motion.div>
          
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
