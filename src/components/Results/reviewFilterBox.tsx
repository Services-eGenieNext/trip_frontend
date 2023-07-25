import React from "react";
import StarImage from "/public/images/star.png";
import Image from 'next/image';

interface IFilters {
  filters?: any;
  title?: string;
  type?: string;
}

export default function ReviewFilterBox({ filters, title, type }: IFilters) {
  return (
    <div className="py-7 border-b border-[#E3E3E3]">
      <h1 className="text-[18px] font-bold">{title}</h1>
      <div className="flex flex-wrap items-center gap-4 mt-5">
        {filters.length &&
          filters.map((filters: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center py-2 px-3 rounded-md border border-[#898989] cursor-pointer"
              >
                <span className="text-[#898989] text-[14px] font-bold">{filters.label}</span>
                {type === "review" ? (
                  <Image
                    src={StarImage}
                    alt="star Img"
                    className="ml-1"
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
