import React from 'react';
import {useState} from 'react';
import './Header.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {push, replace} from 'connected-react-router';
import {logout} from "../../redux/user/user.actions";

export const Header = () => {
    const user = useSelector(state => state.UserState.id);
    const location = useSelector(state => state.router.location);
    const dispatch = useDispatch();
    const [burgerOpen, setBurgerOpen] = useState(false);

    const handleBurgerClick = () => {
        setBurgerOpen(!burgerOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='Header'>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
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
                        {/*<a className={`navbar-item ${location.pathname.includes("/blog") ? 'current' : ''}`}*/}
                        {/*   onClick={() => dispatch(push('/blog'))}>BLOG</a>*/}
                        {/*<a className={`navbar-item ${location.pathname.includes("/concerts") ? 'current' : ''}`}*/}
                        {/*   onClick={() => dispatch(push('/concerts'))}>KONCERTY</a>*/}
                        <a className={`navbar-item ${location.pathname.includes("/events") ? 'current' : ''}`}
                           onClick={() => dispatch(replace('/events'))}>WYDARZENIA</a>
                        {
                            !user ? (
                                <a className={`navbar-item ${location.pathname.includes("/signup") ? 'current' : ''}`}
                                   onClick={() => dispatch(push('/signup'))}><strong>ZAŁÓŻ KONTO</strong></a>
                            ) : (
                                <>
                                    <a className={`navbar-item ${location.pathname.includes("/user") ? 'current' : ' '}`}
                                       onClick={() => dispatch(push(`/user/${user}`))}>PROFIL</a>
                                    <a className={'navbar-item'} onClick={() => handleLogout()}><strong>WYLOGUJ</strong></a>
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};