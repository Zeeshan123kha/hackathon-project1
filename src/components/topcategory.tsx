"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { client } from '../sanity/lib/client';

import { urlFor } from '../sanity/lib/image';
import { Product } from '../../types/product';
import { category } from '@/sanity/lib/queries';




export default function Topcategory() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function sanityProduct() {
      const sanityProducts: Product[] = await client.fetch(category);
      setProducts(sanityProducts);
    }
    sanityProduct()
  }, [])


  return (
    <div className="px-4 sm:px-8 md:px-48 py-8">
      <div>
        <h1 className="text-2xl font-bold mb-4 pl-4">Top Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/Pro/${product.slug.current}?category=categories`)}
              className="group relative h-80 bg-cover bg-center flex flex-col items-center rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src={urlFor(product.image).url()}
                alt={product.title}
                width={400}
                height={400}
              />

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full h-1/4 px-4 py-2 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <h2 className="font-semibold text-base truncate">{product.title}</h2>
                <span className="text-sm font-medium truncate">{product._rev}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
