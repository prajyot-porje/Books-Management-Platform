"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React, { useState } from "react";
import { placeholders } from "@/constants";
import Table from "@/components/Custom/Table";

const page = () => {
  const [status , setStatus] = useState('borrowed');
  const borrowClick = () => {
    setStatus('borrowed');
  }
  const returnedClick = () => {
    setStatus('returned');
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
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
      <div className="flex pl-32 p-6 space-x-4 ">
        <button
          onClick={borrowClick}
          className={` px-4 py-2 ${
            status === "borrowed" ? "border-b-4  border-blue-500" : ""
          }`}
        >
          Borrowed
        </button>
        <button
          onClick={returnedClick}
          className={` px-4 py-2 ${
            status === "returned" ? "border-b-4 border-blue-500" : ""
          }`}
        >
          Returned
        </button>
      </div> {/* Closing the flex justify-center div */}
      <div className="w-full px-32">
        <Table section={status}/>
      </div>
    </div>
  );
};

export default page;
