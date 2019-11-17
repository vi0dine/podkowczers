import React from 'react';
import './SignUpPage.styles.scss'
import {UserForm} from "../../components/sign-in-form/SignInForm.component";
import {useDispatch} from "react-redux";
import {authUser} from "../../redux/user/user.actions";
import {CSSTransitionGroup} from "react-transition-group";

export const SignUpPage = () => {
    const dispatch = useDispatch();

    const loginUser = ({email, password}) => {
        dispatch(authUser(email, password, 'SIGN_IN'));
    };
    const registerUser = ({email, password}) => {
        dispatch(authUser(email, password, 'SIGN_UP'));
    };

    return (
        <CSSTransitionGroup
            transitionName={'signup-page'}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
        <div className={'SignUpPage container is-fluid'}>
            <div className={'columns is-vcentered'}>
                <div className={'column'}>
                    <UserForm mode={'LOGIN'} handleLogin={loginUser} />
                </div>
                <div className={'is-divider-vertical'} data-content={'LUB'} />
                <div className={'column'}>
                    <UserForm mode={'REGISTER'} handleRegister={registerUser} />
                </div>
            </div>
        </div>
        </CSSTransitionGroup>
    );
};