"use client";
import Cardy from "../_components/Card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [totalProdcts, setTotalProducts] = useState();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? page : 1);

  const pageDef = 12;

  let skip = 0;
  if (currentPage > 0) {
    skip = pageDef * (currentPage - 1);
  }

  const FetchProduct = async () => {
    let url = "";
    if (inputValue.length === 0) {
      url = `https://dummyjson.com/products?limit=${pageDef}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products/search?q=${inputValue}`;
    }
    const dataJson = await fetch(url);
    const data = await dataJson.json();
    setProducts(data.products);
    setTotalProducts(data.total);
  };

  useEffect(() => {
    FetchProduct();
  }, [currentPage, inputValue]);

  const products1 = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue.toLowerCase());
  });

  const totalPages = Math.ceil(totalProdcts / pageDef);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
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
      <div className="flex flex-col w-full ml-230 mr-130 mt-5">
        <input
          className="w-100 h-5 border border-gray-300 rounded-md text-[14px] py-4 px-4"
          placeholder="Search products..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <div className="flex gap-5 mt-10 flex-wrap w-400">
          {products1.map((product, index) => {
            return (
              <div key={index} className="hover:shadow-2xl">
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
        <div className="flex gap-2 mt-10 ml-75">
          <button
            onClick={() => {
              router.push(`?page=${setCurrentPage(currentPage - 1)}`);
            }}
            className="border border-gray-300 rounded-md hover:text-white p-1 w-10 h-10 cursor-pointer hover:bg-black font-bold"
          >
            {"<"}
          </button>
          <div className="flex gap-2">
            {paginationButtons.map((button) => {
              return (
                <div key={button}>
                  <Button
                    variant={currentPage === button ? "default" : "secondary"}
                    className="border border-gray-300 rounded-md hover:text-white p-1 w-10 h-10 cursor-pointer hover:bg-black"
                    key={button}
                    onClick={() => {
                      router.push(`?page=${button}`);
                      setCurrentPage(button);
                    }}
                  >
                    {button}
                  </Button>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              router.push(`?page=${setCurrentPage(currentPage + 1)}`);
            }}
            className="border border-gray-300 rounded-md hover:text-white p-1 w-10 h-10 cursor-pointer hover:bg-black font-bold"
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="w-full mt-30">
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
