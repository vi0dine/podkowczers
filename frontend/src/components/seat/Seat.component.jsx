import React from "react";
import './Seat.styles.scss';

export const Seat = ({ticket, handleClick}) => {
    return (
        <div
            style={{gridRow: ticket.row+1, gridColumn: ticket.seat+1}}
            className={'seat'}
            onClick={handleClick}
        >
            {ticket.seat}
        </div>
    );
};