import Loading from '@/components/Global/Loading';
import { DataContext } from '@/contexts/DataContext';
import { createSumaryTable } from '@/utils/sumaryTable';
import {
  sortByKey,
  transformToCurrency,
  transformToPercentage,
} from '@/utils/utils';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from '../../ui/table';

export const Table_DSR = ({ props }) => {
  const { goals, sales, mistakes } = useContext(DataContext);
  const [joinedTable, setJoinedTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (props.filter) {
      const sumaryTable = createSumaryTable(goals, sales, mistakes);
      const sortedStaff = sortByKey(sumaryTable, props.filter, props.ascendent);
      setJoinedTable(sortedStaff);
    } else {
      setJoinedTable(joinedTable);
    }
  }, [goals, sales, mistakes, props.filter, props.ascendent]);

  useEffect(() => {
    if (joinedTable.length > 0) {
      setLoading(false);
    }
  }, [joinedTable]);
  return (
    <>
      <Table>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="text-center w-[50px]">Data</TableHead>
            <TableHead className="text-center ">Venda</TableHead>
            <TableHead className="text-center ">Meta</TableHead>
            <TableHead className="text-center ">P&L</TableHead>
            <TableHead className="text-center ">Transações</TableHead>
            <TableHead className="text-center ">Ticket Médio</TableHead>
            <TableHead className="text-center ">Food Attach</TableHead>
            <TableHead className="text-center ">Agregações</TableHead>
            <TableHead className="text-center w-[120px]">
              Erro de Caixa
            </TableHead>
          </TableRow>
        </TableHeader>
        {!loading && (
          <TableBody>
            {joinedTable.map((sale, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="text-center w-[50px]">
                    {new Date(
                      sale.date.split('T')[0] + 'T03:00:00Z'
                    ).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-center">
                    {transformToCurrency(sale.value)}
                  </TableCell>
                  <TableCell className="text-center">
                    {transformToCurrency(sale.goal)}
                  </TableCell>
                  <TableCell
                    className={`text-center w-[150px] ${sale.profitloss ? 'font-bold' : ''} min-w-[120px] ${sale.profitloss > 0 ? 'text-green-600' : sale.profitloss < 0 ? 'text-red-500' : ''}`}
                  >
                    {transformToCurrency(sale.value - sale.goal)}
                  </TableCell>
                  <TableCell className="text-center">
                    {sale.transactions}
                  </TableCell>
                  <TableCell className="text-center">
                    {transformToCurrency(sale.at)}
                  </TableCell>
                  <TableCell className="text-center">
                    {transformToPercentage(sale.food_attach, 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {transformToPercentage(sale.addons, 1)}
                  </TableCell>
                  <TableCell
                    className={`text-center w-[150px] ${sale.mistake ? 'font-bold' : ''} min-w-[120px] ${sale.mistake > 0 ? 'text-green-600' : sale.mistake < 0 ? 'text-red-500' : ''}`}
                  >
                    {transformToCurrency(sale.mistake)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
      {loading && joinedTable.length == 0 && <Loading />}
    </>
  );
};
