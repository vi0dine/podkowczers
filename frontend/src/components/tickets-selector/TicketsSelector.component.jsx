import React from "react";
import { Seat } from '../seat/Seat.component';
import './TicketsSelector.styles.scss';

export const TicketsSelector = ({tickets, handleSelect, handleDeselect}) => {
    return (
        <div className={'grid'}>
            <div className={'scene'} />
            {tickets.filter((ticket) => (ticket.seat !== 13 && ticket.seat !== 14)).map((ticket) => (
                <Seat
                    ticket={ticket}
                    handleSelect={() => {handleSelect(ticket)}}
                    handleDeselect={() => {handleDeselect(ticket)}}
                />
            ))}
            <div className={'gear'} />
        </div>
    );
};