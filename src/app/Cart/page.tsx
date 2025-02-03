"use client";

import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import Image from "next/image";

import { getCartItems, updateCartQuantity } from "@/actions/action";
import { removeFromCart } from "@/actions/action";
import { urlFor } from "../../sanity/lib/image";
import { Product } from "../../../types/product";

const Cartpage = () => {
  // const {getCartItems} = useShoppingCart()
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed", "Item removed successfully", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item: { _id: string; }) => item._id === id);
    if (product) handleQuantityChange(id, product.inventory + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item: { _id: string; }) => item._id === id);
    if (product && product.inventory > 1)
      handleQuantityChange(id, product.inventory - 1);
  };

  const calculatedTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.inventory,
      0
    );
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      showDenyButton: true,
      confirmButtonText: "Yes, proceed",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success",
          "Your order has been placed successfully",
          "success"
        );
        setCartItems([]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
      <div className="max-w-4xl mx-auto">
        {cartItems.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b border-gray-300 py-4"
              >
                <div className="flex items-center">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">
                    {item.inventory}
                  </span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    ${(item.price * item.inventory).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 hover:underline text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-bold">
                Total: ${calculatedTotal().toFixed(2)}
              </h2>
              <button
                onClick={handleProceed}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cartpage;
