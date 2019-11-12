import React from "react";
import { Seat } from '../seat/Seat.component';
import './TicketsSelector.styles.scss';

export const TicketsSelector = ({event, selectedTickets, handleSelect}) => {
    let tickets = [];

    for(let j = 1; j<10; j++) {
        for(let i = 1; i < 26; i++) {
            tickets.push({id: i+j, row: j, seat: i})
        }
    }

    const selectSeat = (ticket) => {
        handleSelect([...selectedTickets, ticket]);
    };

    return (
        <div className={'grid'}>
            <div className={'scene'} />
            {tickets.filter((ticket) => (ticket.seat !== 13 && ticket.seat !== 14)).map((ticket) => (
                <Seat ticket={ticket} handleClick={(e) => {selectSeat(ticket)}}/>
            ))}
            <div className={'gear'} />
        </div>
    );
};