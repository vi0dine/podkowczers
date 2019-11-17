import React from 'react';
import {UserForm} from "../../components/sign-in-form/SignInForm.component";
import {useDispatch} from "react-redux";
import {authUser} from "../../redux/user/User.actions";

export const LoginPage = () => {
    const dispatch = useDispatch();

    const loginUser = ({email, password}) => {
        dispatch(authUser(email, password));
    };

    return (
        <div className={'container'}>
            <div className={'columns is-centered'} style={{marginTop: '20vh'}}>
                <div className={'column is-half'}>
                    <div className={'columns is-centered'}>
                        <div className={'column has-text-centered'}>
                            <h2 className={'title'}>LOGOWANIE</h2>
                            <hr />
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <UserForm handleLogin={loginUser} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};