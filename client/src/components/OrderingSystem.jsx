import React from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import useTokenValidator from '../Hooks/useToken';
import { NavbarComponent } from './Navbar';
import { useAuth } from '../Hooks/useAuth';
import { useLogout } from '../Hooks/useLogout';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner'
import GeneratePdf from './GeneratePdf';

import './OrderingSystem.css'

const OrderingSystem = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN_KEY).replace(/"/g, '')
    const isTokenValid = useTokenValidator(token)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const params = useParams();
    const [state, setState] = useState({
        menuItems: null,
        order: null
    });
    const [isOnPdfView, setIsOnPdfView] = useState(false);
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        const getItemById = async (order) => {
            const ids = order[0].orderItems[0].menuItems
            const response = await fetch(`/api/getItemById/?ids=${ids}`, config)
            const menuItemsData = await response.json()
            return menuItemsData
        }
        async function getOrderById() {
            const _id = params.id
            const response = await fetch(`/api/orderById/${_id}`, config)
            const order = await response.json();
            const menuItemsData = await getItemById(order)

            setState({
                menuItems: menuItemsData,
                order
            })


        }
        setTimeout(() => {
            setIsOnPdfView(true)
            setLoading(false)
        }, 2000);

        getOrderById()
    }, [isTokenValid])



    return (isLoading ? <div className="spinner"><BallTriangle
        color="#00BFFF" height={100} width={100}
    /></div> : <div>
        <NavbarComponent
            useAuth={useAuth}
            onLogout={useLogout} />

        {isOnPdfView && <BlobProvider document={<GeneratePdf props={state} />}>
            {({ url }) => (
                <a href={url} target="_blank" rel="noreferrer">
                    Open the invoice in a new tab.
                </a>
            )}
        </BlobProvider>}

    </div>
    )
}

export { OrderingSystem }


