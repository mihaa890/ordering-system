import { useLogout } from "../Hooks/useLogout";
import { useAuth } from "../Hooks/useAuth";
import { NavbarComponent } from "./Navbar"
import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { Formik , Form, Field } from 'formik';

import './Menu.css'

const Menu = () => {
    
    const [product, setProduct] = useState({
                name: '',
                price: '',
                qty : ''
        
    });
    const [message, setMessage] = useState({
        type: "SUCCESS",
        message: ""
    });

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN_KEY).replace(/"/g, '')


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setMessage({
            type: '',
            message : ""
        })
    }

    const onSubmit = async () => {

        await fetch('http://localhost:3001/api/createMenu', {
             method: "POST",
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${token}`
             },
             body: JSON.stringify({product})
         })
         setProduct({
            name: '',
            price: '',
            qty : ''
         })
         setMessage({
            type: "SUCCESS",
            message: `Add another product or go back`
         })
     }
    return ( <div>
        <NavbarComponent
        useAuth={useAuth}
        onLogout={useLogout} />
        <div className="add-menu-container">
        <Formik initialValues={{ name : '' , price: '' , qty : ''}} onSubmit={onSubmit}>
        <Form className="form_menu">
                <h3>
                   Add items to menu
                </h3>
                <div className="input-field">
                    <Field className="form-control_menu" type="text" name="name" value={product.name} placeholder="description" onChange={handleChange} />
                    <Field className="form-control_menu" type="text" name="price" value={product.price} placeholder="price" onChange={handleChange} />
                    <Field className="form-control_menu" type="text" name="qty" value={product.qty} placeholder="qty" onChange={handleChange} /></div>
                    <div className={`message${message.type === "SUCCESS" ? " success" : " error"}`}
                    style={{ display: message.message ? "block" : "none" }}
                >
                    <span className={`text${message.type === "SUCCESS" ? " success" : " error"}`}>
                        {message.message}</span>
                </div>
                <button className="btn btn-primary" type="submit"> Add</button>
            </Form>
</Formik>
      </div>
    </div>)
}

export {Menu}