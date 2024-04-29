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

export const Table_Sales = ({
  headerNames,
  array,
  employees,
  setSaleIndex,
  formik,
}) => {
  const selectRow = (row, i) => {
    setSaleIndex(i);
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
                className="cursor-pointer"
                onClick={() => {
                  selectRow(row, i);
                  console.log(array);
                  console.log(formik.values);
                }}
              >
                <TableCell className="text-center">{row.employee_id}</TableCell>
                <TableCell className="text-center">
                  {
                    employees.find(employee => employee.id == row.employee_id)
                      .full_name
                  }
                </TableCell>
                <TableCell className="text-center">
                  {transformToCurrency(row.value)}
                </TableCell>
                <TableCell className="text-center">{row.transaction}</TableCell>
                <TableCell className="text-center">
                  {(row.food_attach * 100).toFixed(0)}%
                </TableCell>
                <TableCell className="text-center">
                  {(row.addons * 100).toFixed(0)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
