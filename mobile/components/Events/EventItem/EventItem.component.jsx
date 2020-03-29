import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EventItemStyles from "./EventItem.styles";
import {Icon} from "native-base";
import moment from "moment";
import {useNavigation} from '@react-navigation/native';

const EventItem = ({event}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={EventItemStyles.eventBox}
            onPress={() => {
                navigation.navigate('Event', {id: event.id})
            }}
        >
            <View style={EventItemStyles.content}>
                <View style={EventItemStyles.infoContainer}>
                    <View style={EventItemStyles.concertContainer}>
                        <Text style={EventItemStyles.concert}>{event.concert}</Text>
                    </View>
                    <View style={EventItemStyles.placeContainer}>
                        <Text style={EventItemStyles.place}>{event.place.name}</Text>
                        <Text style={EventItemStyles.starts_at}>{moment(event.starts_at).format('LL HH:mm')}
                            &nbsp;~ {moment(event.starts_at).add(event.estimated_length, 'seconds').format('HH:mm')}</Text>
                    </View>
                </View>
                <View style={EventItemStyles.ticketsInfoContainer}>
                    <View style={EventItemStyles.ticketsIconContainer}>
                        <Icon type={'Entypo'} name={'ticket'} style={EventItemStyles.ticketIcon}/>
                        <Text style={EventItemStyles.concert}>{event.available_tickets_count}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default EventItem;