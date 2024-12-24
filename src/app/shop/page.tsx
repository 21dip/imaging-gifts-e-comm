"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ShopBreadCrumb1 from "@/components/Shop/ShopBreadCrumb1";
import productData from "@/data/Product.json";
import Breadcrumb from "@/components/Home/Heading";

export default function BreadCrumb1() {
  const searchParams = useSearchParams();
  let [type, setType] = useState<string | null | undefined>();
  let datatype = searchParams.get("type");
  let gender = searchParams.get("gender");
  let category = searchParams.get("category");

  useEffect(() => {
    setType(datatype);
  }, [datatype]);

  return (
    <>
      <Breadcrumb heading="Shop" subHeading="Shop" />
      <ShopBreadCrumb1
        data={productData}
        productPerPage={9}
        dataType={type}
        gender={gender}
        category={category}
      />
    </>
  );
}
