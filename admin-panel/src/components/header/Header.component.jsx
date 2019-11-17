import React from 'react';
import {useState} from 'react';
import './Header.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {push, replace} from 'connected-react-router';
import {useLocation} from "react-router";
import {logout} from "../../redux/user/User.actions";


export const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => (state.UserState.id));
    const location = useLocation();
    const [burgerOpen, setBurgerOpen] = useState(false);

    const handleBurgerClick = () => {
        setBurgerOpen(!burgerOpen);
    };

    return (
        <div className='Header'>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a onClick={() => dispatch(push('/dashboard'))} className='navbar-item'>
                        <img alt='logo' src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                    </a>
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
                    {
                        user && (
                            <div className="navbar-end">
                                <a className={`navbar-item ${location.pathname.includes("/users") ? 'current' : ''}`}
                                   onClick={() => dispatch(push('/users'))}>UŻYTKOWNICY</a>
                                <a className={`navbar-item ${location.pathname.includes("/blog") ? 'current' : ''}`}
                                   onClick={() => dispatch(push('/blog'))}>BLOG</a>
                                <a className={`navbar-item ${location.pathname.includes("/concerts") ? 'current' : ''}`}
                                   onClick={() => dispatch(push('/concerts'))}>KONCERTY</a>
                                <a className={`navbar-item ${location.pathname.includes("/events") ? 'current' : ''}`}
                                   onClick={() => dispatch(replace('/events'))}>WYDARZENIA</a>
                                <a className={'navbar-item'} onClick={() => dispatch(logout())}><strong>WYLOGUJ</strong></a>
                            </div>
                        )
                    }
                </div>
            </nav>
        </div>
    );
};