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

const Employee_Table = ({ props }) => {
  const getAverage = array => {
    let sum = 0;
    for (element of array) {
      sum += element;
    }
    return sum / array.length;
  };
  return (
    <Table>
      <TableHeader className="sticky top-0">
        <TableRow>
          <TableHead className="text-center ">Nome</TableHead>
          <TableHead className="text-center ">Credencial</TableHead>
          <TableHead className="text-center ">Identidade</TableHead>
          <TableHead className="text-center ">Cargo</TableHead>
          <TableHead className="text-center ">Admissão</TableHead>
          <TableHead className="text-center ">Demissão</TableHead>
          <TableHead className="text-center ">Ticket Médio</TableHead>
          <TableHead className="text-center w-[120px]">Erro de Caixa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.staff.map((staff, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="text-center min-w-[170px]">
                {staff.fullName}
              </TableCell>
              <TableCell className="text-center min-w-[140px]">
                {staff.credential}
              </TableCell>
              <TableCell className="text-center min-w-[130px]">
                {staff.idDocument}
              </TableCell>
              <TableCell className="text-center">{staff.role}</TableCell>
              <TableCell className="text-center ">{staff.hireDate}</TableCell>
              <TableCell className="text-center">
                {staff.resignDate == '' ? '-' : staff.resignDate}
              </TableCell>
              <TableCell className="text-center min-w-[120px]">
                {staff.averageTicket.length > 0
                  ? 'R$' + getAverage(staff.averageTicket)
                  : '-'}
              </TableCell>
              <TableCell className="text-center  min-w-[120px]">
                {staff.averageShortage.length > 0
                  ? 'R$' + getAverage(staff.averageShortage)
                  : '-'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Employee_Table;
