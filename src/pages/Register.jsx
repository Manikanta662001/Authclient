import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { httpMethods } from "../api/Service";
import Alert from "@mui/material/Alert";

function Register() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [cpasswordShow, setCPasswordShow] = useState(false);
  const [apiStatus, setApiStatus] = useState({ sucssMsg: "", errMsg: "" });
  const { sucssMsg, errMsg } = apiStatus;
  const data = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    profileimg: null,
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Required")
      .max(15, "Not more than 15 Characters"),
    email: Yup.string().required("Required").email("Invalid Email Address"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
        "An Uppercase,Special symbol,Number,8 Characters Required",
      ),
    cpassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords are not matched "),
    profileimg: Yup.mixed().required("Required"),
  });
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>
          <Formik
            initialValues={data}
            validationSchema={validate}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const formData = new FormData();
              formData.append("file", values.profileimg);
              formData.append("user", JSON.stringify(values));
              httpMethods
                .post("/user/register", formData, "file_upload")
                .then((result) => {
                  setApiStatus({ ...apiStatus, sucssMsg: result.message });
                  resetForm();
                })
                .catch((error) => {
                  setApiStatus({ ...apiStatus, errMsg: error.message });
                })
                .finally(() => {
                  setSubmitting(false);
                  setTimeout(() => {
                    setApiStatus({ ...apiStatus, sucssMsg: "", errMsg: "" });
                  }, 4000);
                });
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form_input">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your Name"
                  />
                  <p className="err_msg">
                    <ErrorMessage name="name" />
                  </p>
                </div>
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
                <div className="form_input">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <div className="two">
                    <Field
                      type={cpasswordShow ? "text" : "password"}
                      name="cpassword"
                      id="cpassword"
                      placeholder="Enter Confirm Password"
                    />
                    <div
                      className="showpass"
                      onClick={() => setCPasswordShow(!cpasswordShow)}
                    >
                      {cpasswordShow ? "Hide" : "Show"}
                    </div>
                  </div>
                  <p className="err_msg">
                    <ErrorMessage name="cpassword" />
                  </p>
                </div>
                <div className="form_input">
                  <label htmlFor="profileimg">Profile Image</label>
                  <Field
                    type="file"
                    name="profile-img"
                    id="profileimg"
                    onChange={(event) =>
                      setFieldValue("profileimg", event.target.files[0])
                    }
                  />
                  <p className="err_msg">
                    <ErrorMessage name="profileimg" />
                  </p>
                </div>
                {sucssMsg && <Alert severity="success">{sucssMsg}</Alert>}
                {errMsg && <Alert severity="error">{errMsg}</Alert>}
                <button className="btn" type="submit">
                  Signup
                </button>
                <p>
                  Already Have an Account? <NavLink to={"/"}>Login</NavLink>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export default Register;
