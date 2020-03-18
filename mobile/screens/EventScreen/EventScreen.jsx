import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Container, Content, Icon} from "native-base";
import EventScreenStyles from "./EventScreen.styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvent} from "../../redux/Events/Events.actions";
import moment from "moment";
import {apiURL} from "../../config/server";

const EventScreen = ({route}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const id = route.params.id;
    const event = useSelector(state => state.EventsState.events.find(event => event.id === id));

    useEffect(() => {
        dispatch(fetchEvent(id));
    }, []);

    return (
        <Container style={EventScreenStyles.mainContainer}>
            {
                event.images && (
                    <Content contentContainerStyle={EventScreenStyles.content}>
                        {
                            event.images && event.images.length > 0 && (
                                <View style={EventScreenStyles.imageContainer}>
                                    <Image
                                        style={EventScreenStyles.image}
                                        source={{uri: `${apiURL()}${event.images[0]}`}}/>
                                </View>
                            )
                        }
                        <View style={EventScreenStyles.titleContainer}>
                            <Text style={EventScreenStyles.title}>{event.concert}</Text>
                        </View>
                        <View style={EventScreenStyles.headerContainer}>
                            <View style={EventScreenStyles.infoContainer}>
                                <Text style={EventScreenStyles.place}>{event.place}</Text>
                                <Text style={EventScreenStyles.starts_at}>{moment(event.starts_at).format('LLL')}</Text>
                                <Text style={EventScreenStyles.duration}>
                                    Czas trwania: {Math.ceil(moment.duration(event.estimated_length, 'seconds').asMinutes())} minuty
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={EventScreenStyles.buttonContainer}
                                onPress={() => {
                                    navigation.navigate('Reserve', {id: event.id})
                                }}
                            >
                                <Icon type={'Entypo'} name={'ticket'} style={EventScreenStyles.buttonIcon}/>
                                <Text style={EventScreenStyles.buttonText}>ZAREZERWUJ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={EventScreenStyles.descriptionContainer}>
                            <Text style={EventScreenStyles.description}>{event.description}</Text>
                        </View>
                    </Content>
                )
            }
        </Container>
    );
};

export default EventScreen;