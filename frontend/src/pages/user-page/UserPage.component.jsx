import React from "react";
import './UserPage.styles.scss'
import {useSelector} from "react-redux";
import moment from "moment";
import {CSSTransitionGroup} from "react-transition-group";

export const UserPage = () => {
    const user = useSelector(state => state.UserState);

    return user && (
        <CSSTransitionGroup
            transitionName={'user-page'}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
        <div className={'UserPage container is-fluid has-text-centered'}>
            <h2 className={'title'}>TWOJE KONTO</h2>
            <hr style={{marginBottom: '4rem'}} />
            <div className={'columns is-centered'}>
                <div className={'column is-6'}>
                     <div className={'columns is-centered'}>
                        <div className={'column is-2'}>
                            <figure className={'image is-128x128'}>
                                <img src={user.avatar} />
                            </figure>
                        </div>
                        <div className={'column'}>
                            <div className={'columns is-vcentered'}>
                                <div className={'column'}>
                                    <span className="icon is-large">
                                      <i className="fas fa-3x fa-envelope"/>
                                    </span>
                                </div>
                                <div className={'column'}>
                                    <h4 className={'subtitle'}>{user.email}</h4>
                                </div>
                            </div>
                            <div className={'columns is-vcentered'}>
                                <div className={'column'}>
                                    <span className="icon is-large">
                                      <i className="fas fa-3x fa-coins"/>
                                    </span>
                                </div>
                                <div className={'column'}>
                                    <h4 className={'subtitle'}>{user.coins} monet</h4>
                                </div>
                            </div>
                        </div>
                     </div>
                    <hr />
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h4 className={'subtitle'}>TWOJE REZERWACJE:</h4>
                            <div className={'columns'}>
                                <div className={'UserReservations column'}>
                                    {
                                        user.reservations && user.reservations.map((reservation) => (
                                            <div className={'box'}>
                                                <div className={'columns is-vcentered'}>
                                                    <div className={'column is-7'}>
                                                        <p className={'subtitle'}>{moment(reservation.date).format('LLL')}</p>
                                                    </div>
                                                    <div className={'column has-text-centered'}>
                                                        <a
                                                            className={'button is-primary'}
                                                            href={reservation.link}>
                                                                POBIERZ
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </CSSTransitionGroup>
    );
};