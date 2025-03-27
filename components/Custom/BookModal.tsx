import React from 'react'
import Image from 'next/image';
import { Modal, ModalBody, ModalTrigger } from '../ui/animated-modal';

interface Book {
    id: string;
    title: string;
    auth: string;
    img: string;
    publishedDate: string;
    fine: string;
    status: string;
}
const BookModal = ({ section }: { section: Book }) => {
  return (
    <div>
        <Modal>
            <ModalTrigger>
                <div className='flex space-x-5 p-5 pl-32 '>
                    <Image src={section.img} alt={section.img} height={130} width={130} />
                    <div className='flex flex-col items-start space-y-2 justify-center'>
                        <div className='text-xl'>{section.title}</div>
                        <div className='text-sm text-[#515151]'>by {section.auth}</div>
                        <div className='text-sm text-[#515151]'>Published on {section.publishedDate}</div>
                        <div className='text-sm text-[#515151]'>Status: {section.status}</div>
                    </div>
                </div>
            </ModalTrigger>
            <ModalBody>
                <div className='flex items-center w-full h-screen justify-center'>
                    Still Working
                </div>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default BookModal