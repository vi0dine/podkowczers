import React, {useEffect, useState} from 'react';
import { axiosSecured, axiosPlain } from "../../index";
import { useParams } from 'react-router-dom';
import './EventDetailsPage.styles.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import {TicketsSelector} from "../../components/tickets-selector/TicketsSelector.component";
import moment from "moment";
import {store} from "../../redux/store";

export const EventDetailsPage = () => {
    // const event = {
    //     concert: 'Osiecka w II LO',
    //     place: 'Teatr Zdrojowy w Szczawnie Zdroju',
    //     starts_at: '2019-01-02',
    //     estimated_length: '90000',
    //     available_tickets: 12,
    //     reservation_open: true,
    //     tickets: []
    // };


    // for(let j = 1; j<=10; j++) {
    //     for(let i = 1; i <= 20; i++) {
    //         event.tickets.push({id: i+j, row: j, seat: i})
    //     }
    // }

    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [ready, setReady] = useState(false);

    const fetchEvent = async () => {
        let response = await axiosPlain.request({url: `/api/v1/events/${id}`, method: "GET"});
        setEvent(response.data.data);
        setTickets(response.data.included.sort((a, b) => ( a.attributes.row > b.attributes.row ? 1 : -1 )));
        setReady(true);
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    const [selectedTickets, setSelectedTickets] = useState([]);

    const selectSeat = (ticket) => {
        setSelectedTickets([...selectedTickets, ticket]);
    };

    const deselectSeat = (ticket) => {
        setSelectedTickets(selectedTickets.filter((selected) => (selected.id !== ticket.id)));
    };

    const makeReservation = async (tickets) => {
        const ids = tickets.map((ticket) => ticket.id);
        let response = axiosSecured.request({url: '/api/v1/tickets', params: { tickets: ids }, method: "POST"});
        console.log(response);
        console.log(store.getState().UserState);
    };

    return ready && (
        <div className={'EventDetails container is-fluid'}>
            <div className={'columns'}>
                <div className={'EventDetailsInfo column is-4'}>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h2 className={'title'}>{event.attributes.concert}</h2>
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h3 className={'subtitle'}>{event.attributes.place}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className={'columns'}>
                        <div className={'column has-text-centered'}>
                            <div className={'card'}>
                                <div className={'card-header'}>
                                    <p className={'card-header-title'}>
                                        Rozpoczęcie:
                                    </p>
                                </div>
                                <div className={'card-content'}>
                                    <p>
                                        {moment(event.attributes.starts_at).format('LLL')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={'column has-text-centered'}>
                            <div className={'card'}>
                                <div className={'card-header'}>
                                    <p className={'card-header-title'}>
                                        Przewidywana długość:
                                    </p>
                                </div>
                                <div className={'card-content'}>
                                    <p>
                                        {Math.round(event.attributes.estimated_length/3600)} h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'column has-text-centered'}>
                            <div className={'card'}>
                                <div className={'card-header'}>
                                    <p className={'card-header-title'}>
                                        Dostępnych miejsc:
                                    </p>
                                </div>
                                <div className={'card-content'}>
                                    <p>
                                        {event.attributes.tickets_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    { selectedTickets && (
                        <div className={'columns'}>
                            <div className={'TicketsList column has-text-centered'}>
                                <CSSTransitionGroup
                                    transitionName={'ticket'}
                                    transitionEnterTimeout={300}
                                    transitionLeaveTimeout={400}
                                >
                                {selectedTickets.map((ticket) =>  (
                                        <div className={'notification'}>
                                            <div className={'columns'}>
                                                <div className={'column'}>
                                                    <h4 className={'subtitle'}>Rząd: <span className={'subtitle'}>{ticket.attributes.row}</span></h4>
                                                </div>
                                                <div className={'column'}>
                                                    <h4 className={'subtitle'}>Miejsce: <span className={'subtitle'}>{ticket.attributes.seat}</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                ))}
                                </CSSTransitionGroup>
                            </div>
                        </div>
                    ) }
                    <div className={'columns'}>
                        <div className={'column has-text-centered'}>
                            <button onClick={() => {makeReservation(selectedTickets)}} className={'button is-large is-fullwidth is-primary'}>
                                ZAREZERWUJ
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'column'}>
                    <TicketsSelector
                        tickets={tickets}
                        handleSelect={selectSeat}
                        handleDeselect={deselectSeat}
                    />
                </div>
            </div>
        </div>
    );
};