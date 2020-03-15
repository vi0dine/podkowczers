import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import SeatButtonStyles from "./SeatButton.styles";

const SeatButton = ({ticket, handleSelect, handleDeselect}) => {
    const [selected, setSelected] = useState(false);


    return (
        <TouchableOpacity
            style={ticket.reserved ? (SeatButtonStyles.reserved) : (selected ? SeatButtonStyles.selectedButton : SeatButtonStyles.button)}
            onPress={() => {
                if (!ticket.reserved && selected) {
                    setSelected(false);
                    handleDeselect(ticket)
                } else if (!ticket.reserved) {
                    setSelected(true);
                    handleSelect(ticket)
                }
            }}
        >
            <Text
                style={selected ? SeatButtonStyles.selectedButtonText : SeatButtonStyles.buttonText}>{ticket.seat}</Text>
        </TouchableOpacity>
    );
};

export default SeatButton;