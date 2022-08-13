import {  Formik, Form } from "formik";
import "../styles/styles.css";
import * as Yup from "yup";
import {MyCheckbox,MyTextInput,MySelect} from '../components';

export const FormikAbstraction = () => {
  return (
    <div>
      <h1>Formik Components</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          terms: false,
          jobType: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Debe tener 15 caracteres o menos")
            .required("Requerido"),
          lastName: Yup.string()
            .max(15, "Debe tener 15 caracteres o menos")
            .required("Requerido"),
          email: Yup.string().email("Email no valido").required("Requerido"),
          terms: Yup.boolean().oneOf([true],'Debe de aceptar las condiciones'),
          jobType: Yup.string().required('required').notOneOf(['it-jr'],'Esta opcion no es permitida')
        })}
      >
        {(formik) => (
          <Form>
            <MyTextInput name="firstName" label="First Name" placeholder="Nombre" />

            <MyTextInput name="lastName" label="Last Name" placeholder="Apellido" />

            <MyTextInput name="email" label="Email" placeholder="example@email.com" type="email" />

            <MySelect label={"Job Type"} name={"jobType"}  >
              <option value="">Pick something</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-senior">IT senior</option>
              <option value="it-jr">IT jr</option>              
            </MySelect>

            <MyCheckbox label={"Termns and conditions"} name={"terms"} />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
