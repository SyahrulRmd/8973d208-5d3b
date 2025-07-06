import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { useState } from "react";

const Dialog = ({ children, title, description, trigger, isOpen, setIsOpen }: { children: React.ReactNode, title: string, description: string, trigger: React.ReactNode, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {

  // const [isOpen, setIsOpen] = useState(false)

  // console.log(isOpen)

  // const handleClose = () => {
  //   setIsOpen(false)
  // }

  return (
    // <DialogRoot open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
    //   <DialogTrigger>
    //     {trigger}
    //   </DialogTrigger>
    //   <DialogPortal>
    //     <DialogOverlay />
    //     <DialogContent className="bg-white rounded-lg p-4 shadow-md">
    //       <DialogTitle>{title}</DialogTitle>
    //       <DialogDescription>{description}</DialogDescription>
    //       {children}
    //       <DialogClose />
    //     </DialogContent>
    //   </DialogPortal>
    // </DialogRoot>

    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <Description>This will permanently deactivate your account</Description>
          <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Deactivate</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default Dialog;