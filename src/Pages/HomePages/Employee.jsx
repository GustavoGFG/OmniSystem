import Card from '@/components/Card/Card';
import Employee_Table from '@/components/TableCardsInfo/Employee_Table';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  ChevronsUpDown,
  Check,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { url } from '@/data/api';

const Employee = () => {
  const [staff, setStaff] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState('Selecione o cargo...');

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState();
  const [day, setDay] = useState('');
  const cargos = [
    {
      value: 'Salesman',
      label: 'Salesman',
    },
    {
      value: 'Supervisor',
      label: 'Supervisor',
    },
    {
      value: 'Assistant Manager',
      label: 'Assistant Manager',
    },
    {
      value: 'Manager',
      label: 'Manager',
    },
  ];

  const fetchEmployee = async () => {
    const response = await fetch(url + 'allemployees');
    const data = await response.json();
    setStaff(data.res);
  };
  useEffect(() => {
    fetchEmployee();
  }, []);
  const capitalizeWords = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const sendNewEmployeeForm = async e => {
    e.preventDefault();
    var form = document.getElementsByTagName('form')[0];
    const newEmployeeForm = {
      name: form['name'].value,
      fullName: form['fullName'].value,
      idDocument: form['idDocument'].value,
      role: value,
      hireDate: format(date, 'dd/MM/yyyy'),
    };
    const response = await fetch(url + 'addemployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployeeForm),
    });
    const data = await response.json();
    if (data.success) {
      fetchEmployee();
      setDialogOpen(false);
      setDate('');
      setValue('Selecione o cargo...');
    }
  };

  return (
    <>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <h2 className="flex items-center">Colaboradores e Certificações</h2>
      </div>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="omnisystem" className="flex gap-[7px]">
              <PlusCircle className="w-5" />
              <span>Novo Colaborador</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Colaborador</DialogTitle>
              <DialogDescription>
                Cadastre um novo colaborador
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-10">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="fullName">Nome: </Label>
                <Input type="text" id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="fullName">Nome completo: </Label>
                <Input type="text" id="fullName" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="idDocument">Identidade: </Label>
                <Input
                  type="text"
                  id="idDocument"
                  className="col-span-3"
                  placeholder="111.111.111-11"
                />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="role">Cargo: </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="col-span-3 justify-between"
                    >
                      {value}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command className="p-0">
                      <CommandInput placeholder="Procure o cargo..." />
                      <CommandEmpty>Cargo não encontrado.</CommandEmpty>
                      <CommandGroup>
                        {cargos.map(cargo => (
                          <CommandItem
                            key={cargo.value}
                            value={cargo.value}
                            onSelect={currentValue => {
                              setValue(capitalizeWords(currentValue));
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                value === cargo.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {cargo.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="calendar">Data de contratação: </Label>
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
                      {date ? (
                        format(date, 'dd/MM/yyyy')
                      ) : (
                        <span>Pick a date</span>
                      )}
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
                        setCalendarOpen(false);
                      }}
                      className="rounded-md border"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant="ghost" type="button">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  variant="omnisystem"
                  onClick={e => sendNewEmployeeForm(e)}
                >
                  Cadastrar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div id="table">
        <Card
          props={{
            title: 'Colaboradores',
            date: 'Hoje',
            staff: staff,
          }}
          children={data => <Employee_Table props={data} />}
        />
      </div>
    </>
  );
};

export default Employee;
