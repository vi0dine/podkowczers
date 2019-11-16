import React, {useState} from "react";
import './Seat.styles.scss';

export const Seat = ({ticket, handleSelect, handleDeselect}) => {
    const [selected, setSelected] = useState(false);

    return (
        <div
            // style={{gridRow: ticket.row+1, gridColumn: ticket.seat+1}}
            className={'seat ' + (selected ? 'selected' : 'free') + (ticket.attributes.reserved ? ' reserved' : '')}
            onClick={() => {
                if (!ticket.attributes.reserved) {
                    if (selected) {
                        handleDeselect()
                    } else {
                        handleSelect()
                    }
                    setSelected(!selected);
                }
            }}
        >
            {ticket.attributes.seat}
        </div>
    );
};