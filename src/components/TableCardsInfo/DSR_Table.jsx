import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from '../ui/table';

const DSR_Table = ({ props }) => {
  const getTotalShortage = shortageArray => {
    var totalShortage = 0;
    shortageArray.forEach(mistake => {
      totalShortage += mistake.value;
    });
    return totalShortage;
  };
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
        {props.sales.map((sale, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="text-center w-[50px]">
                {sale.date}
              </TableCell>
              <TableCell className="text-center">
                {'R$ ' +
                  sale.sale.toLocaleString('pt-BR', {
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
              <TableCell className="text-center w-[150px]">
                {'R$ ' +
                  (sale.sale - sale.goal).toLocaleString('pt-br', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
              <TableCell className="text-center">{sale.transactions}</TableCell>
              <TableCell className="text-center">
                {'R$ ' +
                  sale.averageTicket.toLocaleString('pt-br', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
              <TableCell className="text-center">
                {(sale.foodAttachPercentage * 100).toFixed(0) + '%'}
              </TableCell>
              <TableCell className="text-center">
                {(sale.modifierPercentage * 100).toFixed(0) + '%'}
              </TableCell>
              <TableCell className="text-center w-[100px]">
                {'R$ ' +
                  getTotalShortage(sale.cashierShortage).toLocaleString(
                    'pt-BR',
                    {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                    }
                  )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DSR_Table;
