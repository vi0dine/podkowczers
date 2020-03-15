import React from 'react';
import {View, Text} from "react-native";
import {Icon} from 'native-base';
import ReservationOverviewStyles from "./ReservationOverview.styles";
import {useSelector} from "react-redux";
import moment from "moment";

const ReservationOverview = ({id}) => {
    const event = useSelector(state => state.EventsState.events.find(event => event.id === id));
    const user = useSelector(state => state.UserState);

    return (
        <View style={ReservationOverviewStyles.overviewContainer}>
            <View style={ReservationOverviewStyles.eventInfoContainer}>
                <View style={ReservationOverviewStyles.eventIconContainer}>
                    <Icon type={'FontAwesome5'} name={'theater-masks'} style={ReservationOverviewStyles.eventIcon}/>
                </View>
                <View style={ReservationOverviewStyles.eventTextContainer}>
                    <Text style={ReservationOverviewStyles.eventInfoTitle}>Wydarzenie:</Text>
                    <Text style={ReservationOverviewStyles.eventInfoText}>{event.concert}</Text>
                    <Text style={ReservationOverviewStyles.eventInfoText}>{event.place}</Text>
                    <Text style={ReservationOverviewStyles.eventInfoText}>{moment(event.starts_at).format('LLL')}</Text>
                </View>
            </View>
            <View style={ReservationOverviewStyles.eventInfoContainer}>
                <View style={ReservationOverviewStyles.eventIconContainer}>
                    <Icon type={'FontAwesome5'} name={'user'} style={ReservationOverviewStyles.eventIcon}/>
                </View>
                <View style={ReservationOverviewStyles.eventTextContainer}>
                    <Text style={ReservationOverviewStyles.eventInfoTitle}>Użytkownik:</Text>
                    <Text style={ReservationOverviewStyles.eventInfoText}>{user.email}</Text>
                    <Text style={ReservationOverviewStyles.eventInfoText}>Ilość monet: {user.coins}</Text>
                </View>
            </View>
        </View>
    );
};

export default ReservationOverview;