import React from 'react';
import './SignUpPage.styles.scss'
import {UserForm} from "../../components/sign-in-form/SignInForm.component";

export const SignUpPage = () => {

    const loginUser = () => {};
    const registerUser = () => {};

    return(
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
    );
};