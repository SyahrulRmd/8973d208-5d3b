import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

import Button from './button';

interface CustomDialogProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CustomDialog = ({ children, title, isOpen, setIsOpen }: CustomDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className=" space-y-4 bg-white p-12 rounded-lg shadow-md">
            <DialogTitle className="font-bold">{title}</DialogTitle>
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