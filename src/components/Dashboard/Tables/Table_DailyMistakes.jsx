import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { transformToCurrency } from '@/utils/utils';
import { useContext } from 'react';
import { DataContext } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const Table_DailyMistakes = ({ props }) => {
  const { employee } = useContext(DataContext);
  const [totalMistake, setTotalMistake] = useState(0);
  useEffect(() => {
    setTotalMistake(
      props.dayInfo.reduce((accumulator, mistake) => {
        return (accumulator += mistake.value);
      }, 0)
    );
  }, [props.dayInfo, employee]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Id</TableHead>
          <TableHead className="text-center">Nome</TableHead>
          <TableHead className="min-w-[150px] text-center">Motivo</TableHead>
          <TableHead className="text-center">Nº Recibo</TableHead>
          <TableHead className="text-center">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-[104px] overflow-auto">
        {props.dayInfo.length > 0 &&
          props.dayInfo.map(
            (mistake, index) =>
              mistake.value !== 0 && (
                <TableRow key={index}>
                  <TableCell className="text-center font-medium">
                    {/* {mistake.cashierId} */}
                    {mistake.employee_id}
                  </TableCell>
                  <TableCell className="text-center">
                    {
                      employee.find(e => e.id === mistake.employee_id)
                        ?.full_name
                    }
                  </TableCell>
                  <TableCell className="min-w-[150px] text-center">
                    {mistake.reason}
                  </TableCell>
                  <TableCell className="text-center">
                    {mistake.receipt ? mistake.receipt : 'N/A'}
                  </TableCell>
                  <TableCell
                    className={`text-center  ${
                      mistake.value > 0 ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {transformToCurrency(mistake.value)}
                  </TableCell>
                </TableRow>
              )
          )}
        {props.dayInfo.length == 0 && (
          <>
            <TableRow className="text-center">
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
            </TableRow>
            <TableRow className="text-center">
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full" />
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="font-bold">
            Total
          </TableCell>
          {props.dayInfo.length > 0 && (
            <TableCell
              className={`text-center  font-bold ${
                totalMistake > 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {transformToCurrency(totalMistake)}
            </TableCell>
          )}
          {props.dayInfo.length == 0 && (
            <TableCell>
              <Skeleton className="h-[20px] w-full" />
            </TableCell>
          )}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Table_DailyMistakes;
