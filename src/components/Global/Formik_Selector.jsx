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

export const Formik_Selector = ({
  label,
  notFoundText,
  searchText,
  formik,
  formikKey,
  valuesArray,
  labelsArray,
}) => {
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 px-1 flex-1">
      <Label htmlFor={formikKey}>{label}</Label>
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
              ? searchText
              : labelsArray
                ? labelsArray[index]
                : formik.values[formikKey]}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] overflow-y-auto">
          <Command className="p-0">
            <CommandInput placeholder="Procure o motivo..." />
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <ScrollArea
              className={valuesArray.length <= 4 ? 'h-auto' : 'h-[150px]'}
            >
              <CommandGroup>
                {valuesArray.map((value, i) => (
                  <CommandItem
                    key={i}
                    value={value}
                    onSelect={() => {
                      formik.setFieldValue([formikKey], value);
                      setIndex(i);
                      formik.handleChange;
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        formik.values[formikKey] === value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {labelsArray ? labelsArray[i] : value}
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
