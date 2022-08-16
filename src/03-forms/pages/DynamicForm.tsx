import React from "react";
import formJson from "../data/custom-form.json";
import { Form, Formik } from "formik";
import { MyTextInput } from "../components";


const initialValues:{[key:string]:any}={}

for (const input of formJson) {
    initialValues[input.name] = input.value
}

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic form</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form noValidate>
            {formJson.map(({ type, name, placeholder, label }) => {
              return (
                <MyTextInput
                  label={label}
                  name={name}
                  type={type as any}
                  placeholder={placeholder}
                  key={name}
                />
              );
            })}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
