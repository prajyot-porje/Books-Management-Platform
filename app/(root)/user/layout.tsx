import Header from '@/components/Custom/Header';
import React from 'react'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main>
      <div className="flex pl-10 pt-2  items-center justify-between  gap-2">
      <div className="flex items-center ">
          <img src="/logo.jpg" alt="logo" height={100} width={100} />
        <div className="text-3xl font-bold">LibraryHub</div>
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