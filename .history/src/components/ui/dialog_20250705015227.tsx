import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

import { useState } from "react";
import Button from './button';

const CustomDialog = ({ children, title, description, trigger, isOpen, setIsOpen }: { children: React.ReactNode, title: string, description: string, trigger: React.ReactNode, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {

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
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className=" space-y-4 bg-white p-12 rounded-lg shadow-md">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <Description>{description}</Description>
            {children}
            <div className="flex gap-4">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Deactivate</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default CustomDialog;