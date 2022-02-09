import { React } from 'react';
import { NavbarComponent } from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

function Home() {
    const [user, setUser] = useState({});
    useEffect(() => {

        setInterval(() => {
            const userString = localStorage.getItem(STORAGE_KEYS.USER_KEY);
            const user = JSON.parse(userString);
            setUser(user);
        }, [])
    })

    const logout = () => {
        return localStorage.removeItem(STORAGE_KEYS.USER_KEY);
    }

    return (
        <NavbarComponent
            user={user}
            onLogout={logout}
        />
    )

}

export { Home };