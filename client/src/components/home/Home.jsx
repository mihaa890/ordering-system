import { React } from 'react';
import { NavbarComponent } from '../navbar/Navbar';
import {useAuth} from '../../Hooks/useAuth';
import {useLogout} from '../../Hooks/useLogout'
import { HomeCarousel } from '../carousel/Carousel';

function Home() {
    return (
        <div>
            
        <NavbarComponent
            useAuth={useAuth}
            onLogout={useLogout}
        />
        <HomeCarousel/>
        </div>
    )

}

export { Home };