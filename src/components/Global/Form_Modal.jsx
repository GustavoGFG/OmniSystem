import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export const Form_Modal = ({
  button_title,
  modal_title,
  modal_description,
  children,
  child_props,
  icon,
  width,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="omnisystem" className="flex gap-[7px] mb-[30px]">
          {icon}

          <span
            className={`${['Nova Validade', 'Novo Produto', 'Nova Categoria'].includes(button_title) ? 'hidden md:block' : 'block'}`}
          >
            {button_title}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`overflow-auto max-w-[800px] min-w-fit max-h-[95dvh] rounded-xl`}
      >
        <DialogHeader className="mb-[0px]">
          <DialogTitle>{modal_title}</DialogTitle>
          <DialogDescription>{modal_description}</DialogDescription>
        </DialogHeader>
        {children(child_props, setOpen)}
      </DialogContent>
    </Dialog>
  );
};
