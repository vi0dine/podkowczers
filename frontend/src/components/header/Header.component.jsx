import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import './Header.styles.scss';

export const Header = () => {
    const location = useLocation();
    const [burgerOpen, setBurgerOpen] = useState(false);

    const handleBurgerClick = () => {
        setBurgerOpen(!burgerOpen);
    };

    return (
        <div className='Header'>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to={'/'} className='navbar-item'>
                        <img alt='logo' src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                    </Link>
                    <a role="button" className={`navbar-burger burger ${burgerOpen ? 'is-active' : ''}`}
                       onClick={() => handleBurgerClick()}
                       aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${burgerOpen ? 'is-active' : ''}`}>
                    <div className="navbar-end">
                        <Link className={`navbar-item ${location.pathname.includes("/blog") ? 'current' : ''}`} to={'/blog'}>BLOG</Link>
                        <Link className={`navbar-item ${location.pathname.includes("/concerts") ? 'current' : ''}`} to={'/concerts'}>KONCERTY</Link>
                        <Link className={`navbar-item ${location.pathname.includes("/events") ? 'current' : ''}`} to={'/events'}>WYDARZENIA</Link>
                        <Link className={`navbar-item ${location.pathname.includes("/signup") ? 'current' : ''}`} to={'/signup'}><strong>ZAŁÓŻ KONTO</strong></Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};