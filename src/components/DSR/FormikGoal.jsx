import React from 'react';
import { useFormik } from 'formik';
import { goalSchema } from '@/schemas/schemas';
import { Button } from '../ui/button';

import { DialogClose } from '../ui/dialog';
import { addGoals } from '@/api/goals';
import { Formik_Input } from '../Global/Formik_Input';
import { Formik_Calendar } from '../Global/Formik_Calendar';

const FormikGoal = () => {
  const formik = useFormik({
    initialValues: {
      date: '',
      value_goal: '',
      transaction_goal: '',
      addons_goal: '',
      food_attach_goal: '',
    },
    validationSchema: goalSchema,
    onSubmit: async (values, actions) => {
      const form = { ...values };
      const response = await addGoals(form);
      if (response.success) {
        actions.resetForm();
      } else {
        alert(response.error);
      }
    },
  });

  return (
    <div className="w-full p-2 m-auto">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Formik_Calendar formik={formik} formikKey="date" />
        <Formik_Input
          label="Valor"
          type="number"
          formikKey="value_goal"
          formik={formik}
        />
        <Formik_Input
          label="Transações"
          type="number"
          formikKey="transaction_goal"
          formik={formik}
        />
        <Formik_Input
          label="Food Attach"
          type="number"
          formikKey="food_attach_goal"
          formik={formik}
        />
        <Formik_Input
          label="Agregações"
          type="number"
          formikKey="addons_goal"
          formik={formik}
        />

        <div className="flex self-center mt-[20px] gap-[20px]">
          <DialogClose>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={formik.isSubmitting}
            variant="omnisystem"
            type="submit"
            onClick={() => {
              console.log(formik.values);
            }}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormikGoal;
