"use client";
import { Card } from "@/components/ui/card";

const Cardy = (props) => {
  const image = props.image;
  const title = props.title;
  const tag = props.tag;
  const price = props.price;
  const func = props.func;

  return (
    <div>
      <Card className="flex flex-col w-85 h-130 p-4">
        <div className="flex w-77 justify-center">
          <img src={image} className="w-70 h-80" />
        </div>
        <div>
          <div className="text-[18px] font-bold">{title}</div>
          <div className="text-[15px]">{tag}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-extrabold">${price}</div>
          <button
            onClick={func}
            className=" text-[13px] rounded-md bg-gray-100 font-bold p-2 cursor-pointer hover:bg-black hover:text-white"
          >
            View Details
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Cardy;
