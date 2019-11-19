import React, {useEffect} from 'react';
import './UsersTable.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router'
import {deleteUser, fetchUsers} from "../../redux/users/Users.actions";

export const UsersTable = () => {
    const loading = useSelector(state => state.UsersState.loading);
    const users = useSelector(state => state.UsersState.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    const columns = (
        <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Rola</th>
                <th>Monety</th>
                <th>Bilety</th>
                <th>Komentarze</th>
                <th>Recenzje</th>
                <th>Utworzony</th>
                <th>Akcje</th>
            </tr>
        </thead>
    );

    const actions = (id) => (
        <>
            <button
                onClick={() => {dispatch(push(`/users/${id}`))}}
                className={'button is-primary is-small'}>EDYTUJ</button>&nbsp;
            <button
                onClick={() => {dispatch(deleteUser(id))}}
                className={'button is-danger is-small'}>USUŃ</button>
        </>
    );

    return !loading && users && (
        <div className={'table-container'}>
            <table className={'table is-hoverable is-fullwidth'}>
                {columns}
                <tbody>
                {
                    users.map((user) =>
                        <tr>
                            <th>{user.id}</th>
                            <td>{user.attributes.email}</td>
                            <td>{user.attributes.role}</td>
                            <td>{user.attributes.coins_count}</td>
                            <td>{user.attributes.tickets.length}</td>
                            <td>{user.attributes.comments.length}</td>
                            <td>{user.attributes.reviews.length}</td>
                            <td>{user.attributes.created_at}</td>
                            <td>{actions(user.id)}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};