"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";
import Product from "../Product/Product";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import HandlePagination from "../Other/HandlePagination";

interface Props {
  data: Array<ProductType>;
  productPerPage: number;
  dataType: string | null | undefined;
  gender: string | null;
  category: string | null;
}

const ShopBreadCrumb1: React.FC<Props> = ({
  data,
  productPerPage,
  dataType,
  gender,
  category,
}) => {
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [type, setType] = useState<string | null | undefined>(dataType);
  const [size, setSize] = useState<string | null>();
  const [color, setColor] = useState<string | null>();
  const [brand, setBrand] = useState<string | null>();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = productPerPage;
  const offset = currentPage * productsPerPage;

  const handleShowOnlySale = () => {
    setShowOnlySale((toggleSelect) => !toggleSelect);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setCurrentPage(0);
  };

  const handleType = (type: string | null) => {
    setType((prevType) => (prevType === type ? null : type));
    setCurrentPage(0);
  };

  const handleSize = (size: string) => {
    setSize((prevSize) => (prevSize === size ? null : size));
    setCurrentPage(0);
  };

  const handlePriceChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setPriceRange({ min: values[0], max: values[1] });
      setCurrentPage(0);
    }
  };

  const handleColor = (color: string) => {
    setColor((prevColor) => (prevColor === color ? null : color));
    setCurrentPage(0);
  };

  const handleBrand = (brand: string) => {
    setBrand((prevBrand) => (prevBrand === brand ? null : brand));
    setCurrentPage(0);
  };


  let filteredData = data.filter((product) => {
    let isShowOnlySaleMatched = true;
    if (showOnlySale) {
      isShowOnlySaleMatched = product.sale;
    }

    let isDatagenderMatched = true;
    if (gender) {
      isDatagenderMatched = product.gender === gender;
    }

    let isDataCategoryMatched = true;
    if (category) {
      isDataCategoryMatched = product.category === category;
    }

    let isDataTypeMatched = true;
    if (dataType) {
      isDataTypeMatched = product.type === dataType;
    }

    let isTypeMatched = true;
    if (type) {
      dataType = type;
      isTypeMatched = product.type === type;
    }

    let isSizeMatched = true;
    if (size) {
      isSizeMatched = product.sizes.includes(size);
    }

    let isPriceRangeMatched = true;
    if (priceRange.min !== 0 || priceRange.max !== 100) {
      isPriceRangeMatched =
        product.price >= priceRange.min && product.price <= priceRange.max;
    }

    let isColorMatched = true;
    if (color) {
      isColorMatched = product.variation.some((item) => item.color === color);
    }

    let isBrandMatched = true;
    if (brand) {
      isBrandMatched = product.brand === brand;
    }

    return (
      isShowOnlySaleMatched &&
      isDatagenderMatched &&
      isDataCategoryMatched &&
      isDataTypeMatched &&
      isTypeMatched &&
      isSizeMatched &&
      isColorMatched &&
      isBrandMatched &&
      isPriceRangeMatched
    );
  });

  // Create a copy array filtered to sort
  let sortedData = [...filteredData];

  if (sortOption === "soldQuantityHighToLow") {
    filteredData = sortedData.sort((a, b) => b.sold - a.sold);
  }

  if (sortOption === "discountHighToLow") {
    filteredData = sortedData.sort(
      (a, b) =>
        Math.floor(100 - (b.price / b.originPrice) * 100) -
        Math.floor(100 - (a.price / a.originPrice) * 100)
    );
  }

  if (sortOption === "priceHighToLow") {
    filteredData = sortedData.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "priceLowToHigh") {
    filteredData = sortedData.sort((a, b) => a.price - b.price);
  }

  const totalProducts = filteredData.length;
  const selectedType = type;
  const selectedSize = size;
  const selectedColor = color;
  const selectedBrand = brand;

  if (filteredData.length === 0) {
    filteredData = [
      {
        id: "no-data",
        category: "no-data",
        type: "no-data",
        name: "no-data",
        gender: "no-data",
        new: false,
        sale: false,
        rate: 0,
        price: 0,
        originPrice: 0,
        brand: "no-data",
        sold: 0,
        quantity: 0,
        quantityPurchase: 0,
        sizes: [],
        variation: [],
        thumbImage: [],
        images: [],
        description: "no-data",
        action: "no-data",
        slug: "no-data",
      },
    ];
  }

  // Find page number base on filteredData
  const pageCount = Math.ceil(filteredData.length / productsPerPage);

  // If page number 0, set current page = 0
  if (pageCount === 0) {
    setCurrentPage(0);
  }

  // Get product data for current page
  let currentProducts: ProductType[];

  if (filteredData.length > 0) {
    currentProducts = filteredData.slice(offset, offset + productsPerPage);
  } else {
    currentProducts = [];
  }

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const handleClearAll = () => {
    dataType = null;
    setShowOnlySale(false);
    setSortOption("");
    setType(null);
    setSize(null);
    setColor(null);
    setBrand(null);
    setPriceRange({ min: 0, max: 100 });
    setCurrentPage(0);
    handleType(null);
  };

  return (
    <>
      <div className="shop-product breadcrumb1 py-2">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
            <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
              <div className="filter-type pb-8 border-b border-line">
                <div className="heading6">Products Type</div>
                <div className="list-type-wrapper mt-4 max-h-80 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                  <div className="list-type">
                    {[
                      "DSLR Cameras",
                      "Mirrorless Cameras",
                      "Lenses",
                      "Tripods",
                      "Camera Bags",
                      "Lighting",
                      "Camera Accessories",
                      "Memory Cards",
                      "Studio Equipment",
                      "Gimbals",
                      "Filters",
                      "Monitors",
                      "Flash Drives",
                      "Camera Straps",
                      "Microphones",
                      "Headphones",
                      "Camera Drones",
                      "Action Cameras",
                      "Camera Stabilizers",
                      "External Flash",
                      "Battery Grips",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`item flex items-center justify-between cursor-pointer ${
                          dataType === item ? "active" : ""
                        }`}
                        onClick={() => handleType(item)}
                      >
                        <div className="text-secondary has-line-before hover:text-black capitalize">
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filter-size pb-8 border-b border-line mt-8">
                <div className="heading6">Cards</div>
                <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                  {["32GB", "64GB", "128GB", "256GB", "512GB", "4K Card"].map(
                    (item, index) => (
                      <div
                        key={index}
                        className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-line  ${
                          size === item ? "active" : ""
                        }`}
                        onClick={() => handleSize(item)}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="filter-price pb-8 border-b border-line mt-8">
                <div className="heading6">Price Range</div>
                <Slider
                  range
                  defaultValue={[0, 100]}
                  min={0}
                  max={100}
                  onChange={handlePriceChange}
                  className="mt-5"
                />
                <div className="price-block flex items-center justify-between flex-wrap mt-4">
                  <div className="min flex items-center gap-1">
                    <div>Min price:</div>
                    <div className="price-min">
                      $<span>{priceRange.min}</span>
                    </div>
                  </div>
                  <div className="min flex items-center gap-1">
                    <div>Max price:</div>
                    <div className="price-max">
                      $<span>{priceRange.max}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-color pb-8 border-b border-line mt-8">
                <div className="heading6">Lens Type</div>
                <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                      color === "pink" ? "active" : ""
                    }`}
                    onClick={() => handleColor("pink")}
                  >
                    <div className="caption1 capitalize">Canon EF / EF-S</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                      color === "red" ? "active" : ""
                    }`}
                    onClick={() => handleColor("red")}
                  >
                    <div className="caption1 capitalize">Nikon F-mount</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                      color === "green" ? "active" : ""
                    }`}
                    onClick={() => handleColor("green")}
                  >
                    <div className="caption1 capitalize">Sony E-mount</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                      color === "yellow" ? "active" : ""
                    }`}
                    onClick={() => handleColor("yellow")}
                  >
                    <div className="caption1 capitalize">Micro Four Thirds</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                      color === "purple" ? "active" : ""
                    }`}
                    onClick={() => handleColor("purple")}
                  >
                    <div className="caption1 capitalize">Leica L-mount</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                      color === "black" ? "active" : ""
                    }`}
                    onClick={() => handleColor("black")}
                  >
                    <div className="caption1 capitalize">Sigma L-mount</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                      color === "white" ? "active" : ""
                    }`}
                    onClick={() => handleColor("white")}
                  ></div>
                </div>
              </div>
              <div className="filter-brand mt-8">
                <div className="heading6">Brands</div>
                <div className="list-brand mt-4">
                  {[
                    "Canon",
                    "Nikon",
                    "Sony",
                    "Fujifilm",
                    "Panasonic",
                    "Leica",
                    "Olympus",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="brand-item flex items-center justify-between"
                    >
                      <div className="left flex items-center cursor-pointer">
                        <div className="block-input">
                          <input
                            type="checkbox"
                            name={item}
                            id={item}
                            checked={brand === item}
                            onChange={() => handleBrand(item)}
                          />
                          <Icon.CheckSquare
                            size={20}
                            weight="fill"
                            className="icon-checkbox"
                          />
                        </div>
                        <label
                          htmlFor={item}
                          className="brand-name capitalize pl-2 cursor-pointer"
                        >
                          {item}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">
              <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                <div className="left flex has-line items-center flex-wrap gap-5">
                  <div className="choose-layout flex items-center gap-2">
                    <div className="item three-col w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer active">
                      <div className="flex items-center gap-0.5">
                        <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                        <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                        <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                      </div>
                    </div>
                    <Link
                      href={"/shop/sidebar-list"}
                      className="item row w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="w-4 h-[3px] bg-secondary2 rounded-sm"></span>
                        <span className="w-4 h-[3px] bg-secondary2 rounded-sm"></span>
                        <span className="w-4 h-[3px] bg-secondary2 rounded-sm"></span>
                      </div>
                    </Link>
                  </div>
                  <div className="check-sale flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="filterSale"
                      id="filter-sale"
                      className="border-line"
                      onChange={handleShowOnlySale}
                    />
                    <label
                      htmlFor="filter-sale"
                      className="cation1 cursor-pointer"
                    >
                      Show only products on sale
                    </label>
                  </div>
                </div>
                <div className="right flex items-center gap-3">
                  <div className="select-block relative">
                    <select
                      id="select-filter"
                      name="select-filter"
                      className="caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line"
                      onChange={(e) => {
                        handleSortChange(e.target.value);
                      }}
                      defaultValue={"Sorting"}
                    >
                      <option value="Sorting" disabled>
                        Sorting
                      </option>
                      <option value="soldQuantityHighToLow">
                        Best Selling
                      </option>
                      <option value="discountHighToLow">Best Discount</option>
                      <option value="priceHighToLow">Price High To Low</option>
                      <option value="priceLowToHigh">Price Low To High</option>
                    </select>
                    <Icon.CaretDown
                      size={12}
                      className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
                    />
                  </div>
                </div>
              </div>

              <div className="list-filtered flex items-center gap-3 mt-4">
                <div className="total-product">
                  {totalProducts}
                  <span className="text-secondary pl-1">Products Found</span>
                </div>
                {(selectedType ||
                  selectedSize ||
                  selectedColor ||
                  selectedBrand) && (
                  <>
                    <div className="list flex items-center gap-3">
                      <div className="w-px h-4 bg-line"></div>
                      {selectedType && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setType(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedType}</span>
                        </div>
                      )}
                      {selectedSize && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setSize(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedSize}</span>
                        </div>
                      )}
                      {selectedColor && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setColor(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedColor}</span>
                        </div>
                      )}
                      {selectedBrand && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setBrand(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedBrand}</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="clear-btn flex items-center px-2 py-1 gap-1 rounded-full border border-red cursor-pointer"
                      onClick={handleClearAll}
                    >
                      <Icon.X
                        color="rgb(219, 68, 68)"
                        className="cursor-pointer"
                      />
                      <span className="text-button-uppercase text-red">
                        Clear All
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="list-product hide-product-sold grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                {currentProducts.map((item) =>
                  item.id === "no-data" ? (
                    <div key={item.id} className="no-data-product">
                      No products match the selected criteria.
                    </div>
                  ) : (
                    <Product key={item.id} data={item} type="marketplace" />
                  )
                )}
              </div>

              {pageCount > 1 && (
                <div className="list-pagination lg:mb-10  md:mb-10 flex items-center md:mt-10 mt-7">
                  <HandlePagination
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopBreadCrumb1;
