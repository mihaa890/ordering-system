import { React } from 'react';
import { NavbarComponent } from './Navbar';
import {useAuth} from '../Hooks/useAuth';
import {useLogout} from '../Hooks/useLogout'

function Home() {
    return (
        <NavbarComponent
            useAuth={useAuth}
            onLogout={useLogout}
        />
    )

}

export { Home };