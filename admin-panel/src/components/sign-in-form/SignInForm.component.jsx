import React from "react";
import './SignInForm.styles.scss'
import {useFormik} from "formik";

export const UserForm = ({ handleLogin }) => {
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

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => { handleLogin(values); }
    });

    return (
        <div className={'SignInForm container'}>
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
                <button
                    type={'submit'}
                    className={'button is-primary is-fullwidth'}>{'ZALOGUJ'}</button>
            </form>
        </div>
    );
};