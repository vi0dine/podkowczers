import React from 'react';
import moment from "moment";
import {Text, TouchableOpacity, View} from "react-native";
import TicketItemStyles from "./TicketItem.styles";
import {Icon, ActionSheet} from "native-base";
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from "react-redux";
import {returnTicket} from "../../../redux/Events/Events.actions";
import {RED} from "../../../variables";

const TicketItem = ({ticket}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={TicketItemStyles.ticketBox}
            onPress={() => {
                navigation.navigate('Ticket', {id: ticket.id})
            }}
            onLongPress={() =>
                ActionSheet.show(
                    {
                        options: [{text: 'Zwróć bilet', icon: "trash", iconColor: RED}],
                        title: "Bilet"
                    },
                    buttonIndex => {
                        if (buttonIndex === 0) {
                            dispatch(returnTicket(ticket.id))
                        }
                    })
            }
        >
            <View style={TicketItemStyles.ticketIconContainer}>
                <Icon type={'Entypo'} name={'ticket'} style={TicketItemStyles.ticketIcon}/>
            </View>
            <View style={TicketItemStyles.ticketInfoContainer}>
                <Text style={TicketItemStyles.ticketConcert}>{ticket.concert}</Text>
                <Text
                    style={TicketItemStyles.ticketPlace}>{ticket.place.name}{"\n"}{moment(ticket.date).format('LL')}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TicketItem;