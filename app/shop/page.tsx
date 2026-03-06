import { products } from "@/data/products";
import { ProductGrid } from "@/components/shop/product-grid";
import { ShopFilters } from "@/components/shop/shop-filters";

export default function ShopPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop All</h1>
          <p className="text-muted-foreground">
            {products.length} exotic creatures and supplies available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ShopFilters />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <ProductGrid products={products} />
          </main>
        </div>
      </div>
    </div>
  );
}
