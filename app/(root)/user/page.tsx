"use client";
import BookModal from "@/components/Custom/BookModal";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { books, placeholders } from "@/constants";
import Image from "next/image";
import React from "react";

const page = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="relative overflow-hidden">
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <div className="pt-2 flex flex-col items-center">
        <div className="py-8 w-full">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
        <div className="w-full h-[400px] relative">
          <Image
            src="/icons/import2/Ellipse 5.svg"
            width={144}
            height={144}
            className="absolute top-[036.17px] left-[-19px]"
            alt=""
          />
          <Image
            src="/icons/import2/icon.svg"
            width={328}
            height={249}
            className="absolute top-[090px] left-[360px]"
            alt=""
          />
          <Image
            src="/icons/import2/vector.svg"
            width={78}
            height={88}
            className="absolute top-[156px] left-[216px]"
            alt=""
          />
          <Image
            src="/icons/import2/Read.svg"
            width={277}
            height={115}
            className="absolute top-[50px] left-[720px]"
            alt=""
          />
          <Image
            src="/icons/import2/Borrow.svg"
            width={255}
            height={80}
            className="absolute top-[150px] left-[814px]"
            alt=""
          />
          <Image
            src="/icons/import2/Buy.svg"
            width={103}
            height={67}
            className="absolute top-[220px] left-[762px]"
            alt=""
          />
          <Image
            src="/icons/import2/vector 3.svg"
            width={229.0000182066629}
            height={296.00000941558292}
            className="absolute top-[10px] left-[1287px]"
            alt=""
          />
          <Image
            src="/icons/import2/Polygon 16.svg"
            width={36.68558451201072}
            height={41.848971569732285}
            className="absolute top-[044.15px] left-[252px]"
            alt=""
          />
          <Image
            src="/icons/import2/Polygon 16.svg"
            width={36.68558451201072}
            height={41.848971569732285}
            className="absolute top-[044.15px] rotate-[15deg] left-[1147px]"
            alt=""
          />
          <Image
            src="/icons/import2/Polygon 6.svg"
            width={133.34103213744518}
            height={133.34103213744518}
            className="absolute top-[138px] left-[1397.51px]"
            alt=""
          />
          <Image
            src="/icons/import2/Polygon 11.svg"
            width={43.91160905751085}
            height={60.21445765358517}
            className="absolute top-[266px] left-[82.58px]"
            alt=""
          />
        </div>
        <div className="h-full w-full flex flex-col">
          <div className="text-2xl text-[#515151] pl-32">New Arrivals</div>
          <div className="w-full h-[300px]">
            <BookModal section={books} />
          </div>
          <div className="text-2xl text-[#515151] pl-32">Popular</div>
          <div className="w-full h-[300px] bg-red-100"></div>
          <div className="text-2xl text-[#515151] pl-32">Trending</div>
          <div className="w-full h-[300px] bg-red-100"></div>
        </div>
      </div>
    </div>
  );
};

export default page;
