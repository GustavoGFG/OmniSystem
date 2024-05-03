import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { mistakeSchema, saleSchema } from '@/schemas/schemas';
import { getSales } from '@/api/sales';
import { getMistakes } from '@/api/mistakes';
import { Form_Mistake } from './Forms/Form_Mistake';
import { Form_Sale } from './Forms/Form_Sale';
import { useContext } from 'react';
import { DataContext } from '@/contexts/DataContext';

const FormikSale = ({ setOpen }) => {
  const [page, setPage] = useState('sales');

  const { employee } = useContext(DataContext);
  const cashiers = employee.filter(employee => employee.role == 'Cashier');

  const [salesArray, setSalesArray] = useState([]);
  const [mistakesArray, setMistakesArray] = useState([]);

  const getSalesByDate = async data => {
    const response = await getSales();
    if (response.success) {
      let filteredData = response.data.filter(sale => {
        return sale.date == new Date(data).toISOString();
      });
      filteredData = filteredData.map(sale => {
        sale.date = data;
        return sale;
      });
      setSalesArray(filteredData);
    }
    const responseMistakes = await getMistakes();
    if (responseMistakes.success) {
      let filteredMistakes = responseMistakes.data.filter(mistake => {
        return mistake.date == new Date(data).toISOString();
      });
      filteredMistakes = filteredMistakes.map(mistake => {
        mistake.date = data;

        return mistake;
      });
      setMistakesArray(filteredMistakes);
    }
  };

  const formik_sale = useFormik({
    initialValues: {
      date: '',
      id: 0,
      value: '',
      transaction: '',
      food_attach: '',
      addons: '',
      employee_id: '',
    },
    validationSchema: saleSchema,
  });
  const formik_mistake = useFormik({
    initialValues: {
      date: '',
      id: 0,
      value: '',
      reason: '',
      receipt: '',
      employee_id: '',
    },
    validationSchema: mistakeSchema,
  });

  useEffect(() => {
    getSalesByDate(formik_sale.values.date);
    formik_mistake.setFieldValue('date', formik_sale.values.date);
  }, [formik_sale.values.date]);

  return (
    <div className="w-full p-2 m-auto">
      {page == 'sales' && (
        <Form_Sale
          formik={formik_sale}
          employees={cashiers}
          setPage={setPage}
          salesArray={salesArray}
          setSalesArray={setSalesArray}
        />
      )}
      {page == 'mistakes' && (
        <Form_Mistake
          formik={formik_mistake}
          employees={cashiers}
          setPage={setPage}
          mistakesArray={mistakesArray}
          setMistakesArray={setMistakesArray}
          salesArray={salesArray}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default FormikSale;
