import React from 'react';
import './Notifier.styles.scss'
import {CSSTransitionGroup} from 'react-transition-group';
import {useDispatch, useSelector} from "react-redux";
import {clearNotification} from "../../redux/user/user.actions";

export const Notifier = () => {
    const message = useSelector(state => state.UserState.message);
    const error = useSelector(state => state.UserState.error);
    const dispatch = useDispatch();

    return (
            <>
            <CSSTransitionGroup
                transitionName={'notifier'}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {error &&
                    <div className={'Notifier notification is-danger'}>
                        <button onClick={() => dispatch(clearNotification())} className="delete"/>
                        {error}
                    </div>
                }
            </CSSTransitionGroup>
                <CSSTransitionGroup
                    transitionName={'notifier'}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {message &&
                    <div className={'Notifier notification is-success'}>
                        <button onClick={() => dispatch(clearNotification())} className="delete"/>
                        {message}
                    </div>
                    }
                </CSSTransitionGroup>
            </>);
};