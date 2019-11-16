import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearNotification} from "../../redux/user/user.actions";

export const Notifier = () => {
    const message = useSelector(state => state.UserState.message);
    const dispatch = useDispatch();

    return (
        <>
        {message &&
            <div className={'notification is-success'}>
                <button onClick={() => dispatch(clearNotification())} className="delete"/>
                {message}
            </div>
        }
        </>
    );
};