import React from "react";
import './SignInForm.styles.scss'
import {useFormik} from "formik";

const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';

export const UserForm = ({mode, handleLogin, handleRegister}) => {
    const validate = values => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Wymagane pole';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Błędny adres email';
        }

        if (!values.password) {
            errors.password = 'Wymagane pole';
        }

        if (!values.password_confirmation && mode === REGISTER) {
            errors.password_confirmation = 'Wymagane pole';
        } else if (values.password_confirmation !== values.password && mode === REGISTER) {
            errors.password_confirmation = 'Hasłą różnią się';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: ''
        },
        validate,
        onSubmit: values => {
            if (mode === REGISTER) {
                handleRegister(values);
            } else if (mode === LOGIN) {
                handleLogin(values);
            }
        }
    });

    return (
        <div className={'SignInForm container'}>
            <div className={'columns'}>
                <div className={'column has-text-centered'}>
                    <h1 className={'title'}>{mode === REGISTER ? 'REJESTRACJA' : 'LOGOWANIE'}</h1>
                    <hr />
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            id={'email'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`input ${formik.errors.email && 'is-danger'}`}
                            type="email"
                            placeholder="Adres email"/>
                        <span className="icon is-small is-left">
                                <i className="fas fa-envelope"/>
                            </span>
                        <span className="icon is-small is-right">
                                {formik.errors.email &&
                                <i className="fas fa-exclamation-triangle"/>
                                }
                            </span>
                    </div>
                    {formik.errors.email &&
                    <p className="help is-danger">{formik.errors.email}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Hasło</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            id={'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`input ${formik.errors.password && 'is-danger'}`}
                            type="password"
                            placeholder="Hasło"/>
                        <span className="icon is-small is-left">
                                <i className="fas fa-key"/>
                            </span>
                        <span className="icon is-small is-right">
                                {formik.errors.password &&
                                <i className="fas fa-exclamation-triangle"/>
                                }
                            </span>
                    </div>
                    {formik.errors.password &&
                    <p className="help is-danger">{formik.errors.password}</p>
                    }
                </div>
                {mode === REGISTER && (
                    <div className="field">
                        <label className="label">Ponów hasło</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                id={'password_confirmation'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password_confirmation}
                                className={`input ${formik.errors.password_confirmation && 'is-danger'}`}
                                type="password"
                                placeholder="Ponów hasło"/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-key"/>
                            </span>
                            <span className="icon is-small is-right">
                                {formik.errors.password_confirmation &&
                                <i className="fas fa-exclamation-triangle"/>
                                }
                            </span>
                        </div>
                        {formik.errors.password_confirmation &&
                        <p className="help is-danger">{formik.errors.password_confirmation}</p>
                        }
                    </div>
                )}
                <button
                    type={'submit'}
                    className={'button is-primary is-fullwidth'}>{mode === REGISTER ? 'ZAŁÓŻ KONTO' : 'ZALOGUJ'}</button>
            </form>
        </div>
    );
};