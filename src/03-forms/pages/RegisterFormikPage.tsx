import { Form, Formik } from "formik";
import { MyTextInput } from "../components";
import "../styles/styles.css";
import * as Yup from "yup";

export const RegisterFormikPage = () => {

  return (
    <div>
      <h1>RegisterFormikPage</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password1:"",
          password2:""
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2,"Debe tener 2 caracteres o mas")
            .max(15, "Debe tener 15 caracteres o menos")
            .required("Requerido"),
          email: Yup.string().email("Email no valido").required("Requerido"),
          password1: Yup.string().min(6,"minimo 6 letras").required("Requerido"),
          password2: Yup.string().oneOf([Yup.ref("password1")],"Las contraseñas no son iguales").required("Requerido"),
        })}
      >
        {({handleReset}) => (
          <Form>
            <MyTextInput name="name" label="First Name" placeholder="Nombre" />

            <MyTextInput name="email" label="Email" placeholder="example@email.com" type="email" />

            <MyTextInput name="password1" label="Password" type="password" />
            <MyTextInput name="password2" label="Repita password" type="password" />
            <button type="submit" onClick={handleReset}>Submit</button>
          </Form>
        )}

      </Formik>
    </div>
  );
};
