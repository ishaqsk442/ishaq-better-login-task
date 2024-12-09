import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { evaluatePasswordStrength } from "../utils/passwordStrength";
import './signup.css'; // Import the CSS for SignUpForm

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  toggleForm: () => void;
}

const SignUpForm: React.FC<Props> = ({ toggleForm }) => {
  const [message, setMessage] = useState<string | null>(null);

  const initialValues: SignUpValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSignUp = (values: SignUpValues) => {
    console.log(values);
    localStorage.setItem("isSignedUp", "true");
    setMessage("Sign Up Successful. You can now log in.");
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ values }) => (
            <Form aria-labelledby="signup-form">
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
              <ErrorMessage className="error"  component="div" name="email" />

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
              <p className="password-strength">Password Strength: {evaluatePasswordStrength(values.password)}</p>
              <ErrorMessage className="error" component="div" name="password" />

              <div className="input-container">
                <i className="fa fa-lock icon"></i>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input-field"
                />
              </div>
              <ErrorMessage className="error" component="div" name="confirmPassword" />

              <button type="submit">Sign Up</button>
            </Form>
          )}
        </Formik>

        {message && <p>{message}</p>}
        <p>
          Already have an account?{" "}
          <button type="button" onClick={toggleForm}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
