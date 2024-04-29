import { cn } from '@/lib/utils';
import { capitalizeWords } from '@/utils/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export const Formik_Calendar = ({ formik, formikKey }) => {
  const [open, setOpen] = useState(false);

  const formatCaption = (date, options) => {
    date = format(date, 'MMMM yyyy', { locale: options?.locale });
    return (
      <>
        <span>{capitalizeWords(date)}</span>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Data</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={formikKey}
            variant={'outline'}
            onBlur={formik.handleBlur}
            className={cn(
              'col-span-3 justify-start text-left font-nromal',
              !formik.values[formikKey] && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formik.values[formikKey] != '' ? (
              format(
                new Date(formik.values[formikKey] + 'T03:00:00Z'),
                'dd/MM/yyyy'
              )
            ) : (
              <span>Selecione a data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            locale={ptBR}
            id="calendar"
            mode="single"
            formatters={{ formatCaption }}
            fixedWeeks
            selected={formik.values[formikKey]}
            onSelect={e => {
              formik.setFieldValue(formikKey, format(e, 'yyyy-MM-dd'));
              formik.handleChange(formikKey);
              setOpen(false);
            }}
            className="rounded-md border"
          />
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
