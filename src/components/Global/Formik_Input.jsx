import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const Formik_Input = ({ label, type, formikKey, formik, transform }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="value_goal">{label}</Label>
      <Input
        type={type}
        id={formikKey}
        name={formikKey}
        onBlur={formik.handleBlur}
        onChange={e => {
          formik.setFieldValue(
            formikKey,
            transform ? transform(e.target.value) : e.target.value
          );
          formik.handleChange;
        }}
        value={formik.values[formikKey]}
      />
      {formik.errors[formikKey] && formik.touched[formikKey] && (
        <span className="font-bold text-xs text-destructive">
          {formik.errors[formikKey]}
        </span>
      )}
    </div>
  );
};
