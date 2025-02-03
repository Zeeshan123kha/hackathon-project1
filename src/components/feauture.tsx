"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";

import Swal from 'sweetalert2';

import { client } from '../sanity/lib/client';
import { four } from '../sanity/lib/queries';


import { urlFor } from '../sanity/lib/image';
import { Product } from '@/sanity/product';

export default function Feature() {
   const [product, setProduct] = useState<Product[]>([])
     
    useEffect(()=>{
      async function fetchpro(){
       const fetchPro : Product[]= await client.fetch(four);
       setProduct(fetchPro);
      }
      fetchpro()
    },[])

     const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        // Add product to the cart
        //...
        Swal.fire({
          position: "top-right",
          title: `${product.title} added to cart`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        })
        addToCart(product)
      }
  
  const Data = [
    '/Logo1.png',
    '/Logo2.png',
    '/Logo3.png',
    '/Logo4.png',
    '/Logo5.png',
    '/Logo6.png',
  ];

  const FeatureImage = [
    '/Products1.png',
    '/Products2.png',
    '/Products3.png',
    '/Products4.png',
  ];

  return (
    <div className="px-4 sm:px-8 md:px-48 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Data.map((val, i) => (
          <div key={i} className="flex justify-center">
            <Image
              src={val}
              alt={`Logo${i}`}
              width={1000}
              height={1000}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
        ))}
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4 pl-4">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {product.map((product) => (
            <div key={product._id} className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full h-64 overflow-hidden">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between w-full px-4 py-2">
                <div className="flex flex-col items-start">
                  <h2 className="font-medium text-sm mb-1">{product.title}</h2>
                  <span className="text-black text-sm font-bold">${product.price}</span>
                </div>
                <button onClick={(e) => handleAddToCart(e, product)}>
                <div className="flex items-center">
                  <FaCartShopping className="w-6 h-6 sm:w-5 sm:h-5 text-gray-500 text-xs cursor-pointer transition-transform duration-300 hover:scale-110" />
                </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function fetchpro() {
  throw new Error('Function not implemented.');
}
function addToCart(product: Product) {
  throw new Error('Function not implemented.');
}

