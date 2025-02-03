"use client"
import Image from 'next/image';
import React , { useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";

import Link from 'next/link';

import Swal from 'sweetalert2';

import { client } from '../sanity/lib/client';
import { allProducts } from '../sanity/lib/queries';


import { urlFor } from '../sanity/lib/image';
import { Product } from '@/sanity/product';



export default function OurProduct() {
  const [product, setProduct] = useState<Product[]>([])
   
  useEffect(()=>{
    async function fetchproduct(){
     const fetchProduct : Product[]= await client.fetch(allProducts);
     setProduct(fetchProduct);
    }
    fetchproduct()
  },[]);

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




  const FeatureImage = [
    '/Products1.png',
    '/Products2.png',
    '/Products3.png',
    '/Products4.png',
    '/Products5.png',
    '/Products6.png',
    '/Products7.png',
    '/Products8.png',

  ];

  return (
    <div className="px-4 sm:px-8 md:px-52 py-8 mt-28" >

      <div>
        <h1 className="text-2xl  md:text-3xl font-bold mb-4 pl-4 text-center">Our Product</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {product.map((product) => (
            <div key={product._id} className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link href= {`/Pro/${product.slug.current}`}>
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



function addToCart(product: Product) {
  throw new Error('Function not implemented.');
}

