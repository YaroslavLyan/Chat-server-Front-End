import React from 'react';
import { useNavigate, Link, NavLink } from "react-router-dom";
import {Offcanvas} from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './navbar-header.css';

const NavbarHeader = () => {

    const user = useSelector((state) => state.auth.userAuth);

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEvents, setShowEvents] = useState(false);

    const onShowEvents = () => setShowEvents(true);
    const onCloseEvents = () => setShowEvents(false);


    const ref = useRef(null);

 
    useEffect(() => {
 
        function handleClickOutside(event) {
        if (showEvents && ref.current && !ref.current.contains(event.target)) {
            onCloseEvents();
        }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, showEvents]);

    return (
        <>
            <nav className="nav">
                <Link to="" variant="primary" className="n-link" onClick={handleShow}>
                    <span className="fa-solid fa-bars"></span>
                </Link>
                <Offcanvas show={show} onHide={handleClose} className='offcanvas-body'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title><i className="fa-solid fa-user"></i> {user?.name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Link to="/" className="nav-link" 
                            onClick={() => {navigate('/'); handleClose()}}>
                            Главная
                        </Link>
                        <Link to="/admins" className={user?.rule === 1 ? "nav-link" : "display-none"} 
                            onClick={() => {navigate('/admins'); handleClose()}}>
                            Пользователи
                        </Link>
                      
                        <div className='logaut'>
                        <Link to="/login" className="nav-link" onClick={() => {navigate('/login'); 
                            window.localStorage.clear(); handleClose()}}>
                            Выйти
                        </Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>            
            </nav>  
              
        </>
    );
      
}



export default NavbarHeader;