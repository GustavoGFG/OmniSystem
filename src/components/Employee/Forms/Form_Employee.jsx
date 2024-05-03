import React from 'react';
import { useFormik } from 'formik';
import { employeeSchema } from '@/schemas/schemas';
import { Button } from '@/components/ui/button';
import { DialogClose } from '../../ui/dialog';
import { addEmployees, getEmployees } from '@/api/employees';
import { Formik_Calendar } from '@/components/Global/Formik_Calendar';
import { Formik_Selector } from '@/components/Global/Formik_Selector';
import { Formik_Input } from '@/components/Global/Formik_Input';
import { transformCPF, transformFullName } from '@/utils/utils';
import { roles } from '@/data/data';
import { useContext } from 'react';
import { DataContext } from '@/contexts/DataContext';

export const Form_Employee = () => {
  const { setEmployee } = useContext(DataContext);
  const formik = useFormik({
    initialValues: {
      full_name: '',
      cpf: '',
      role: '',
      hire_date: '',
    },
    validationSchema: employeeSchema,
    onSubmit: async (values, actions) => {
      var form = { ...values };
      const response = await addEmployees(form);
      if (response.success) {
        const data = await getEmployees();
        if (data.success) {
          setEmployee(data.data);
        }
        actions.resetForm();
      } else {
        alert(response.error);
      }
    },
  });

  return (
    <div className="w-full p-2 m-auto">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Formik_Input
          label="Nome"
          type="text"
          formikKey="full_name"
          formik={formik}
          transform={transformFullName}
        />
        <Formik_Input
          label="CPF"
          type="text"
          formikKey="cpf"
          formik={formik}
          transform={transformCPF}
        />
        <Formik_Selector
          notFoundText="Cargo não encontrado."
          searchText="Selecione o cargo..."
          formik={formik}
          formikKey="role"
          labelsArray={roles.map(role => {
            return role.label;
          })}
          valuesArray={roles.map(role => {
            return role.value;
          })}
        />
        <Formik_Calendar formik={formik} formikKey="hire_date" />
        <div className="flex self-center mt-[40px] gap-[20px]">
          <DialogClose>
            <Button
              variant="ghost"
              type="button"
              disabled={formik.isSubmitting}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={formik.isSubmitting}
            variant="omnisystem"
            type="submit"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};
