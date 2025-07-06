import { Dialog as DialogRoot, DialogContent, DialogOverlay, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal } from "@radix-ui/react-dialog";
import { useState } from "react";

const Dialog = ({ children, title, description, trigger }: { children: React.ReactNode, title: string, description: string, trigger: React.ReactNode }) => {

  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen)

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="bg-white rounded-lg p-4 shadow-md">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
          <DialogClose />
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}

export default Dialog;