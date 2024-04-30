import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../../ui/table';
import { sortByKey, transformCPFtoString } from '@/utils/utils';
import { useState, useEffect } from 'react';
import Loading from '../../Loading';
import { roles } from '@/data/data';

export const Table_Employee = ({ props }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (props.staff) {
      // Create a new array with updated values
      const updatedEmployees = props.staff.map(staff => {
        let newStaff = { ...staff }; // Create a copy of staff object

        // Calculate Mistake
        newStaff.Mistake =
          staff.Mistake && staff.Mistake.length > 0
            ? staff.Mistake.reduce(
                (accumulator, mistake) => accumulator + mistake.value,
                0
              ) / (staff.Sale.length > 0 ? staff.Sale.length : 1)
            : 0;

        // Calculate Sale
        newStaff.at =
          staff.Sale.length > 0
            ? staff.Sale.reduce(
                (accumulator, sale) => accumulator + sale.value,
                0
              ) /
              staff.Sale.reduce(
                (accumulator, sale) => accumulator + sale.transaction,
                0
              )
            : 0;
        return newStaff;
      });

      // Sort the updated array
      const sortedStaff = sortByKey(
        updatedEmployees,
        props.filter,
        props.ascendent
      );

      // Update the state
      setEmployees(sortedStaff);
      setLoading(false);
    }
  }, [props.staff, props.filter, props.ascendent]);

  return (
    <>
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
            <TableHead className="text-center w-[120px]">
              Erro de Caixa
            </TableHead>
          </TableRow>
        </TableHeader>
        {!loading && (
          <TableBody>
            {employees.map((staff, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="text-center min-w-[170px]">
                    {staff.full_name}
                  </TableCell>
                  <TableCell className="text-center min-w-[140px]">
                    {staff.id}
                  </TableCell>
                  <TableCell className="text-center min-w-[130px]">
                    {transformCPFtoString(staff.cpf)}
                  </TableCell>
                  <TableCell className="text-center">
                    {roles.find(role => role.value == staff.role).label}
                  </TableCell>
                  <TableCell className="text-center ">
                    {format(staff.hire_date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className="text-center">
                    {staff.resign_date ? staff.resign_date : '-'}
                  </TableCell>
                  <TableCell className={`text-center min-w-[120px] `}>
                    {staff.at
                      ? 'R$ ' +
                        Number(staff.at.toFixed(2)).toLocaleString('pt-BR', {
                          style: 'decimal',
                          minimumFractionDigits: 2,
                        })
                      : '-'}
                  </TableCell>
                  <TableCell
                    className={`text-center font-bold min-w-[120px] ${staff.Mistake >= 0 ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {staff.Mistake
                      ? 'R$ ' +
                        staff.Mistake.toLocaleString('pt-BR', {
                          style: 'decimal',
                          minimumFractionDigits: 2,
                        })
                      : '-'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
      {loading && <Loading />}
    </>
  );
};
