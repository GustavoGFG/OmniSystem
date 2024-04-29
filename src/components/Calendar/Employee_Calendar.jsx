import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Employee_Calendar = ({ date, setDate }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'col-span-3 justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd/MM/yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          id="calendar"
          mode="single"
          toDate={new Date()}
          selected={date}
          onSelect={e => {
            setDate(e);
            console.log(e);
            setCalendarOpen(false);
          }}
          className="rounded-md border"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default Employee_Calendar;
