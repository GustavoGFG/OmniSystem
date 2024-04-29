import { defineFormikValues, transformToCurrency } from '@/utils/utils';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';

export const Table_Mistakes = ({
  headerNames,
  array,
  employees,
  setMistakeIndex,
  formik,
}) => {
  const selectRow = (row, i) => {
    setMistakeIndex(i);
    for (let key of Object.keys(row)) {
      if (key != 'updated_at') defineFormikValues(key, row[key], false, formik);
    }
  };
  return (
    <>
      {array.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              {headerNames.map((item, i) => (
                <TableHead key={i} className="text-center">
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {array.map((row, i) => (
              <TableRow
                key={i}
                onClick={() => {
                  selectRow(row, i);
                }}
              >
                <TableCell className="text-center">{row.employee_id}</TableCell>
                <TableCell className="text-center">
                  {
                    employees.find(employee => employee.id == row.employee_id)
                      .full_name
                  }
                </TableCell>
                <TableCell className="text-center">{row.receipt}</TableCell>
                <TableCell className="text-center">{row.reason}</TableCell>
                <TableCell
                  className={`text-center font-bold ${row.value < 0 ? 'text-red-500' : 'text-green-600'}`}
                >
                  {transformToCurrency(row.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
