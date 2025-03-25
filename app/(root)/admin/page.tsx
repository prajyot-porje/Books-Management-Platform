"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeholders } from "@/constants";
import React, { useState } from "react";

const page = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  const [status, setStatus] = useState("borrowed");
  const borrowClick = () => {
    setStatus("borrowed");
  };
  const returnedClick = () => {
    setStatus("returned");
  };
  return (
    <div>
      <div className="py-8 w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <div className="flex px-32 p-6  justify-between items-center  ">
        <div className="space-x-4">
          <button
            onClick={borrowClick}
            className={` px-4 py-2 ${
              status === "borrowed" ? "border-b-4  border-blue-500" : ""
            }`}
          >
            All Books
          </button>
          <button
            onClick={returnedClick}
            className={` px-4 py-2 ${
              status === "returned" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            Borrowed
          </button>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Books
        </button>
      </div>
    </div>
  );
};

export default page;
