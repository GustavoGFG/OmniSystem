import { addMistakes } from '@/api/mistakes';
import { addSales } from '@/api/sales';
import { mistakeReasons } from '@/data/data';
import { validateMistakesArray, validateSalesArray } from '@/schemas/schemas';
import { resetFormikValues, transformToFloat } from '@/utils/utils';
import { Save, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { Formik_Input } from '../../Global/Formik_Input';
import { Selector_Employee } from '../../Global/Selector_Employee';
import { Formik_Selector } from '../../Global/Formik_Selector';
import { Button } from '../../ui/button';
import { Table_Mistakes } from '../Tables/Table_Mistakes';
import { useToast } from '@/components/ui/use-toast';

export const Form_Mistake = ({
  formik,
  employees,
  setPage,
  mistakesArray,
  setMistakesArray,
  salesArray,
  setOpen,
}) => {
  const { toast } = useToast();
  const [mistakeIndex, setMistakeIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const isMistakesValid = validateMistakesArray(mistakesArray);
    const isSalesValid = validateSalesArray(salesArray);

    if (!isMistakesValid || !isSalesValid) {
      console.error('Vendas ou Erros não são válidos');
      return;
    }
    try {
      setLoading(true);
      const salesResponse = await addSales(salesArray);
      if (salesResponse.success) {
        alert('Vendas salvas');
        const mistakeResponse = await addMistakes(mistakesArray);
        if (mistakeResponse.success) {
          alert('Erros salvos');
          setLoading(false);
          setOpen(false);
        } else {
          alert('Erro ao salvar erros: ', mistakeResponse.error);
          setLoading(false);
        }
      } else {
        toast({ variant: 'destructive', description: salesResponse.error });
        // alert('Erro ao salvar vendas: ', salesResponse.error);
        setLoading(false);
      }
    } catch (error) {
      toast({ variant: 'destructive', description: error });
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={e => {
        handleSubmit(e);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex gap-2">
        <Selector_Employee
          formik={formik}
          formikKey="employee_id"
          employees={employees.filter(employee => {
            return salesArray
              .map(sale => {
                return sale.employee_id;
              })
              .includes(employee.id);
          })}
        />
        <Formik_Selector
          formik={formik}
          formikKey="reason"
          valuesArray={mistakeReasons}
          label="Motivo"
          notFoundText="Motivo não encontrado."
          searchText="Selecione o motivo..."
        />
        <div
          className={`flex ${(formik.errors.employee_id && formik.touched.employee_id) || (formik.errors.reason && formik.touched.reason) ? 'self-center' : 'self-end'} gap-[20px]`}
        >
          <Button
            className="disabled:opacity-10"
            disabled={mistakeIndex == null || loading}
            variant="ghost"
            type="button"
            onClick={() => {
              setMistakesArray(
                mistakesArray.filter((mistake, index) => index != mistakeIndex)
              );
              setMistakeIndex(null);
              resetFormikValues(formik);
            }}
          >
            <Trash2Icon />
          </Button>
          <Button
            disabled={Object.keys(formik.errors) != 0 || loading}
            variant="omnisystem"
            type="button"
            onClick={() => {
              let formikValues = formik.values;
              formikValues.value = parseFloat(formikValues.value);
              if (mistakeIndex == null) {
                setMistakesArray(mistakesArray => [
                  ...mistakesArray,
                  formikValues,
                ]);
              } else {
                mistakesArray[mistakeIndex] = formikValues;
                setMistakeIndex(null);
              }
              resetFormikValues(formik);
            }}
          >
            <Save />
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Formik_Input
          formik={formik}
          label="Valor do Erro"
          type="text"
          formikKey="value"
          transform={transformToFloat}
        />
        <Formik_Input
          formik={formik}
          label="Recibo"
          type="text"
          formikKey="receipt"
        />
      </div>
      <Table_Mistakes
        headerNames={['id', 'Funcionário', 'Recibo', 'Motivo', 'Valor']}
        employees={employees}
        array={mistakesArray}
        setMistakeIndex={setMistakeIndex}
        formik={formik}
      />
      <div className="flex self-center mt-[20px] gap-[20px]">
        <Button variant="ghost" type="button" onClick={() => setPage('sales')}>
          Anterior
        </Button>

        <Button disabled={loading} variant="omnisystem" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
};
