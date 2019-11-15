import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import './Header.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/user/user.actions";
import {store} from "../../redux/store";

export const Header = () => {
    const user = useSelector(state => state.UserState.id);
    const location = useLocation();
    const dispatch = useDispatch();
    const [burgerOpen, setBurgerOpen] = useState(false);

    const handleBurgerClick = () => {
        console.log(store.getState());
        setBurgerOpen(!burgerOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
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
                        {
                            !user ? (
                                <Link className={`navbar-item ${location.pathname.includes("/signup") ? 'current' : ''}`} to={'/signup'}><strong>ZAŁÓŻ KONTO</strong></Link>
                            ) : (
                                <a className={'navbar-item'} onClick={() => handleLogout()}><strong>WYLOGUJ</strong></a>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};