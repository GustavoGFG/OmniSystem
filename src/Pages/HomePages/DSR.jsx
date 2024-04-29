import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sales } from '@/data/dailySales';

import { Form_Modal } from '@/components/Global/Form_Modal';
import FormikSale from '@/components/DSR/FormikSale';
import FormikGoal from '@/components/DSR/FormikGoal';
import { getEmployees } from '@/api/employees';
import { Table_DSR } from '@/components/DSR/Table_DSR';

const DSR = () => {
  const salesArray = sales;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date(2023, 0, 1));
  const [allEmployees, setAllEmployees] = useState([]);

  const fetchEmployees = async () => {
    const response = await getEmployees();
    if (response.success) {
      setAllEmployees(response.data);
    } else {
      alert(response.error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  const employees = allEmployees.filter(
    employee => employee.role === 'Cashier'
  );

  return (
    <>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <h2 className="flex items-center">Daily Sales Report</h2>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[200px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'dd/MM/yyyy') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              fromMonth={new Date(2023, 0)}
              toDate={new Date(2023, 0, 31)}
              selected={date}
              onSelect={e => {
                setDate(e);
                setCalendarOpen(false);
              }}
              className="rounded-md border"
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-between">
        <Form_Modal
          button_title="Nova Meta"
          modal_title="Nova Meta"
          modal_description="Registre as metas do dia"
          children={FormikGoal}
          width={400}
        />
        <Form_Modal
          button_title="Novo Relatório"
          modal_title="Novo Relatório"
          modal_description="Registre novo relatório diário"
          children={(employees, setOpen) => (
            <FormikSale child_props={employees} setOpen={setOpen} />
          )}
          child_props={{ employees }}
          width={800}
        />
      </div>
      <div id="table">
        <Card
          props={{
            title: 'Venda',
            date: 'Hoje',
            sales: salesArray,
          }}
          children={data => <Table_DSR props={data} />}
        />
      </div>
    </>
  );
};

export default DSR;
