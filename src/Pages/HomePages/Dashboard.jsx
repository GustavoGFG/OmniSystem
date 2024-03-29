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

import FoodAttachChart from '@/components/ChartCardsInfo/FoodAttachChart';
import HorizontalBarChart from '@/components/ChartCardsInfo/HorizontalBarChart';
import SalesXGoals from '@/components/ChartCardsInfo/SalesXGoalsChart';
import MiniCardInfo from '@/components/MiniCardInfo';
import ShortageOfDayTable from '@/components/TableCardsInfo/ShortageOfDayTable';

import { sales } from '@/data/dailySales';
import { staff } from '@/data/staff';

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date(2023, 0, 1));
  const [day, setDay] = useState('05/01/2023');
  var filteredDay = sales.find(sale => {
    return sale.date === day;
  });

  useEffect(() => {
    setDay(format(date, 'dd/MM/yyyy'));
    filteredDay = sales.find(sale => {
      return sale.date === day;
    });
  }, [date]);

  const staffInfo = staff;

  const filteredSales = sales.map(sale => {
    return sale.sale;
  });
  const filteredGoals = sales.map(sale => {
    return sale.goal;
  });

  return (
    <>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <h2 className="flex items-center">Dashboard</h2>
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
      <div className="flex flex-col gap-[20px]">
        <div id="cards" className="grid grid-cols-4 gap-[20px]">
          <div className="col-span-4 min-[680px]:col-span-2 min-[1700px]:col-span-1">
            <Card
              props={{
                title: 'Venda',
                value: filteredDay.sale,
                icon: 'ri-money-dollar-circle-line',
                reference: filteredDay.goal,
                date: 'Hoje',
              }}
              children={data => <MiniCardInfo props={data} />}
            />
          </div>
          <div className="col-span-4 min-[680px]:col-span-2 min-[1700px]:col-span-1">
            <Card
              props={{
                title: 'Transações',
                value: filteredDay.transactions,
                icon: 'ri-team-fill',
                reference: 500,
                date: 'Hoje',
              }}
              children={data => <MiniCardInfo props={data} />}
            />
          </div>
          <div className="col-span-4 min-[680px]:col-span-2 min-[1700px]:col-span-1">
            <Card
              props={{
                title: 'Ticket Médio',
                value: filteredDay.averageTicket,
                icon: 'ri-shopping-basket-fill',
                reference: 33,
                date: 'Hoje',
              }}
              children={data => <MiniCardInfo props={data} />}
            />
          </div>
          <div className="col-span-4 min-[680px]:col-span-2 min-[1700px]:col-span-1">
            <Card
              props={{
                title: 'Agregações',
                value: filteredDay.modifierPercentage,
                icon: 'ri-restaurant-line',
                reference: 0.1,
                date: 'Hoje',
              }}
              children={data => <MiniCardInfo props={data} />}
            />
          </div>
        </div>
        <div id="second-row" className="grid grid-cols-4 gap-[20px]">
          <div className="col-span-4 min-[1100px]:col-span-3">
            <Card
              props={{
                title: 'Vendas x Meta',
                saleArray: filteredSales,
                goalArray: filteredGoals,
                date: 'Janeiro',
              }}
              children={data => <SalesXGoals props={data} />}
            />
          </div>
          <div className="col-span-4 min-[1100px]:col-span-1">
            <Card
              props={{
                title: 'Food Attach',
                foodAttach: filteredDay.foodAttachPercentage,
                reference: 0.7,
                date: 'Hoje',
              }}
              children={data => <FoodAttachChart props={data} />}
            />
          </div>
        </div>
        <div id="third-row" className="grid grid-cols-4 gap-[20px]">
          <div className="col-span-4 min-[1600px]:col-span-2">
            <Card
              props={{
                title: 'Mistakes',
                dayInfo: filteredDay,
                staffInfo: staffInfo,
                date: 'Hoje',
              }}
              children={data => <ShortageOfDayTable props={data} />}
            />
          </div>
          <div className="col-span-4 min-[650px]:col-span-2 min-[1600px]:col-span-1">
            <Card
              props={{
                title: 'Top 5 Mistakes',
                staffInfo: staffInfo,
                typeOfData: 'Mistake',
                reversed: true,
                color: '#ef4444',
                date: 'Janeiro',
              }}
              children={data => <HorizontalBarChart props={data} />}
            />
          </div>
          <div className="col-span-4 min-[650px]:col-span-2 min-[1600px]:col-span-1">
            <Card
              props={{
                title: 'Top 5 Ticket Médio',
                staffInfo: staffInfo,
                typeOfData: 'Ticket',
                reversed: false,
                color: '#007041',
                date: 'Janeiro',
              }}
              children={data => <HorizontalBarChart props={data} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
