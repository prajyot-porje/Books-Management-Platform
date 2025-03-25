'use client';
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const words = [
    {
      text: "Discover",
    },
    {
      text: "Your",
    },
    {
      text: "Next",
    },
    {
      text: "Great",
    },
    {
      text: "Read.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="h-screen w-screen flex justify- items-center relative">
      <div className=" absolute top-[39px] left-[85px] w-[1300px] flex items-center justify-between ">
        <div className="text-4xl font-bold">Website name</div>
        <div className="flex items-center space-x-5">
          <Link href='/admin' className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
            Admin
          </Link>
          <Link href='/user' className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent  border-black dark:border-white dark:text-white text-black hover:invert-50 rounded-lg font-bold ">
            Login
          </Link>
        </div>
      </div>
      <div className="pl-20">
        <TypewriterEffectSmooth words={words} />
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-lg max-w-[700px] pb-5  ">
          Uncover captivating stories, enriching knowledge and endless
          inspiration in our curated collection of books.
        </p>
        <button onClick={()=>{
          window.location.href='/user'
        }} className="p-[3px] relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-white rounded-[6px]  relative group transition duration-200 text-black font-bold hover:bg-transparent">
            Get Started
          </div>
        </button>
      </div>
      <Image
        src="/icons/import/Reading book 1.png"
        width={420.8299759686001}
        height={414.49907356940884}
        className="absolute top-[181.5px] left-[909px] z-"
        alt={""}
      />
      
      <Image
        src="/icons/import/Ellipse 9.png"
        width={34}
        height={32}
        className="absolute top-[216.04px] left-[318px] z-"
        alt={""}
      />
      <Image
        src="/icons/import/Ellipse 7.png"
        width={147}
        height={135.67960341186838}
        className="absolute top-[164.16px] left-[-28px] z-"
        alt={""}
      />
      <Image
        src="/icons/import/Ellipse 7.png"
        width={147}
        height={135.67960341186838}
        className="absolute top-[614.28px] rotate-[-90.08deg] left-[374.76px] z-"
        alt={""}
      />
      <Image
        src="/icons/import/Polygon 11.png"
        width={135.80566361995457}
        height={126.39387387913177}
        className="absolute top-[514.28px] rotate-[-13.85 deg] left-[35.39px] z-"
        alt={""}
      />
      <Image
        src="/icons/import/Polygon 12.png"
        width={65.11854532002691}
        height={63.78901609634112}
        className="absolute top-[105.59px] rotate-[13.85 deg] left-[908px] z-"
        alt={""}
      />
      <Image
        src="/icons/import/Polygon 9.png"
        width={74.54036688356261}
        height={69.37446526016464}
        className="absolute top-[623.03px] rotate-[13.85 deg] left-[925.52px] z-"
        alt={""}
      />
      <Image
        src="/icons/import/Polygon 9.png"
        width={74.54036688356261}
        height={69.37446526016464}
        className="absolute top-[323.03px] rotate-[13.85 deg] left-[625.52px] z-"
        alt={""}
      />
    </div>
  );
};

export default page;
