"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import Rate from "../Other/Rate";

interface ProductProps {
  data: ProductType;
  type: string;
}

const Product: React.FC<ProductProps> = ({ data, type }) => {
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const [openQuickShop, setOpenQuickShop] = useState<boolean>(false);
  const { addToCart, updateCart, cartState } = useCart();
  const { openModalCart } = useModalCartContext();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const { addToCompare, removeFromCompare, compareState } = useCompare();
  const { openModalCompare } = useModalCompareContext();
  const { openQuickview } = useModalQuickviewContext();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!cartState.cartArray.find((item) => item.id === data.id)) {
      addToCart({ ...data });
      updateCart(data.id, data.quantityPurchase, activeSize, activeColor);
    } else {
      updateCart(data.id, data.quantityPurchase, activeSize, activeColor);
    }
    openModalCart();
  };

  const handleAddToWishlist = () => {
    // if product existed in wishlit, remove from wishlist and set state to false
    if (wishlistState.wishlistArray.some((item) => item.id === data.id)) {
      removeFromWishlist(data.id);
    } else {
      // else, add to wishlist and set state to true
      addToWishlist(data);
    }
    openModalWishlist();
  };

  const handleAddToCompare = () => {
    // if product existed in wishlit, remove from wishlist and set state to false
    if (compareState.compareArray.length < 3) {
      if (compareState.compareArray.some((item) => item.id === data.id)) {
        removeFromCompare(data.id);
      } else {
        // else, add to wishlist and set state to true
        addToCompare(data);
      }
    } else {
      alert("Compare up to 3 products");
    }

    openModalCompare();
  };

  const handleQuickviewOpen = () => {
    openQuickview(data);
  };

  const handleDetailProduct = (productId: string) => {
    // redirect to shop with category selected
    router.push(`/product/default?id=${productId}`);
  };

  const handleBuyNow = () => {
    // Step 1: Check if the item is available (if needed)
    if (!data.id) {
      alert("Item not available.");
      return;
    }

    // Step 2: Add item to the cart (or initiate direct purchase)
    // Assuming you have a cart system set up
    addToCart(data);

    // Step 3: Redirect to the checkout page (or handle instant checkout)
    // You can use `react-router-dom` for routing to checkout or trigger an API call
    navigateToCheckout(); // Make sure to define this function or replace with actual routing logic
  };

  const navigateToCheckout = () => {
    // If you're using react-router, use `useNavigate` hook
    const navigate = useNavigate();
    navigate("/checkout"); // Redirect to the checkout page
  };

  let percentSale = Math.floor(100 - (data.price / data.originPrice) * 100);
  let percentSold = Math.floor((data.sold / data.quantity) * 100);

  return (
    <>
      {type === "grid" ? <div className="product-item grid-type"></div> : <></>}

      {type === "marketplace" ? (
        <div
          className="product-item style-marketplace p-4 border border-line rounded-2xl"
          onClick={() => handleDetailProduct(data.id)}
        >
          <div className="bg-img relative w-full">
            <Image
              className="w-full aspect-square max-w-full max-h-48 sm:max-h-64 object-cover"
              width={5000}
              height={5000}
              src={data.thumbImage[0]}
              alt="img"
            />
            <div className="list-action flex flex-col gap-1 absolute top-0 right-0">
              <span
                className={`add-wishlist-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300 ${
                  wishlistState.wishlistArray.some(
                    (item) => item.id === data.id
                  )
                    ? "active"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist();
                }}
              >
                {wishlistState.wishlistArray.some(
                  (item) => item.id === data.id
                ) ? (
                  <Icon.Heart size={18} weight="fill" className="text-white" />
                ) : (
                  <Icon.Heart size={18} />
                )}
              </span>
              <span
                className={`compare-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300 ${
                  compareState.compareArray.some((item) => item.id === data.id)
                    ? "active"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCompare();
                }}
              >
                <Icon.Repeat size={18} className="compare-icon" />
                <Icon.CheckCircle size={20} className="checked-icon" />
              </span>
              <span
                className="quick-view-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickviewOpen();
                }}
              >
                <Icon.Eye />
              </span>
              <span
                className="add-cart-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                <Icon.ShoppingBagOpen />
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="product-infor mt-4 flex flex-col justify-between">
            {/* Title: Fixed Size */}
            <span
              className="text-title text-black text-base font-semibold truncate"
              style={{ lineHeight: "1.25rem" }}
            >
              {data.name}
            </span>

            {/* Rating: Fixed Size */}
            <div className="flex gap-0.5 mt-1">
              <Rate currentRate={data.rate} size={14} />
            </div>

            {/* Price: Fixed Size */}
            <span className="text-title inline-block mt-1 text-black text-lg font-semibold">
              ${data.price}.00
            </span>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons lg:mt-4 md:mt-4 mt-2 flex justify-between  gap-2 ">
            {/* Add to Cart Button */}
            <button
              className="py-1 lg:px-4 px-3  bg-transparent border-2 border-gray-300 text-black rounded-lg font-medium text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 w-full sm:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add+
            </button>

            {/* Buy Now Button */}
            <button
              className="py-1 mr-2 px-4 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 w-full sm:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                handleBuyNow();
              }}
            >
              <span className="sm:hidden">Buy</span>{" "}
              {/* Display "Buy" on small screens */}
              <span className="hidden sm:block">Buy Now</span>{" "}
              {/* Display "Buy Now" on larger screens */}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Product;
