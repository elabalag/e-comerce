import React from 'react'
import { Dialog } from "@headlessui/react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { MdDone } from "react-icons/md"

const DialogBox = ({isOpen, setIsOpen, title, description}) => {
  return (
    <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" />
      <div className='fixed inset-0 flex items-center justify-center p-10'>
        <Dialog.Panel className="relative mx-auto max-w-sm rounded bg-white justify-center flex items-center flex-col p-5 h-1/2">
        <MdDone className='bg-green-500 text-6xl rounded-full mt-[-20px] mb-5 p-2 text-white'/>
      <AiOutlineCloseCircle className='absolute top-5 right-5 text-2xl text-gray-500 cursor-pointer' onClick={() => setIsOpen(false)}/>
            <Dialog.Title className="text-3xl mb-4">{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default DialogBox
