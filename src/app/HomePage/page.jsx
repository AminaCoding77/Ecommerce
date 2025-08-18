"use client";
import { useState } from "react";
import { useEffect } from "react";
import Cardy from "../_components/Card";
import { useRouter } from "next/navigation";

const Page = () => {
  const [products, setProducts] = useState([]);
  const FetchProduct = async () => {
    const dataJson = await fetch("https://dummyjson.com/products?limit=4");
    const data = await dataJson.json();
    setProducts(data.products);
  };

  const router = useRouter();

  useEffect(() => {
    FetchProduct();
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <div className="w-full h-20 pt-5 pb-5 sticky top-0">
        <div className="flex gap-2 items-center justify-center">
          <div
            className=" w-[25px] h-[25px] bg-center bg-no-repeat bg-cover hover:cursor-pointer"
            style={{
              backgroundImage: `url('bag.svg')`,
            }}
          ></div>
          <div className="text-[20px] font-extrabold">E-Commerce</div>
        </div>
        <hr className="border-t-2 border-gray-200 w-full my-4"></hr>
      </div>
      <div className="flex flex-col items-center mt-40">
        <div className="text-[45px] font-extrabold">Featured Products</div>
        <div className="text-[25px] text-gray-500 font-medium">
          Check out our most popular items that customers love.
        </div>
      </div>
      <div className="flex gap-5 mt-10">
        {products.map((product, index) => {
          return (
            <div key={index}>
              <Cardy
                image={product.images[0]}
                title={product.title}
                tag={product.tags[0]}
                price={product.price}
                key={product.id}
                func={() => router.push(`${product.id}`)}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          router.push("./Products/?page=1");
        }}
        className="text-[16px] bg-black text-white font-bold px-4 py-2 rounded-md mt-10"
      >
        View All Products
      </button>
      <div className="w-full mt-75">
        <hr className="border-t-2 border-gray-200"></hr>
        <div className="flex justify-between px-130 py-5 items-center">
          <div className="text-[15px] text-gray-600 font-md">
            © 2025 E-Commerce. All rights reserved.
          </div>
          <div className="flex gap-5">
            <div
              className="w-[25px] h-[25px] bg-center bg-no-repeat bg-cover hover:cursor-pointer"
              style={{
                backgroundImage: `url('link.svg')`,
              }}
            ></div>
            <div
              className="w-[25px] h-[25px] bg-center bg-no-repeat bg-cover hover:cursor-pointer"
              style={{
                backgroundImage: `url('link.svg')`,
              }}
            ></div>
            <div
              className="w-[25px] h-[25px] bg-center bg-no-repeat bg-cover hover:cursor-pointer"
              style={{
                backgroundImage: `url('link.svg')`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
