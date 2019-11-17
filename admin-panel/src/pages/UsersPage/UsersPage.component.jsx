import React from 'react';
import './UsersPage.styles.scss'
import {UsersTable} from "../../components/users-table/UsersTable.component";

export const UsersPage = () => {
    return (
        <div className={'UsersPage container'}>
            <div className={'columns'}>
                <div className={'column'}>
                    <h3 className={'title'}>UŻYTKOWNICY</h3>
                    <hr />
                </div>
            </div>
            <div className={'columns is-centered'}>
                <div className={'column'} style={{overflowY: 'auto'}}>
                    <UsersTable/>
                </div>
            </div>
        </div>
    );
};