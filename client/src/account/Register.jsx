import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from "react";
import { NavbarComponent } from '../components/Navbar';
import { useLogout } from '../Hooks/useLogout';
import { useAuth } from '../Hooks/useAuth';

import './Register.css';


function Register({ history }) {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };
    const [message, setMessage] = useState({
        type : "SUCCESS",
        message : ""
    });

    const [mailerState, setMailerState] = useState({
        name: "",
        email: "",
        password: "",
      });

      function handleStateChange(e) {
        setMailerState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }

    const onSubmit = async (e) => {
        
        e.preventDefault();
        console.log({ mailerState });
        const response = await fetch('http://localhost:3001/api/signup', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify( mailerState ),
        })
          .then((res) =>{
              if(res.status === 201){
                res.json()
                setMessage({
                    type: "SUCCESS",
                    message:`An email was sent to to your account please verify`
                });

              }
              else if(res.status === 409){
                setMessage({
                    type: "ERROR",
                    message:`User with given email already exist!`
                });

            }
              else{
                setMessage({
                    type: "ERROR",
                    message: `An error occured`
                });
              }
              setMailerState({
                name: "",
                email: "",
                password: "",
              });
          }) 
        };


    return (<div> 
      <NavbarComponent useAuth={useAuth} onLogout={useLogout} />
        <Formik initialValues={initialValues}    onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <div className='container_register'>
                <Form  onSubmit={onSubmit}  >
                    <h3 className="card-header_register">Register</h3>
                    <div className="card-body_register">
                    <div className="form-group">
                            <label>Name</label>
                            <Field name="name" type="text" placeholder="Name" value={mailerState.name} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} onChange={handleStateChange}   />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" placeholder="Email" value={mailerState.email} className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}  onChange={handleStateChange}  />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <Field name="password" type="password" placeholder="password"  value={mailerState.password} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}  onChange={handleStateChange}  />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="group">

                         <div className={`message${message.type === "SUCCESS" ? " success" : " error"}`}
                         style={{ display: message.message ? "block"  : "none" }}
                       >
                         <span className={`text${message.type === "SUCCESS" ? " success" : " error"}`}>
                         {message.message}</span>
                       </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                        </div>
                </Form>
                </div>
            )}
        </Formik>
        </div>
    )
}

export { Register }; 