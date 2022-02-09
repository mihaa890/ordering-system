import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useTokenValidator from "../Hooks/useToken";
import { useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import './ResetPassword.css'



export const ResetPassword = () => {

    const navigate = useNavigate()

    const [state, setState] = useState({
        newPassword: '',
        confirmPass: '',
    })
    const { token } = useParams();
    const isTokenValid = useTokenValidator(token)

    useEffect(() => {
        if (!isTokenValid) {
            navigate('/')
        }

    }, [isTokenValid, navigate])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {

        if (state.confirmPass !== state.newPassword) {
            alert("Passwords do not match")
            return
        }
        const payload = {
            token,
            newPassword: state.newPassword
        }

        await fetch('http://localhost:3001/api/reset-password', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        }).then(res => {
            navigate('/')
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    return <Formik initialValues={{ pass: '', confirmPass: '' }} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
            <div className="container">
                <Form>
                    <h3 className="card-header">Reset password</h3>
                    <div className="form-body">
                        <div className="input-field">
                            <label>New Password</label>
                            <Field className="form-control" type="password" name="newPassword" value={state.newPassword} placeholder="new password" onChange={handleChange} />
                        </div>
                        <div className="input-field">
                            <label>Confirm Password</label>
                            <Field className="form-control" type="password" name="confirmPass" value={state.confirmPass} placeholder="confirm password" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary"> Submit</button>

                    </div>

                </Form>
            </div>
        )}
    </Formik>

}