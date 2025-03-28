import Header from '@/components/Custom/Header';
import React from 'react'
import Image from 'next/image'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main>
      <div className="flex pl-10 pt-8 p-5  items-center  gap-2">
          <div className='text-3xl font-bold'>LibraryHub</div>
      </div>
      <div className='flex justify-center items-center'>
       <Header/>
      </div>
       {children}
    </main>
  )
}

export default layout