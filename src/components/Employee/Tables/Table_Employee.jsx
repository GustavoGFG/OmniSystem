import React, { useContext } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../../ui/table';
import {
  sortByKey,
  transformCPFtoString,
  transformToCurrency,
} from '@/utils/utils';
import { useState, useEffect } from 'react';
import Loading from '../../Global/Loading';
import { roles } from '@/data/data';
import { DataContext } from '@/contexts/DataContext';

export const Table_Employee = ({ props }) => {
  const [loading, setLoading] = useState(true);
  const { employee } = useContext(DataContext);
  const [employeeSumary, setEmployeeSumary] = useState([]);

  const dataProcessing = () => {
    if (employee) {
      // Create a new array with updated values
      const processedData = employee.map(staff => {
        const obj = { ...staff };
        // GERANDO MISTAKE MÉDIO
        obj.mistake =
          staff.Mistake.length == 0
            ? 0
            : staff.Mistake.reduce(
                (accumulator, mistake) => (accumulator += mistake.value),
                0
              ) / staff.Sale.length;
        // GERANDO MÉDIA DO TICKET MÉDIO
        obj.average_ticket =
          staff.Sale.length == 0
            ? 0
            : staff.Sale.reduce(
                (accumulator, sale) => (accumulator += sale.value),
                0
              ) /
              staff.Sale.reduce(
                (accumulator, sale) => (accumulator += sale.transaction),
                0
              );

        return obj;
      });
      setEmployeeSumary(
        sortByKey(processedData, props.filter, props.ascendent)
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    dataProcessing();
  }, [employee, props.filter, props.ascendent]);

  useEffect(() => {
    if (employeeSumary.length > 0) {
      setLoading(false);
    }
  }, [employeeSumary]);
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
        {employeeSumary != [] && !loading && (
          <TableBody>
            {employeeSumary.map((staff, i) => {
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
                    {format(
                      staff.hire_date.split('T')[0] + 'T03:00:00Z',
                      'dd/MM/yyyy'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {staff.resign_date ? staff.resign_date : '-'}
                  </TableCell>
                  <TableCell className={`text-center min-w-[120px] `}>
                    {staff.average_ticket
                      ? transformToCurrency(staff.average_ticket)
                      : '-'}
                  </TableCell>
                  <TableCell
                    className={`text-center ${staff.mistake ? 'font-bold' : ''} min-w-[120px] ${staff.mistake > 0 ? 'text-green-600' : staff.mistake < 0 ? 'text-red-500' : ''}`}
                  >
                    {staff.mistake ? transformToCurrency(staff.mistake) : '-'}
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
