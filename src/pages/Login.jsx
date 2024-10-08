import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./mix.css";
import { httpMethods } from "../api/Service";
import { setCookie } from "../utils/utils";
import { useUserContext } from "../components/authContext/AuthContext";
import { BE_URL } from "../utils/Constatnts";

function Login() {
  const userContext = useUserContext();
  const { setIsLoggedIn } = userContext;
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const data = {
    email: "gundlurimanikanta142@gmail.com",
    password: "Mani@6620",
  };
  const validate = Yup.object({
    email: Yup.string().required("Required").email("Invalid Email Address"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
        "An Uppercase,Special symbol,Number,8 Characters Required",
      ),
  });
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hii, we are glad you are back. Please Login.</p>
          </div>
          <Formik
            initialValues={data}
            validationSchema={validate}
            onSubmit={(values) => {
              console.log(values);
              httpMethods
                .post(BE_URL + "/user/login", values)
                .then((result) => {
                  console.log(result, "tokenResult");
                  setCookie("accessToken", result.accessToken);
                  setCookie("refreshToken", result.refreshToken);
                  setIsLoggedIn(true);
                  navigate("/dashboard");
                })
                .catch((err) => {
                  throw new Error(err.message);
                });
            }}
          >
            <Form>
              <div className="form_input">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email Address"
                />
                <p className="err_msg">
                  <ErrorMessage name="email" />
                </p>
              </div>
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                  <Field
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                  />
                  <div
                    className="showpass"
                    onClick={() => setPasswordShow(!passwordShow)}
                  >
                    {passwordShow ? "Hide" : "Show"}
                  </div>
                </div>
                <p className="err_msg">
                  <ErrorMessage name="password" />
                </p>
              </div>
              <button className="btn" type="submit">
                Login
              </button>
              <p>
                Don't Have an Account?{" "}
                <NavLink to={"/register"}>Sign Up</NavLink>
              </p>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
}

export default Login;
