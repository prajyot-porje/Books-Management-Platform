"use client";
import React from "react";
import { UserNavitems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const route = usePathname();
  return (
    <div className="bg-[#DFDFDF] text-[#7A7A7A] h-14 w-[1300px] text-lg font-bold rounded-lg flex">
      {UserNavitems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`flex-1 h-full ${
            route === item.link ? "bg-[#7A7A7A] text-[#DFDFDF] rounded-lg" : ""
          }`}
        >
          <div className="h-full flex items-center justify-center">
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Header;
