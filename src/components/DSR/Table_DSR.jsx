import { sortByKey } from '@/utils/utils';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from '../ui/table';

export const Table_DSR = ({ props }) => {
  const [sales, setSales] = useState([]);
  const getTotalShortage = shortageArray => {
    var totalShortage = 0;
    shortageArray.forEach(mistake => {
      totalShortage += mistake.value;
    });
    return totalShortage;
  };

  useEffect(() => {
    if (props.filter) {
      const sortedStaff = sortByKey(props.sales, props.filter, props.ascendent);
      setSales(sortedStaff);
    } else {
      setSales(props.sales);
    }
  }, [props.sales, props.filter, props.ascendent]);

  return (
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
          <TableHead className="text-center w-[120px]">Erro de Caixa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="text-center w-[50px]">
                {new Date(
                  sale.date.split('T')[0] + 'T03:00:00Z'
                ).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell className="text-center">
                {'R$ ' +
                  sale.value.toLocaleString('pt-BR', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
              <TableCell className="text-center">
                {'R$ ' +
                  sale.goal.toLocaleString('pt-BR', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
              <TableCell
                className={`text-center w-[150px] font-bold ${sale.profitloss < 0 ? 'text-red-500' : 'text-green-600'}`}
              >
                {'R$ ' +
                  (sale.value - sale.goal).toLocaleString('pt-br', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
              <TableCell className="text-center">{sale.transactions}</TableCell>
              <TableCell className="text-center">
                {'R$ ' +
                  sale.at.toLocaleString('pt-br', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
              <TableCell className="text-center">
                {(sale.food_attach * 100).toFixed(0) + '%'}
              </TableCell>
              <TableCell className="text-center">
                {(sale.addons * 100).toFixed(0) + '%'}
              </TableCell>
              <TableCell
                className={`text-center w-[100px] font-bold ${sale.mistake < 0 ? 'text-red-500' : 'text-green-600'}`}
              >
                {'R$ ' +
                  sale.mistake.toLocaleString('pt-BR', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    // <Table>
    //   <TableHeader className="sticky top-0">
    //     <TableRow>
    //       <TableHead className="text-center w-[50px]">Data</TableHead>
    //       <TableHead className="text-center ">Venda</TableHead>
    //       <TableHead className="text-center ">Meta</TableHead>
    //       <TableHead className="text-center ">P&L</TableHead>
    //       <TableHead className="text-center ">Transações</TableHead>
    //       <TableHead className="text-center ">Ticket Médio</TableHead>
    //       <TableHead className="text-center ">Food Attach</TableHead>
    //       <TableHead className="text-center ">Agregações</TableHead>
    //       <TableHead className="text-center w-[120px]">Erro de Caixa</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {props.sales.map((sale, i) => {
    //       return (
    //         <TableRow key={i}>
    //           <TableCell className="text-center w-[50px]">
    //             {sale.date}
    //           </TableCell>
    //           <TableCell className="text-center">
    //             {'R$ ' +
    //               sale.sale.toLocaleString('pt-BR', {
    //                 style: 'decimal',
    //                 minimumFractionDigits: 2,
    //               })}
    //           </TableCell>
    //           <TableCell className="text-center">
    //             {'R$ ' +
    //               sale.goal.toLocaleString('pt-BR', {
    //                 style: 'decimal',
    //                 minimumFractionDigits: 2,
    //               })}
    //           </TableCell>
    //           <TableCell className="text-center w-[150px]">
    //             {'R$ ' +
    //               (sale.sale - sale.goal).toLocaleString('pt-br', {
    //                 style: 'decimal',
    //                 minimumFractionDigits: 2,
    //               })}
    //           </TableCell>
    //           <TableCell className="text-center">{sale.transactions}</TableCell>
    //           <TableCell className="text-center">
    //             {'R$ ' +
    //               sale.averageTicket.toLocaleString('pt-br', {
    //                 style: 'decimal',
    //                 minimumFractionDigits: 2,
    //               })}
    //           </TableCell>
    //           <TableCell className="text-center">
    //             {(sale.foodAttachPercentage * 100).toFixed(0) + '%'}
    //           </TableCell>
    //           <TableCell className="text-center">
    //             {(sale.modifierPercentage * 100).toFixed(0) + '%'}
    //           </TableCell>
    //           <TableCell className="text-center w-[100px]">
    //             {'R$ ' +
    //               getTotalShortage(sale.cashierShortage).toLocaleString(
    //                 'pt-BR',
    //                 {
    //                   style: 'decimal',
    //                   minimumFractionDigits: 2,
    //                 }
    //               )}
    //           </TableCell>
    //         </TableRow>
    //       );
    //     })}
    //   </TableBody>
    // </Table>
  );
};
