import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './login.css'; // Import the CSS for LoginForm

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Props {
  toggleForm: () => void;
}

const LoginForm: React.FC<Props> = ({ toggleForm }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<LoginValues>({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        email: storedEmail,
      }));
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values: LoginValues) => {
    const isUserSignedUp = localStorage.getItem("isSignedUp");
    if (!isUserSignedUp) {
      setMessage("Please sign up first.");
      return;
    }

    console.log(values);
    if (values.rememberMe) {
      localStorage.setItem("rememberedEmail", values.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    setMessage("Login Successful");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form aria-labelledby="login-form">
          
            <div className="input-container">
                <i className="fa fa-user icon"></i>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="input-field"
              />
            </div>
            <ErrorMessage className="error" component="div" name="email" />

            <div className="input-container">
              <i className="fa fa-lock icon"></i>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="input-field"
              />
            </div>
            <ErrorMessage className="error"  component="div" name="password" />

            <label>
              <Field type="checkbox" name="rememberMe" />
              Remember Me
            </label>

            <button type="submit">Login</button>
          </Form>
        </Formik>

        {message && <p>{message}</p>}
        <p>
          Don't have an account?{" "}
          <button className="signup" type="button" onClick={toggleForm}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
