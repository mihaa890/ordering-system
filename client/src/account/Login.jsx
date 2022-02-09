import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../utils/constants';
import bcrypt from 'bcryptjs'



function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };
  const [message, setMessage] = useState({
    type: "SUCCESS",
    message: ""
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleStateChange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));    

  }


  const onSubmit = async () => {
    await fetch('http://localhost:3001/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          const _password = bcrypt.hashSync(user.password,10)
          localStorage.setItem(STORAGE_KEYS.USER_KEY, JSON.stringify({email : user.email})) 
          navigate('/')
          setMessage({
            type: "SUCCESS",
            message: `Successful login`
          });

        }
        else if (res.status === 404) {
          setMessage({
            type: "ERROR",
            message: `User does not exists.`
          })
        }
        else {
          if (res.status === 400) {
            setMessage({
              type: "ERROR",
              message: `Invalid Credentials`
            });
          }
        }

      })
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <div className="container">
          <Form>
            <h3 className="card-header">Login</h3>
            <div className="card-body">
              <div className="form-group">
                <label>Email</label>
                <Field name="email" type="text" value={user.email} className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} onChange={handleStateChange} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field name="password" type="password" value={user.password} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} onChange={handleStateChange} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <div className={`message${message.type === "SUCCESS" ? " success" : " error"}`}
                    style={{ display: message.message ? "block" : "none" }}
                  >
                    <span className={`text${message.type === "SUCCESS" ? " success" : " error"}`}>
                      {message.message}</span>
                  </div>
                  <button type="submit" className="btn btn-primary" >
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Login
                  </button>
                  <Link to="/register" className="btn btn-link">Register</Link>
                </div>
                <div className="form-group col text-right">
                  <Link to="/forgot-password" className="btn btn-link pr-0">Forgot Password?</Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>

  )
}

export { Login }; 