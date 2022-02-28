import { useState, useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useLogout } from "../../Hooks/useLogout";
import { NavbarComponent } from "../navbar/Navbar";
import { BallTriangle } from 'react-loader-spinner'
import { STORAGE_KEYS } from "../../utils/constants";
import useTokenValidator from "../../Hooks/useToken";
import { useNavigate } from "react-router-dom";

import "./FreeTables.css"


const FreeTables = () => {

    const [data, setData] = useState('');
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate();

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN_KEY).replace(/"/g, '')
    const isTokenValid = useTokenValidator(token)


    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/free-tables", config, isTokenValid)
            const data = await response.json();
            setData(data)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            if (!isTokenValid) {
                navigate('/')
            }
        }
        fetchData();
    }, [isTokenValid, navigate]);

    const handleClick = (_id) => {
        navigate(`/order/${_id}`)

    }

    return (isLoading ? <div className="spinner"><BallTriangle
        color="#00BFFF" height={100} width={100}
    /></div> : <div>
        <NavbarComponent
            useAuth={useAuth}
            onLogout={useLogout}>
        </NavbarComponent>
        {data && data.length
            ? <table className="table">
                <thead>
                    <tr>
                        <th>Table Identifier</th>
                        <th>Capacity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{data.map(table => <tr key={table._id}>
                    <td>{table.tableIdentifier}</td>
                    <td>{table.capacity}</td>
                    <td>
                        <button className="btn btn-primary" onClick={() => handleClick(table._id)}> Order </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            : <span>No data </span>
        }
    </div>
    )
}


export { FreeTables }
