import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='w-full bg-white h-screen flex items-center justify-center'>
          <SignUp />
    </div>
  )
}