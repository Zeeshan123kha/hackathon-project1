"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { useParams, useSearchParams } from "next/navigation";
import { Product } from "../../../../types/product";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const useSearchParam = useSearchParams();
  const category = useSearchParam ? useSearchParam.get("category") : null;
  const params = useParams();

  // Ensure params are available before proceeding

  useEffect(() => {
    (async () => {
      if (!params.slug) return; // Ensure slug exists

      const query = `*[_type == "${category ? "categories" : "products"}" && slug.current == "${params.slug}"][0]{
                title,
                "image": image.asset->url,
                description,
                price
            }`;

      console.log("query", query);
      try {
        const data: Product = await client.fetch(query);
        console.log("data", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    })();
  }, [params, category]); // Added dependencies to useEffect
  if (!params?.slug) {
    return <div className="max-w-7xl mx-auto px-4">Invalid product</div>;
  }

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.title}
              width={400}
              height={400}
            />
          )}
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-2xl font-sans">${product.price}</p>
          <p className="text-lg">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
