import React, {useEffect} from 'react';
import {View, Text, RefreshControl} from "react-native";
import {Container, Content} from "native-base";
import EventsScreenStyles from "./EventsScreen.styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents} from "../../redux/Events/Events.actions";
import EventItem from "../../components/Events/EventItem/EventItem.component";

const EventsScreen = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.EventsState.events);
    const fetching = useSelector(state => state.EventsState.fetching);

    useEffect(() => {
        dispatch(fetchEvents())
    }, []);

    return events && (
        <Container style={EventsScreenStyles.mainContainer}>
            <Content
                contentContainerStyle={EventsScreenStyles.content}
                refreshControl={<RefreshControl refreshing={fetching} onRefresh={() => dispatch(fetchEvents())} />}
            >
                <View style={EventsScreenStyles.titleContainer}>
                    <Text style={EventsScreenStyles.title}>Nadchodzące wydarzenia:</Text>
                </View>
                <View style={EventsScreenStyles.eventsContainer}>
                    {
                        events.length > 0 && events.map(event => (
                            <EventItem key={event.id} event={event} />
                        ))
                    }
                </View>
            </Content>
        </Container>
    );
};

export default EventsScreen;