import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';

export const Selector_Employee = ({ formik, formikKey, employees }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2 px-1 flex-1">
      <Label htmlFor={formikKey}>Vendedor</Label>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            id={formikKey}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            onBlur={formik.handleBlur}
            className="col-span-3 justify-between"
          >
            {formik.values[formikKey] === ''
              ? 'Selecione o vendedor...'
              : formik.values[formikKey] +
                ' - ' +
                employees.find(
                  employee => employee.id == formik.values[formikKey]
                ).full_name}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] overflow-y-auto">
          <Command className="p-0">
            <CommandInput placeholder="Procure o vendedor..." />
            <CommandEmpty>Vendedor não encontrado.</CommandEmpty>
            <ScrollArea
              className={employees.length <= 4 ? 'h-auto' : 'h-[150px]'}
            >
              <CommandGroup>
                {employees.map((employee, i) => (
                  <CommandItem
                    key={i}
                    value={employee.id + ' - ' + employee.full_name}
                    onSelect={() => {
                      formik.setFieldValue([formikKey], employee.id);
                      formik.handleChange;
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        formik.values[formikKey] === employee.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {employee.id + ' - ' + employee.full_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      {formik.errors[formikKey] && formik.touched[formikKey] && (
        <span className="font-bold text-xs text-destructive">
          {formik.errors[formikKey]}
        </span>
      )}
    </div>
  );
};
