import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import '../navbar/Navbar.css';
import {FiLogIn} from 'react-icons/fi';
import {AiOutlineHome,AiOutlineLock} from 'react-icons/ai';
import {FiLogOut} from 'react-icons/fi';
import { GiMeal } from 'react-icons/gi';

export const NavbarComponent = ({useAuth, onLogout}) => {
    const user = useAuth();

    return(
        <div>
           <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="navbar navbar-dark bg-dark" href="/">Navbar</Navbar.Brand>
                <Nav className="navbar navbar-dark bg-dark">
                <Nav.Link href="/">Home <AiOutlineHome/></Nav.Link>
                {!user && <React.Fragment>
                    <Nav.Link href="/login">Login <FiLogIn/></Nav.Link>
                    <Nav.Link href="/register">Register <AiOutlineLock/></Nav.Link>
                    </React.Fragment>}
                {user && <React.Fragment>
                    <Nav.Link href="/tables">Tables <GiMeal/></Nav.Link>
                    <Nav.Link href="/" onClick={onLogout}>Logout <FiLogOut /></Nav.Link>
                </React.Fragment>
                }
                </Nav>
            </Navbar>
        </div>
    )

}

