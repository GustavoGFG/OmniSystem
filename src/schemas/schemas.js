import { format, min } from 'date-fns';
import * as yup from 'yup';

const regex = {
  full_name: /^[a-zA-Z]{2,12}(?: [a-zA-Z]{2,12}){1,5}$/,
  cpf: /^[0-9]{11}$/,
  currency: /^\-?\d+(?:\.\d{1,2})?$/,
  positiveCurrency: /^\d+(?:\.\d{1,2})?$/,
};

const errorText = {
  required: 'Campo obrigatório',
  integer: 'Deve ser número inteiro',
  type: e => `e`,
  min: e => {
    return `Valor mínimo: ${e}`;
  },
  max: e => {
    return `Valor máximo: ${e}`;
  },
  currency: 'Deve ser monetário',
  positiveCurrency: 'Deve ser monetário e positivo',
};

export const saleSchema = yup.object().shape({
  date: yup.string().required(errorText.required),
  id: yup
    .number()
    .typeError(errorText.type('Valor inteiro: 1'))
    .integer(errorText.integer)
    .required(errorText.required),
  value: yup
    .number()
    // .string()
    // .matches(regex.positiveCurrency, errorText.positiveCurrency)
    .typeError(errorText.type('Valor monetário: 1000.00'))
    .min(1, errorText.min(1))
    .required(errorText.required),
  transaction: yup
    .number()
    .integer(errorText.integer)
    .typeError(errorText.type('Valor inteiro: 355'))
    .min(1, errorText.min(1))
    .required(errorText.required),
  food_attach: yup
    .number()
    .typeError(errorText.type('Valor decimal: 0.05'))
    .min(0, errorText.min(0))
    .max(1, errorText.max(1))
    .required(errorText.required),

  addons: yup
    .number()
    .typeError(errorText.type('Valor decimal: 0.05'))
    .min(0, errorText.min(0))
    .max(1, errorText.max(1))
    .required(errorText.required),

  employee_id: yup
    .number()
    .typeError(errorText.type('Valor inteiro: 1'))
    .integer(errorText.integer)
    .required(errorText.required),
});

export const mistakeSchema = yup.object().shape({
  date: yup.string().required(errorText.required),
  id: yup
    .number()
    .typeError(errorText.type('Valor inteiro: 1'))
    .integer(errorText.integer)
    .required(errorText.required),
  value: yup
    .string()
    .matches(regex.currency, errorText.currency)
    .typeError(errorText.type('Valor monetário: 17.00'))
    .required(errorText.required),
  reason: yup.string().required(errorText.required),
  receipt: yup.string(),
  employee_id: yup
    .number()
    .typeError(errorText.type('Valor inteiro: 1'))
    .integer(errorText.integer)
    .required(errorText.required),
});

export const goalSchema = yup.object().shape({
  date: yup.string().required(errorText.required),

  value_goal: yup
    .number()
    .typeError(errorText.type('Valor monetário: 1000.00'))
    .min(1, errorText.min(1))
    .required(errorText.required),

  transaction_goal: yup
    .number()
    .integer(errorText.integer)
    .typeError(errorText.type('Valor inteiro: 355'))
    .min(1, errorText.min(1))
    .required(errorText.required),

  addons_goal: yup
    .number()
    .typeError(errorText.type('Valor decimal: 0.05'))
    .min(0, errorText.min(0))
    .max(1, errorText.max(1))
    .required(errorText.required),

  food_attach_goal: yup
    .number()
    .typeError(errorText.type('Valor decimal: 0.05'))
    .min(0, errorText.min(0))
    .max(1, errorText.max(1))
    .required(errorText.required),
});

export const employeeSchema = yup.object().shape({
  full_name: yup
    .string()
    .matches(regex.full_name, 'Preencha com nome completo')
    .required(errorText.required),

  cpf: yup
    .string()
    .typeError()
    .min(11, errorText.min(11))
    .max(11, errorText.max(11))
    .matches(regex.cpf, 'CPF: 12345678910')
    .required(errorText.required),
  role: yup
    .string()
    .oneOf(
      ['Cashier', 'Coordinator', 'Manager'],
      'Selecione um cargo da lista'
    ),
  hire_date: yup.string().required(errorText.required),
});

// VALIDATE FUNCTIONS
export const validateSalesArray = salesArray => {
  try {
    salesArray.forEach(sale => {
      saleSchema.validateSync(sale, { abortEarly: false });
    });
    return true;
  } catch (error) {
    console.error('Sales validation error', error);
    return false;
  }
};

export const validateMistakesArray = mistakesArray => {
  try {
    mistakesArray.forEach(mistake => {
      mistakeSchema.validateSync(mistake, { abortEartly: false });
    });
    return true;
  } catch (error) {
    console.error('Mistakes validation error: ', error);
    return false;
  }
};
