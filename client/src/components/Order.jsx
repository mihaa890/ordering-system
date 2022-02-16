import { NavbarComponent } from "./Navbar"
import { useAuth } from '../Hooks/useAuth';
import { useLogout } from "../Hooks/useLogout";
import { BsCart3 } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
import useTokenValidator from "../Hooks/useToken";
import { STORAGE_KEYS } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

import "./Order.css"

const Order = () => {
    const [items, setItems] = useState('');

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN_KEY).replace(/"/g, '')
    const isTokenValid = useTokenValidator(token)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const params = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        async function getAllItems() {
            const res = await fetch("/api/getAll", config, isTokenValid)
            const data = await res.json();
            const parsedItems = data.map(item => {
                return {
                    id: item._id,
                    name: item.product.name,
                    price: item.product.price,
                    checked: false
                }

            })
            setItems(parsedItems)
        }

        getAllItems()

    }, []);

    const onSubmit = async () => {

       const response =  await fetch('http://localhost:3001/api/order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                orderItems: [
                    {
                        menuItems: items.filter(item => item.checked).map(item => item.id)
                    }
                ],
                table: params.id,
            })
        })
        const data = await response.json()
        navigate(`/getOrder/${data._id}`)

    }
    const handleSelect = (e) => {
        const { name, checked } = e.target;
        const updatedItems = items.map(item => {
            return {
                ...item,
                checked: item.name === name ? checked : item.checked
            }
        })
        setItems(updatedItems)
        
    }


    return <div>
        <NavbarComponent
            useAuth={useAuth}
            onLogout={useLogout} />
        <div className="order">
            <div>

                <div> {items && items.length && items.map(item => <div key={item._id}>
                    <label className="input-label">
                        <input
                            name={item.name}
                            type="checkbox"
                            checked={item.checked}
                            onChange={handleSelect}
                        />{' '}
                        {item.name}
                        {item.price}

                    </label>
                </div>
                )}
                </div>
                <div className="button">
                    <button type="button" className="btn_order btn-primary" onClick={onSubmit}> Order <BsCart3 /> </button>
                </div>
            </div>
        </div>
    </div>

}

export { Order }