import { notFound } from "next/navigation";
import { products, getProductById } from "@/data/products";
import { ProductDetail } from "@/components/shop/product-detail";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} | Nebula Pets`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
