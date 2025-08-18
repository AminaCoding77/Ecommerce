"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cardy from "../_components/Card";

const Page = () => {
  const [allData, setAllData] = useState([]);
  const [select, setSelect] = useState();
  const [allData1, setAllData1] = useState([]);

  const router = useRouter();
  const params = useParams();
  const ViewProducts = params.ViewProducts;

  let skip = ViewProducts - 1;

  const FetchData = async () => {
    const dataJson = await fetch(
      `https://dummyjson.com/products?limit=${1}&skip=${skip}`
    );

    const data = await dataJson.json();
    setAllData(data);
  };

  console.log(allData?.products);
  useEffect(() => {
    FetchData();
  }, []);

  const FetchData1 = async () => {
    const dataJson1 = await fetch(
      `https://dummyjson.com/products/category/${allData?.products?.[0]?.category}?limit=4`
    );
    const data1 = await dataJson1.json();
    setAllData1(data1?.products);
  };

  useEffect(() => {
    FetchData1();
  }, [allData]);
  console.log(allData?.products?.[0]?.category);
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
      <div className="flex flex-col mx-130 mt-5 gap-5">
        <div className="flex gap-1">
          <div className="text-[14px] text-gray-600 font-md">Home /</div>
          <div
            onClick={() => {
              router.push("./Products/?page=1");
            }}
            className="text-[14px] text-gray-600 font-md cursor-pointer"
          >
            Products /
          </div>
          <div className="text-[14px] font-bold">
            {allData?.products?.[0]?.title}
          </div>
        </div>
        <div className="flex gap-10">
          <img
            className="w-185 h-185 border rounded-xl bg-gray-100"
            src={allData?.products?.[0]?.images?.[0]}
          />
          <div>
            <div className="text-[30px] font-extrabold">
              {allData?.products?.[0]?.title}
            </div>
            <div className="flex gap-5">
              <div className="text-[15px] font-medium ">
                Rating: {allData?.products?.[0]?.rating}
              </div>
              <div className="text-[14px] font-medium text-gray-500">
                Brand: {allData?.products?.[0]?.brand}
              </div>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <div className="text-[32px] font-extrabold">
                ${allData?.products?.[0]?.price}
              </div>
              <div className="text-[14px] bg-green-100 w-fit h-fit px-2 py-1 rounded-2xl text-green-950">
                {Math.round(allData?.products?.[0]?.discountPercentage)}% OFF
              </div>
            </div>
            <div className="text-[17px] text-gray-500 mt-5 font-medium">
              {allData?.products?.[0]?.description}
            </div>
            <div className="flex gap-1 mt-5 items-center">
              <div className="text-[14px] font-bold">Availability:</div>
              <div className="text-[14px] text-green-600 font-bold">
                {" "}
                {allData?.products?.[0]?.availabilityStatus} {"("}
                {allData?.products?.[0]?.stock} available
                {")"}
              </div>
            </div>
            <div className="text-[16px] font-bold mt-4">Quantity</div>
            <select
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              className="border border-gray-300 text-[15px] block w-24 h-8 px-1  py-1 rounded-md mt-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <div className="flex gap-3 mt-5">
              <Button className="bg-black px-32 py-2 text-white rounded-md font-bold text-[15px]">
                Add to Cart
              </Button>
              <Button
                variant={"ghost"}
                className="border border-gray-300 px-32 py-2 text-black rounded-md font-bold text-[15px]"
              >
                ♡ Add to wish list
              </Button>
            </div>
            <hr className="border-t-2 border-gray-200 w-185 my-4"></hr>
            <div>
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex flex-col">
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-[20px] h-[20px] bg-center bg-no-repeat bg-cover hover:cursor-pointer"
                      style={{ backgroundImage: `url('truck.svg')` }}
                    ></div>
                    <div className="text-[17px] font-semibold">
                      Free Shipping
                    </div>
                  </div>
                  <div className="text-[15px] text-gray-500 font-medium">
                    Free standard shipping on orders over $50
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-[20px] h-[20px] bg-center bg-no-repeat bg-cover hover:cursor-pointer"
                      style={{ backgroundImage: `url('shield.svg')` }}
                    ></div>
                    <div className="text-[17px] font-semibold">
                      30-Day Returns
                    </div>
                  </div>
                  <div className="text-[15px] text-gray-500 font-medium">
                    Shop with confidence with our 30-day return policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-130 mt-20 text-[25px] font-bold">Related Products</div>
      <div className="flex gap-5 ml-130 mt-5">
        {allData1?.map((data) => {
          console.log(allData?.products);

          console.log(allData1);
          return (
            <Cardy
              image={data?.images?.[0]}
              title={data?.title}
              tag={data?.tags?.[0]}
              price={data?.price}
              key={data?.id}
              func={() => router.push(`${data?.id}`)}
            />
          );
        })}
      </div>
      <div className="w-full mt-5">
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
