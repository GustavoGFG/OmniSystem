import React from 'react';
import { useFormik } from 'formik';
import { goalSchema } from '@/schemas/schemas';
import { Button } from '../ui/button';

import { DialogClose } from '../ui/dialog';
import { addGoals } from '@/api/goals';
import { Formik_Input } from '../Global/Formik_Input';
import { Formik_Calendar } from '../Global/Formik_Calendar';
import { useToast } from '../ui/use-toast';
import { Toaster } from '../ui/toaster';
import {
  transformToAddons,
  transformToFloat,
  transformToInteger,
} from '@/utils/utils';

const FormikGoal = () => {
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      date: '',
      value_goal: null,
      transaction_goal: null,
      addons_goal: null,
      food_attach_goal: null,
    },
    validationSchema: goalSchema,
    onSubmit: async (values, actions) => {
      console.log('VALUES: ', values);
      const form = { ...values };
      const response = await addGoals(form);
      if (response.success) {
        actions.resetForm();
      } else {
        // alert('ERRO:');
        toast({ variant: 'destructive', description: response.error });
        // alert(response.error);
      }
    },
  });

  return (
    <div className="w-full p-2 m-auto">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Formik_Calendar formik={formik} formikKey="date" />
        <Formik_Input
          label="Valor"
          type="text"
          formikKey="value_goal"
          formik={formik}
          transform={transformToFloat}
        />
        <Formik_Input
          label="Transações"
          type="text"
          formikKey="transaction_goal"
          formik={formik}
          transform={transformToInteger}
        />
        <Formik_Input
          label="Food Attach"
          type="text"
          formikKey="food_attach_goal"
          formik={formik}
          transform={transformToFloat}
        />
        <Formik_Input
          label="Agregações"
          type="text"
          formikKey="addons_goal"
          formik={formik}
          transform={transformToAddons}
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
