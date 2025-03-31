"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { UserNavitems } from "@/constants";

const Header = () => {
  const route = usePathname();
  
  return (
    <div className="bg-card text-card-foreground h-12 w-full max-w-[1160px] z-50 rounded-2xl flex shadow-sm">
      {UserNavitems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="flex-1 relative"
        >
          <div className="h-full flex items-center justify-center">
            {route === item.link && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <span className={`relative z-10 font-medium text-base ${
              route === item.link ? "text-primary-foreground" : "text-muted-foreground"
            }`}>
              {item.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Header;
