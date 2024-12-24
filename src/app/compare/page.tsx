'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ProductType } from '@/type/ProductType';

import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import Rate from '@/components/Other/Rate';

const Compare = () => {
  const { compareState } = useCompare();
  const { cartState, addToCart, updateCart } = useCart();
  const { openModalCart } = useModalCartContext();

  const handleAddToCart = (productItem: ProductType) => {
    if (!cartState.cartArray.find((item) => item.id === productItem.id)) {
      addToCart({ ...productItem });
      updateCart(productItem.id, productItem.quantityPurchase, '', '');
    } else {
      updateCart(productItem.id, productItem.quantityPurchase, '', '');
    }
    openModalCart();
  };

  return (
    <div className="compare-block md:py-20 py-10">
      <div className="container">
        <div className="content-main">
          {/* Top compare images row */}
          <div className="list-product flex">
            <div className="left lg:w-[240px] w-[170px] flex-shrink-0"></div>
            <div className="right flex w-full border border-line rounded-t-2xl border-b-0">
              {compareState.compareArray.map((item) => (
                <div
                  className="product-item px-10 pt-6 pb-5 border-r border-line"
                  key={item.id}
                >
                  <div className="bg-img w-full aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.images[0]}
                      width={1000}
                      height={1500}
                      alt={item.images[0]}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-title text-center mt-4">{item.name}</div>
                  <div className="caption2 font-semibold text-secondary2 uppercase text-center mt-1">
                    {item.brand}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compare table */}
          <div className="compare-table flex">
            {/* Left label column */}
            <div className="left lg:w-[240px] w-[170px] flex-shrink-0 border border-line border-r-0 rounded-l-2xl">
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Rating
              </div>
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Price
              </div>
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Type
              </div>
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Brand
              </div>
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Size
              </div>
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Colors
              </div>
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Material
              </div>
              <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                Add To Cart
              </div>
            </div>

            {/* Right compare data table */}
            <table className="right border-collapse w-full border-t border-r border-line">
              <tbody>
                {/* Rating Row */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center">
                        <Rate currentRate={item.rate} size={12} />
                        <p className="pl-1">(1.234)</p>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Price Row */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center">
                        ${item.price}.00
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Type Row */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center capitalize">
                        {item.type}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Brand Row */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center capitalize">
                        {item.brand}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Size Row */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center capitalize gap-1">
                        {item.sizes.map((size, i) => (
                          <p key={i}>
                            {size}
                            <span>,</span>
                          </p>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Colors Row */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center capitalize gap-2">
                        {item.variation.map((colorItem, i) => (
                          <span
                            key={i}
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: colorItem.colorCode }}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Material Row (hardcoded as "Cotton") */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center capitalize">
                        Cotton
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Add to Cart Row */}
                <tr>
                  {compareState.compareArray.map((item) => (
                    <td
                      key={item.id}
                      className="border border-line h-[60px] border-t-0 border-r-0"
                    >
                      <div className="h-full flex items-center justify-center">
                        <button
                          className="button-main py-1.5 px-5"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
