"use client"

import Image from 'next/image';
import { Input } from '../ui/input';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
  return (
    <div className="flex-center  w-full overflow-hidden rounded-full bg-grey-50  px-4 py-2">
      <Image src="/icons/search.svg" alt="search" width={24} height={24} />
      <Input 
        type="text"
        placeholder={placeholder}
        className=""
      />
    </div>
  )
}

export default Search