import React, { useState } from 'react';
import './EventDetailsPage.styles.scss';
import {TicketsSelector} from "../../components/tickets-selector/TicketsSelector.component";

export const EventDetailsPage = () => {
    const event = {
        concert: 'Osiecka w II LO',
        place: 'Teatr Zdrojowy w Szczawnie Zdroju',
        starts_at: '2019-01-02',
        estimated_length: '90000',
        available_tickets: 12,
        reservation_open: true
    };

    const [selectedTickets, setSelectedTickets] = useState([]);

    return (
        <div className={'EventDetails container is-fluid'}>
            <div className={'columns'}>
                <div className={'EventDetailsInfo column is-4'}>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h2 className={'title'}>{event.concert}</h2>
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h3 className={'subtitle'}>{event.place}</h3>
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
                                        {event.starts_at}
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
                                        {event.estimated_length}
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
                                        {event.available_tickets}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    { selectedTickets && (
                        <div className={'columns'}>
                            <div className={'column has-text-centered'}>
                                {selectedTickets.map((ticket) =>  (
                                    <p>{ticket.row}  {ticket.seat}</p>
                                ))}
                            </div>
                        </div>
                    ) }
                    <div className={'columns'}>
                        <div className={'column has-text-centered'}>
                            <button className={'button is-large is-fullwidth is-primary'}>
                                ZAREZERWUJ
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'column'}>
                    <TicketsSelector event={event} selectedTickets={selectedTickets} handleSelect={setSelectedTickets} />
                </div>
            </div>
        </div>
    );
};