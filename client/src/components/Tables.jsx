import { NavbarComponent } from "./Navbar";
import { useAuth } from '../Hooks/useAuth';
import { useLogout } from '../Hooks/useLogout';
import { GiMeal } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi"
import { MdNoMealsOuline } from "react-icons/md";

import './Tables.css';


const Tables = () => {
       
        return <div>
                <NavbarComponent
                        useAuth={useAuth}
                        onLogout={useLogout}>
                </NavbarComponent>
                <div className="container_cards">
                        <div className="card-body_free">
                                <div className="title">

                                        <h3>
                                                Free tables <GiMeal />
                                        </h3>
                                </div>
                                <div className="btn-container_free">
                                        <a href="/freeTables" >
                                                <button className="btn btn-primary" >View</button>
                                        </a>
                                </div>

                        </div>
                        <div className="card-body_busy">
                                <div className="title">

                                        <h3>
                                                Busy <MdNoMealsOuline />
                                        </h3>
                                </div>
                                <div className="btn-container_busy">
                                        <a href="/updateTable" >
                                                <button className="btn btn-danger" >Edit status</button>
                                        </a>
                                </div>

                        </div>
                        <div className="card-body_menu">
                                <div className="title">

                                        <h3>
                                                Menu <GiHotMeal />
                                        </h3>
                                </div>
                                <div className="btn-container_menu">
                                        <a href="/menu" >
                                                <button className="btn btn-primary" >View menu</button></a>
                                </div>

                        </div>
                </div>

        </div>

}

export { Tables }