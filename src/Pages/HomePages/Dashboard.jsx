import Card from '@/components/Global/Card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  DollarSign,
  Users,
  ShoppingCart,
  Utensils,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MiniCardInfo from '@/components/Dashboard/MiniCardInfo';

import React, { useEffect, useState } from 'react';
import Table_DailyMistakes from '@/components/Dashboard/Tables/Table_DailyMistakes';
import Chart_HBar from '@/components/Dashboard/Charts/Chart_HBar';
import Chart_RBar from '@/components/Dashboard/Charts/Chart_RBar';
import Chart_AreaLine from '@/components/Dashboard/Charts/Chart_AreaLine';
import {
  createAverageMistakeOfEmployee,
  createSumaryTable,
} from '@/utils/sumaryTable';
import { useContext } from 'react';
import { DataContext } from '@/contexts/DataContext';
import { ptBR } from 'date-fns/locale';
import { capitalizeWords, sortByKey } from '@/utils/utils';

const Dashboard = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date(2024, 0, 1));

  const { goals, sales, mistakes, employee } = useContext(DataContext);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredMistakes, setFilteredMistakes] = useState([]);
  const [averageMistakes, setAverageMistakes] = useState([]);
  //
  const formatCaption = (date, options) => {
    date = format(date, 'MMMM yyyy', { locale: options?.locale });
    return (
      <>
        <span>{capitalizeWords(date)}</span>
      </>
    );
  };
  //
  useEffect(() => {
    var sumaryTable = createSumaryTable(goals, sales, mistakes);
    setData(sumaryTable);
    if (sumaryTable.length > 0) {
      setFilteredData(
        sumaryTable.find(day => {
          return day.date.split('T')[0] == format(date, 'yyyy-MM-dd');
        })
      );
    }
    setFilteredMistakes(
      mistakes.filter(mistake => {
        return mistake.date.split('T')[0] == format(date, 'yyyy-MM-dd');
      })
    );
    setAverageMistakes(createAverageMistakeOfEmployee(employee, date));
  }, [date, goals, sales, mistakes, employee]);

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
              locale={ptBR}
              mode="single"
              fromMonth={new Date(2024, 0)}
              toDate={new Date(2024, 1, 29)}
              formatters={{ formatCaption }}
              selected={date}
              required
              onSelect={e => {
                if (e != date) {
                  setDate(e);
                }
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
                value: filteredData.value,
                icon: <DollarSign size={40} />,
                reference: filteredData.goal,
                date: 'Hoje',
              }}
              children={data => <MiniCardInfo props={data} />}
            />
          </div>
          <div className="col-span-4 min-[680px]:col-span-2 min-[1700px]:col-span-1">
            <Card
              props={{
                title: 'Transações',
                value: filteredData.transactions,
                icon: <Users size={40} />,
                reference: filteredData.transactions_goal,
                date: 'Hoje',
              }}
              children={data => <MiniCardInfo props={data} />}
            />
          </div>
          <div className="col-span-4 min-[680px]:col-span-2 min-[1700px]:col-span-1">
            <Card
              props={{
                title: 'Ticket Médio',
                value: filteredData.at,
                icon: <ShoppingCart size={40} />,
                reference: filteredData.at_goal,
                date: 'Hoje',
              }}
              children={data => <MiniCardInfo props={data} />}
            />
          </div>
          <div className="col-span-4 min-[680px]:col-span-2 min-[1700px]:col-span-1">
            <Card
              props={{
                title: 'Agregações',
                value: filteredData.addons,
                icon: <Utensils size={40} />,
                reference: filteredData.addons_goal,
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
                saleArray: data
                  .filter(day => {
                    return (
                      parseInt(date.getMonth() + 1) ==
                      parseInt(day.date.split('-')[1])
                    );
                  })
                  .map(day => {
                    return day.value;
                  }),
                goalArray: data
                  .filter(day => {
                    return (
                      parseInt(date.getMonth() + 1) ==
                      parseInt(day.date.split('-')[1])
                    );
                  })
                  .map(day => {
                    return day.goal;
                  }),
                date: capitalizeWords(format(date, 'MMMM', { locale: ptBR })),
              }}
              children={data => <Chart_AreaLine props={data} />}
            />
          </div>
          <div className="col-span-4 min-[1100px]:col-span-1">
            <Card
              props={{
                title: 'Food Attach',
                foodAttach: filteredData.food_attach,
                reference: 0.7,
                date: 'Hoje',
              }}
              children={data => <Chart_RBar props={data} />}
            />
          </div>
        </div>
        <div id="third-row" className="grid grid-cols-4 gap-[20px]">
          <div className="col-span-4 min-[1600px]:col-span-2">
            <Card
              props={{
                title: 'Mistakes',
                dayInfo: sortByKey(filteredMistakes, 'receipt', false),

                date: 'Hoje',
              }}
              children={data => <Table_DailyMistakes props={data} />}
            />
          </div>
          <div className="col-span-4 min-[650px]:col-span-2 min-[1600px]:col-span-1">
            <Card
              props={{
                title: 'Top 5 Mistakes',
                staffInfo: averageMistakes,
                typeOfData: 'Mistake',
                reversed: true,
                color: '#ef4444',
                date: capitalizeWords(format(date, 'MMMM', { locale: ptBR })),
              }}
              children={data => <Chart_HBar props={data} />}
            />
          </div>
          <div className="col-span-4 min-[650px]:col-span-2 min-[1600px]:col-span-1">
            <Card
              props={{
                title: 'Top 5 Ticket Médio',
                staffInfo: averageMistakes,
                typeOfData: 'Ticket',
                reversed: false,
                color: '#007041',
                date: capitalizeWords(format(date, 'MMMM', { locale: ptBR })),
              }}
              children={data => <Chart_HBar props={data} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
