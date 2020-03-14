import React from 'react';
import moment from "moment";
import {Text, TouchableOpacity, View} from "react-native";
import TicketItemStyles from "./TicketItem.styles";
import {Icon} from "native-base";
import {useNavigation} from '@react-navigation/native';

const TicketItem = ({ticket}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={TicketItemStyles.ticketBox}
            onPress={() => {
                navigation.navigate('Ticket', {id: ticket.id})
            }}
        >
            <View style={TicketItemStyles.ticketIconContainer}>
                <Icon type={'Entypo'} name={'ticket'} style={TicketItemStyles.ticketIcon}/>
            </View>
            <View style={TicketItemStyles.ticketInfoContainer}>
                <Text style={TicketItemStyles.ticketConcert}>{ticket.concert}</Text>
                <Text style={TicketItemStyles.ticketPlace}>{ticket.place} - {moment(ticket.date).format('LL')}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TicketItem;