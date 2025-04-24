import Header from '@/components/Custom/Header';
import React from 'react'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Library } from 'lucide-react';
import { motion } from 'framer-motion';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main>
      <div className="flex pl-10 pt-2  items-center justify-between  gap-2">
      <div className="flex items-center ">
      
      <div className="flex items-center gap-2 p-4">
            <div className="relative w-10 h-10 flex items-center justify-center bg-blue-500 rounded-lg text-white">
              <Library className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              LibraryHub
            </span>
          </div>
        </div>
          <div className='pr-10 flex items-center justify-center gap-2'>
          <SignedIn>
            <div className='z-50 relative'>
                    <UserButton  />
                    </div>
          </SignedIn>
          </div>
      </div>
      <div className='flex justify-center items-center'>
       <Header/>
      </div>
       {children}
    </main>
  )
}

export default layout