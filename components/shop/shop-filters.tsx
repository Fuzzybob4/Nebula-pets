"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", label: "All Products", count: 20 },
  { id: "fish", label: "Fish", count: 7 },
  { id: "amphibians", label: "Amphibians", count: 5 },
  { id: "supplies", label: "Supplies", count: 5 },
];

const careLevels = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "expert", label: "Expert" },
];

export function ShopFilters() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCareLevel, setSelectedCareLevel] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <Card className="glass-card border-0 sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium mb-3">Category</h4>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg 
                  text-sm transition-all
                  ${selectedCategory === cat.id 
                    ? "bg-blue-500/20 text-blue-400" 
                    : "hover:bg-white/5 text-muted-foreground"
                  }`}
              >
                <span>{cat.label}</span>
                <Badge variant="secondary" className="text-xs bg-white/10">
                  {cat.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Care Level */}
        <div>
          <h4 className="text-sm font-medium mb-3">Care Level</h4>
          <div className="space-y-1">
            {careLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedCareLevel(
                  selectedCareLevel === level.id ? null : level.id
                )}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg 
                  text-sm transition-all
                  ${selectedCareLevel === level.id 
                    ? "bg-blue-500/20 text-blue-400" 
                    : "hover:bg-white/5 text-muted-foreground"
                  }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center
                  ${selectedCareLevel === level.id 
                    ? "bg-blue-500 border-blue-500" 
                    : "border-white/20"
                  }`}
                >
                  {selectedCareLevel === level.id && <Check className="h-3 w-3" />}
                </div>
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stock */}
        <div>
          <h4 className="text-sm font-medium mb-3">Availability</h4>
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg 
              text-sm transition-all
              ${inStockOnly 
                ? "bg-blue-500/20 text-blue-400" 
                : "hover:bg-white/5 text-muted-foreground"
              }`}
          >
            <div className={`w-4 h-4 rounded border flex items-center justify-center
              ${inStockOnly 
                ? "bg-blue-500 border-blue-500" 
                : "border-white/20"
              }`}
            >
              {inStockOnly && <Check className="h-3 w-3" />}
            </div>
            In Stock Only
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
