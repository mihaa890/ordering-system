import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import '../forgot-password/ForgotPassword.css'

export const ForgotPassword = () => {

    const [state, setState] = useState({
        email: ''
    });

    const [message, setMessage] = useState({
        type: "SUCCESS",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        await fetch(`http://localhost:3001/api/forgot-password`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: state.email })

        }).then(res => {
            setMessage({
                type: "SUCCESS",
                message: `Please check your email.`
            });
            console.log(res)
            res.json()
        }).catch(error => {
            console.log(error)
        });
    }

    return <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
        <div className="container">
            <Form>
                <h3>
                    Forgot Password
                </h3>
                <p>
                    Enter your email address below to reset your password. You may need to check your spam folder.
                </p>
                <div className="input-field">
                    <Field className="form-control" type="text" name="email" value={state.email} placeholder="email" onChange={handleChange} /></div>
                <div className={`message${message.type === "SUCCESS" ? " success" : " error"}`}
                    style={{ display: message.message ? "block" : "none" }}
                >
                    <span className={`text${message.type === "SUCCESS" ? " success" : " error"}`}>
                        {message.message}</span>
                </div>
                <button className="btn btn-primary" type="submit"> Submit</button>
            </Form>
        </div>
    </Formik>
}

