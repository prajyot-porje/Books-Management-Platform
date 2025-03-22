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
      <div className="flex p-4  items-center justify-center gap-2">
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={50}
          height={50}/>
          <div className='text-2xl font-bold'>Books Management Platform</div>
      </div>
      <div className='flex justify-center items-center'>
       <Header/>
      </div>
       {children}
    </main>
  )
}

export default layout