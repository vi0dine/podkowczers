import React from 'react';
import './UserPage.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {push} from 'connected-react-router';
import moment from 'moment';

export const UserPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const user = useSelector(state => state.UsersState.users.find((user) => user.id === id));

    return (
        <div className={'UserPage container'}>
            <div className={'columns'}>
                <div className={'column is-5'}>
                    <h3 className={'title'}>Edytuj:&nbsp;{user.attributes.email}</h3>
                    <hr />
                    <p className={'subtitle'}>Email: {user.attributes.email}</p>
                    <p className={'subtitle'}>Rola: {user.attributes.role}</p>
                    <p className={'subtitle'}>Monety: {user.attributes.coins_count}</p>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <button disabled className={'button is-primary is-fullwidth'}>ZAPISZ</button>
                        </div>
                        <div className={'column'}>
                            <button disabled className={'button is-danger is-fullwidth'}>USUŃ</button>
                        </div>
                    </div>
                    <div>
                        <h4 className={'title'}>Recenzje:</h4>
                        <hr/>
                        <div className={'ReviewsContainer column'}>
                            {user.attributes.reviews.map((review) => (
                                <div className={'ReviewBox'}>
                                    <div className={'columns'}>
                                        <div className={'column is-10'} >
                                            <p><strong>{review.title}</strong></p>
                                        </div>
                                        <div className={'column is-2'}>
                                            <span>Ocena:&nbsp;<em>{review.rate}</em></span>
                                        </div>
                                    </div>
                                    <hr style={{marginTop: 0}}/>
                                    <div className={'columns'} style={{padding: '1rem'}}>
                                        <p>{review.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={'column is-7'}>
                    <div>
                        <h4 className={'title'}>Komentarze:</h4>
                        <hr/>
                        <div className={'CommentsContainer column'}>
                            {user.attributes.comments.map((comment) => (
                                <div className={'CommentBox'}>
                                    <div className={'columns'} style={{padding: '1rem'}}>
                                        <p><em>{moment(comment.created_at).format('LL')}:</em>{comment.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className={'title'}>Bilety:</h4>
                        <hr/>
                        <div className={'TicketsContainer column'}>
                            {user.attributes.tickets.map((ticket) => (
                                <div className={'TicketBox'}>
                                    <div className={'columns'} style={{padding: '1rem'}}>
                                        <p><em>{moment(ticket.updated_at).format('LL')}:</em>
                                            EventID: <a onClick={() => {dispatch(push(`/events/${ticket.event_id}`))}}>{ticket.event_id}</a> | Rząd: {ticket.row} | Miejsce: {ticket.seat}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};