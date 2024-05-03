import React from 'react';
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

const Table_DailyMistakes = ({ props }) => {
  var totalMistake = 0;
  props.dayInfo.cashierShortage.forEach(mistake => {
    totalMistake += mistake.value;
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="min-w-[150px] text-center">Motivo</TableHead>
          <TableHead>Nº Recibo</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.dayInfo.cashierShortage.map(
          (mistake, index) =>
            mistake.value !== 0 && (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {mistake.cashierId}
                </TableCell>
                <TableCell>
                  {
                    props.staffInfo.find(
                      staff => staff.id === mistake.cashierId
                    )?.name
                  }
                </TableCell>
                <TableCell className="min-w-[150px] text-center">
                  {mistake.reason}
                </TableCell>
                <TableCell>{index + 'FF38012'}</TableCell>
                <TableCell
                  className={`min-w-[100px] text-right  ${
                    mistake.value > 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {transformToCurrency(mistake.value)}
                </TableCell>
              </TableRow>
            )
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="font-bold">
            Total
          </TableCell>
          <TableCell
            className={`min-w-[100px] text-right  font-bold ${
              totalMistake > 0 ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {transformToCurrency(totalMistake)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Table_DailyMistakes;
