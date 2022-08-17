import React from "react";
import formJson from "../data/custom-form.json";
import { Form, Formik } from "formik";
import { MySelect, MyTextInput } from "../components";
import * as Yup from 'yup';

const initialValues: { [key: string]: any } = {};

const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
  initialValues[input.name] = input.value;

  if (!input.validations) continue;

  let schema = Yup.string();  

  for (const rule of input.validations) {
    if (rule.type==="required") {
      schema = schema.required("Este campo es requerido")
    }  
    if (rule.type ==="minLength") {
      schema = schema.min((rule as any ).value || 2,`Minimo de ${(rule as any).value} caracteres`)
    }
    if(rule.type==="email"){
      schema = schema.email("Formato incorrecto")
    }
  }
  requiredFields[input.name]= schema;
}

const validationSchema= Yup.object({...requiredFields});

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form noValidate>
            {formJson.map(({ type, name, placeholder, label, options }) => {
              if (type === "input" || type === "password" || type === "email") {
                return (
                  <MyTextInput
                    label={label}
                    name={name}
                    type={type as any}
                    placeholder={placeholder}
                    key={name}
                  />
                );
              } else if (type === "select") {
                return (
                  <MySelect label={label} name={name} key={name}>
                    <option value="">Select option</option>
                      {
                        options?.map( opt =>(
                          <option key={opt.id} value={opt.id}>{opt.label}</option>
                        ))
                      }
                  </MySelect>
                  );
              }
              throw new Error(`El tipo ${type} no es soportado`);
            })}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
