import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import '../components/Navbar.css';
import {FiLogIn} from 'react-icons/fi';
import {AiOutlineHome,AiOutlineLock} from 'react-icons/ai';
import {FiLogOut} from 'react-icons/fi';
import { GiMeal } from 'react-icons/gi';

export const NavbarComponent = ({user, onLogout}) => {

    return(
        <div>
           <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
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

