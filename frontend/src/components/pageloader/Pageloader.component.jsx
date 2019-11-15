import React from "react";
import {useSelector} from "react-redux";

export const Pageloader = () => {
    const loading = useSelector(state => state.UserState.loading);

    return (
        <div className={`pageloader ${loading && 'is-active'}`}>
            <span className={'title'}>ŁADOWANIE</span>
        </div>
    );
};
