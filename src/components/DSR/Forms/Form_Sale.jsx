import {
  resetFormikValues,
  transformToFloat,
  transformToInteger,
} from '@/utils/utils';
import { Save, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { Formik_Input } from '../../Global/Formik_Input';
import { Formik_Calendar } from '../../Global/Formik_Calendar';
import { Selector_Employee } from '../../Global/Selector_Employee';
import { Button } from '../../ui/button';
import { DialogClose } from '../../ui/dialog';
import { Table_Sales } from '../Tables/Table_Sales';

export const Form_Sale = ({
  formik,
  employees,
  setPage,
  salesArray,
  setSalesArray,
}) => {
  const [saleIndex, setSaleIndex] = useState(null);
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2 flex-col md:flex-row">
        <Formik_Calendar formik={formik} formikKey={'date'} />
        <Selector_Employee
          formik={formik}
          formikKey="employee_id"
          employees={employees}
        />
        <div
          className={`flex ${(formik.errors.employee_id && formik.touched.employee_id) || (formik.errors.date && formik.touched.date) ? 'self-center' : 'self-end'} gap-[20px]`}
        >
          <Button
            className="disabled:opacity-10"
            disabled={saleIndex == null}
            variant="ghost"
            type="button"
            onClick={() => {
              setSalesArray(
                salesArray.filter((sale, index) => index != saleIndex)
              );
              setSaleIndex(null);
              resetFormikValues(formik);
            }}
          >
            <Trash2Icon />
          </Button>
          <Button
            disabled={Object.keys(formik.errors) != 0}
            variant="omnisystem"
            type="button"
            onClick={() => {
              Object.keys(formik.values).map(key => {
                if (key != 'date') {
                  formik.values[key] = parseFloat(formik.values[key]);
                }
              });

              if (saleIndex == null) {
                setSalesArray(salesArray => [...salesArray, formik.values]);
              } else {
                salesArray[saleIndex] = formik.values;
                setSaleIndex(null);
              }
              resetFormikValues(formik);
            }}
          >
            <Save />
          </Button>
        </div>
      </div>
      <div className="flex gap-2 flex-col md:flex-row">
        <Formik_Input
          label="Valor da Venda"
          type="text"
          formik={formik}
          formikKey="value"
          transform={transformToFloat}
        />
        <Formik_Input
          label="Transações"
          type="text"
          formik={formik}
          formikKey="transaction"
          transform={transformToInteger}
        />
      </div>
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <Formik_Input
          label="Food Attach"
          type="text"
          formik={formik}
          formikKey="food_attach"
          transform={transformToFloat}
        />
        <Formik_Input
          label="Agregações"
          type="text"
          formik={formik}
          formikKey="addons"
          transform={transformToFloat}
        />
      </div>
      <Table_Sales
        array={salesArray}
        headerNames={[
          'id',
          'Nome',
          'Valor',
          'Transações',
          'Food Attach',
          'Agregações',
        ]}
        employees={employees}
        setSaleIndex={setSaleIndex}
        formik={formik}
      />
      <div className="flex self-center mt-[20px] gap-[20px]">
        <DialogClose>
          <Button variant="ghost" type="button">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          disabled={salesArray.length <= 0}
          variant="omnisystem"
          type="button"
          onClick={async () => {
            setPage('mistakes');
          }}
        >
          Próximo
        </Button>
      </div>
    </form>
  );
};
