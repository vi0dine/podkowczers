import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native'
import {View, Text, TouchableOpacity} from "react-native";
import SelectSeatFormStyles from "./SelectSeatForm.styles";
import AudienceSelector from "../AudienceSelector/AudienceSelector.component";
import {useDispatch} from "react-redux";
import {bookTickets} from "../../../redux/Events/Events.actions";

const SelectSeatForm = ({id}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [selectedTickets, setSelectedTickets] = useState([]);

    const onSelectSeat = (ticket) => {
        setSelectedTickets(selectedTickets.concat(ticket));
    };

    const onDeselectSeat = (ticket) => {
        setSelectedTickets(selectedTickets.filter(t => t.id !== ticket.id));
    };

    return (
        <View>
            <AudienceSelector id={id} handleSelect={ticket => onSelectSeat(ticket)} handleDeselect={ticket => onDeselectSeat(ticket)}/>
            <View style={SelectSeatFormStyles.submitContainer}>
                <View style={SelectSeatFormStyles.submitOverview}>
                    <Text style={SelectSeatFormStyles.submitOverviewText}>Ilość: {selectedTickets.length}</Text>
                </View>
                <TouchableOpacity
                    style={SelectSeatFormStyles.submitButton}
                    onPress={() => {
                        dispatch(bookTickets(id, selectedTickets.map(ticket => ticket.id)));
                        setSelectedTickets([]);
                    }}
                >
                    <Text style={SelectSeatFormStyles.submitButtonText}>REZERWUJ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SelectSeatForm;