import { NavbarComponent } from "./Navbar"
import {useAuth} from '../Hooks/useAuth';
import { useLogout } from "../Hooks/useLogout";

const Order = () => {


    return <div>
        <NavbarComponent 
        useAuth={useAuth}
        onLogout={useLogout}/>
        <div>
            it works
        </div>
    </div>

}

export {Order}