import React, {useEffect, useState} from 'react';
import './UserPage.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {push} from 'connected-react-router';
import moment from 'moment';
import {deleteReview} from "../../redux/reviews/Reviews.actions";
import {deleteComment} from "../../redux/comments/Comments.actions";
import {deleteTicket} from "../../redux/tickets/Tickets.actions";
import {addCoin, changeRole} from "../../redux/users/Users.actions";

export const UserPage = () => {
    const { id } = useParams();

    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    const users = useSelector(state => state.UsersState.users);

    useEffect(() => {
        setUser(users.find((user) => user.id === id));
    }, [users]);

    return user && (
        <div className={'UserPage container'}>
            <div className={'columns'}>
                <div className={'column is-5'}>
                    <h3 className={'title'}>Edytuj:&nbsp;{user.attributes.email}</h3>
                    <hr />
                    <p className={'subtitle'}>Email: {user.attributes.email}</p>
                    <div className={'columns'}>
                        <div className={'column is-8'}>
                            <p className={'subtitle'}>Rola: {user.attributes.role}</p>
                        </div>
                        <div className={'column'}>
                            {
                                user.attributes.role === 'user' ? (
                                    <button onClick={() => {dispatch(changeRole(user))}} className={'button is-primary'}>
                                        <span style={{color: '#fff'}} className={'icon'}>
                                            <i className={'fas fa-user-cog'} />&nbsp;
                                        </span>
                                                <p>AWANSUJ</p>
                                    </button>
                                ) : (
                                    <button onClick={() => {dispatch(changeRole(user))}} className={'button is-danger'}>
                                        <span style={{color: '#fff'}} className={'icon'}>
                                            <i className={'fas fa-user'} />&nbsp;
                                        </span>
                                                <p>ZDEGRADUJ</p>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'column is-10'}>
                            <p className={'subtitle'}>Monety: {user.attributes.coins_count}</p>
                        </div>
                        <div className={'column is-1'}>
                            <button onClick={() => {dispatch(addCoin(id))}} className={'button is-primary'}>
                                                <span style={{color: '#fff'}} className={'icon'}>
                                                    <i className={'fas fa-plus'} />
                                                </span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 className={'title'}>Recenzje:</h4>
                        <hr/>
                        <div className={'ReviewsContainer column'}>
                            {user.attributes.reviews.map((review) => (
                                <div className={'ReviewBox'}>
                                    <div className={'columns'}>
                                        <div className={'column is-6'} >
                                            <p><strong>{review.title}</strong></p>
                                        </div>
                                        <div className={'column is-2'}>
                                            <span>Ocena:&nbsp;<em>{review.rate}</em></span>
                                        </div>
                                        <div className={'column is-offset-2 is-1'}>
                                            <button onClick={() => {dispatch(deleteReview(review.id))}} className={'button is-danger'}>
                                                <span style={{color: '#fff'}} className={'icon'}>
                                                    <i className={'fas fa-trash-alt'} />
                                                </span>
                                            </button>
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
                                        <div className={'column'}>
                                            <p><em>{moment(comment.created_at).format('LL')}:</em>{comment.body}</p>
                                        </div>
                                        <div className={'column is-offset-2 is-1'}>
                                            <button onClick={() => {dispatch(deleteComment(comment.id))}} className={'button is-danger is-small'}>
                                                <span style={{color: '#fff'}} className={'icon is-small'}>
                                                    <i className={'fas fa-trash-alt'} />
                                                </span>
                                            </button>
                                        </div>
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
                                        <div className={'column'}>
                                            <p><em>{moment(ticket.updated_at).format('LL')}:</em>
                                                EventID: <a onClick={() => {dispatch(push(`/events/${ticket.event_id}`))}}>{ticket.event_id}</a> | Rząd: {ticket.row} | Miejsce: {ticket.seat}</p>
                                        </div>
                                        <div className={'column is-offset-2 is-1'}>
                                            <button onClick={() => {dispatch(deleteTicket(ticket.id))}} className={'button is-danger is-small'}>
                                                <span style={{color: '#fff'}} className={'icon is-small'}>
                                                    <i className={'fas fa-trash-alt'} />
                                                </span>
                                            </button>
                                        </div>
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